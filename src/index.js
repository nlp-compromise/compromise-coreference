const whichPronoun = require("./whichPronoun");

//how far we'll look for a reference, in words
const maxDistance = 30;

//builds an index for the # of each term id
const buildIndex = function(termArray) {
  let index = {};
  let i = 0;
  termArray.forEach(t => {
    index[t.uid] = i;
    i += 1;
  });
  return index;
};

//take a noun, and look later in the document for matching pronouns
const findRefs = function(n, termArray, index) {
  let refs = [];
  let term = n.list[0].terms[0];
  let i = index[term.uid];
  let want = whichPronoun(n);
  for (let j = 0; j < maxDistance; j += 1) {
    let t = termArray[i + j];
    if(!t){
      break
    }
    if(want[t.normal]){
      refs.push(t.normal)
    }
  }
  return refs;
};

//accepts a full compromise document object, and returns some json
const find = function(doc) {
  let result = [];
  let termArray = doc.terms().list.map((ts) => ts.terms[0])
  let index = buildIndex(termArray);
  //grab all noun-phrases ('dwayne the rock johnson').
  let nouns = doc.nouns();
  //
  nouns.forEach(n => {
    let refs = findRefs(n, termArray, index);
    if (refs.length > 0) {
      result.push({
        noun: n.out('normal'),
        references: refs
      });
    }
  });
  return result;
};

//(tries to) replace all instances of 'he' with it's noun, 'Spencer'
const replace = function(doc) {
  let results = find(doc);
  results.forEach(o => {
    o.references.forEach(pronoun => {
      pronoun.replace(o.noun);
    });
  });
  return doc;
};

const main = {
  find: find,
  replace: replace
};
module.exports = main;

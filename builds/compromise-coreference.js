/* compromise-coreference v0.0.1
   github.com/nlp-compromise/compromise-coreference
   MIT
*/

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.coreference = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
"use strict";

var whichPronoun = _dereq_("./whichPronoun"); //how far we'll look for a reference, in words


var maxDistance = 30; //builds an index for the # of each term id

var buildIndex = function buildIndex(termArray) {
  var index = {};
  var i = 0;
  termArray.forEach(function (t) {
    index[t.uid] = i;
    i += 1;
  });
  return index;
}; //take a noun, and look later in the document for matching pronouns


var findRefs = function findRefs(n, termArray, index) {
  var refs = [];
  var term = n.list[0].terms[0];
  var i = index[term.uid];
  var want = whichPronoun(n);

  for (var j = 0; j < maxDistance; j += 1) {
    var t = termArray[i + j];

    if (!t) {
      break;
    }

    if (want[t.normal]) {
      refs.push(t.normal);
    }
  }

  return refs;
}; //accepts a full compromise document object, and returns some json


var find = function find(doc) {
  var result = [];
  var termArray = doc.terms().list.map(function (ts) {
    return ts.terms[0];
  });
  var index = buildIndex(termArray); //grab all noun-phrases ('dwayne the rock johnson').

  var nouns = doc.nouns(); //

  nouns.forEach(function (n) {
    var refs = findRefs(n, termArray, index);

    if (refs.length > 0) {
      result.push({
        noun: n.out('normal'),
        references: refs
      });
    }
  });
  return result;
}; //(tries to) replace all instances of 'he' with it's noun, 'Spencer'


var replace = function replace(doc) {
  var results = find(doc);
  results.forEach(function (o) {
    o.references.forEach(function (pronoun) {
      pronoun.replace(o.noun);
    });
  });
  return doc;
};

var main = {
  find: find,
  replace: replace
};
module.exports = main;

},{"./whichPronoun":2}],2:[function(_dereq_,module,exports){
"use strict";

//naiive mapping to a noun's appropriate pronouns - spencer->'he'
var whichPronoun = function whichPronoun(noun) {
  //they
  if (noun.has("#Plural")) {
    return {
      they: true,
      them: true
    };
  } //she


  if (noun.has("#FemaleName")) {
    return {
      she: true,
      her: true
    };
  } //he


  if (noun.has("#MaleName")) {
    return {
      he: true,
      his: true
    };
  } //'google'


  if (noun.has("#Organization")) {
    return {
      it: true,
      they: true
    };
  } //'dishwasher'


  if (!noun.has("#Person")) {
    return {
      it: true
    };
  }

  return {
    it: true //?

  };
};

module.exports = whichPronoun;

},{}]},{},[1])(1)
});

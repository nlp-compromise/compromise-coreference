//naiive mapping to a noun's appropriate pronouns - spencer->'he'
const whichPronoun = function(noun) {
  //they
  if (noun.has("#Plural")) {
    return {
      they: true,
      them: true
    };
  }
  //she
  if (noun.has("#FemaleName")) {
    return {
      she: true,
      her: true
    };
  }
  //he
  if (noun.has("#MaleName")) {
    return {
      he: true,
      his: true
    };
  }
  //'google'
  if (noun.has("#Organization")) {
    return {
      it: true,
      they: true
    };
  }
  //'dishwasher'
  if (!noun.has("#Person")) {
    return {
      it: true
    };
  }
  return {it:true}//?
};
module.exports = whichPronoun;

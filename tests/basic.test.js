const test = require("tape");
const nlp = require("compromise");
const coreference = require("../src");

test("basic-test", function(t) {
  let str = `what's with these homies dissing my girl? why do they gotta front? What did we ever do to these guys, that made them so violent?`;
  let doc = nlp(str);
  let results = coreference.find(doc);
  let first = results[0];
  t.equal(first.noun, "homies", "finds noun");
  t.equal(first.references[0], "they", "finds they gotta front");

  t.equal(
    first.references[1],
    "them",
    "that made them so violent"
  );

  t.end();
});

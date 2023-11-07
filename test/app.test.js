const { it } = require("mocha");
const Index = require("../index");
const expect = require("chai").expect;

// unit test using mocha and chai to test the 3rd party api search function

it("Testing search function", async () => {
  const res = await Index.getSearch("distractible", "podcast");
  expect(res.results[0].artistName).to.equal("Distractible");
});

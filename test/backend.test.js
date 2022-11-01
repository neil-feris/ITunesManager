// test the backend
const expect = require("chai").expect;
const describe = require("mocha").describe;
const it = require("mocha").it;

// A blank GET request to backend should return a 400 status code and the text should contain "No query parameters passed"
describe("GET /api", () => {
  it("should return a 400 status code", async () => {
    const response = await fetch("http://localhost:3001/api");
    expect(response.status).to.equal(400);
  });

  it("should return the text 'No query parameters passed'", async () => {
    const response = await fetch("http://localhost:3001/api");
    const text = await response.text();
    expect(text).to.equal("No query parameters passed");
  });
});

// A POST request to backend should return a 200 status code

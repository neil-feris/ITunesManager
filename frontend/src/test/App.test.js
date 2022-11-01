import React from "react";
import TestRenderer from "react-test-renderer";
import App from "../App";

// snapshot test
it("renders App correctly", () => {
  const tree = TestRenderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

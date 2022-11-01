// import React
import React from "react";

// import TestRenderer for snapshot testing
import TestRenderer from "react-test-renderer";

// import App
import App from "../App";

// snapshot test
it("renders App correctly", () => {
  const tree = TestRenderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Tests for Main component
// import React
import React from "react";

// import render and screen from testing library to render and query the component
import { render } from "@testing-library/react";
import Main from "../components/Main";
import { create } from "react-test-renderer";

// snapshot test
it("renders Main correctly", () => {
  const tree = create(<Main />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Check that the select element with id mediaType is rendered
it("renders mediaType select element", () => {
  const view = render(<Main />);
  const mediaTypeSelector = view.container.querySelector("#mediaType");
  expect(mediaTypeSelector).toBeInTheDocument();
});

// Check that the select element with id searchType is rendered
it("renders searchType select element", () => {
  const view = render(<Main />);
  const searchTypeSelector = view.container.querySelector("#searchType");
  expect(searchTypeSelector).toBeInTheDocument();
});

// Check that the input element with id searchInput is rendered
it("renders searchInput input element", () => {
  const view = render(<Main />);
  const searchInput = view.container.querySelector("#searchTerm");
  expect(searchInput).toBeInTheDocument();
});

// Check that the button with id searchButton is rendered
it("renders searchButton button element", () => {
  const view = render(<Main />);
  const searchButton = view.container.querySelector("#searchButton");
  expect(searchButton).toBeInTheDocument();
});

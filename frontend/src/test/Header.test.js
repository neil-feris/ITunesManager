// Tests on the Header component
import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../components/Header";
import { create } from "react-test-renderer";

// snapshot test
it("renders Header correctly", () => {
  const tree = create(<Header />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Check that the header is rendered
it("renders header", () => {
  render(<Header />);
  expect(screen.getByText("Media Favourites Manager")).toBeInTheDocument();
});

// cheack that link to favourites page is rendered
it("renders link to favourites page", () => {
  render(<Header />);
  expect(screen.getByText("Favourites")).toBeInTheDocument();
});

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "test title",
    author: "test author",
    url: "test url",
    likes: 3,
    user: {},
  };

  // render(<Blog blog={blog} />);

  // const element = screen.getByText("test title");
  // expect(element).toBeDefined();

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector(".blog");
  expect(div).toHaveTextContent("test title");
  expect(div).toHaveTextContent("test author");

  const divWithUrl = container.querySelector(".togglable-info");
  expect(divWithUrl).toHaveStyle("display: none");
});

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "test title",
    author: "test author",
    url: "test url",
    likes: 3,
    user: {},
  };

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector(".blog");
  expect(div).toHaveTextContent("test title");
  expect(div).toHaveTextContent("test author");

  const divWithUrl = container.querySelector(".togglable-info");
  expect(divWithUrl).toHaveStyle("display: none");
});

test("after clicking the button, children are displayed", async () => {
  const blog = {
    title: "test title",
    author: "test author",
    url: "test url",
    likes: 3,
    user: {},
  };

  const { container } = render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const div = container.querySelector(".togglable-info");
  expect(div).not.toHaveStyle("display: none");
});

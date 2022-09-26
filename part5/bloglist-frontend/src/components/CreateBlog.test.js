import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CreateBlog from "./CreateBlog";
import userEvent from "@testing-library/user-event";

test("<CreateBlog /> calls handleCreateBlog with correct parameters", async () => {
  const handleCreateBlog = jest.fn();
  const user = userEvent.setup();

  const { container } = render(
    <CreateBlog handleCreateBlog={handleCreateBlog} />
  );

  const titleInput = container.querySelector("#title-input");
  const authorInput = container.querySelector("#author-input");

  const sendButton = screen.getByText("create");

  await user.type(titleInput, "test title");
  await user.type(authorInput, "test author");
  await user.click(sendButton);

  expect(handleCreateBlog.mock.calls).toHaveLength(1);
  expect(handleCreateBlog.mock.calls[0][0]).toMatchObject({
    title: "test title",
    author: "test author",
  });
});

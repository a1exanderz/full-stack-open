import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogEntryForm from "./BlogEntryForm";
import userEvent from "@testing-library/user-event";

test("form calls event handler and right details", () => {
  const createEntry = jest.fn();

  render(<BlogEntryForm onSubmit={createEntry} />);

  const titleInput = screen.getByPlaceholderText("title");
  const authorInput = screen.getByPlaceholderText("author");
  const urlInput = screen.getByPlaceholderText("url");
  const likesInput = screen.getByPlaceholderText("likes");

  const createButton = screen.getByText("create");

  userEvent.type(titleInput, "title test");
  userEvent.type(authorInput, "author test");
  userEvent.type(urlInput, "url test");
  userEvent.type(likesInput, "likes test");

  userEvent.click(createButton);

  expect(createEntry.mock.calls).toHaveLength(1);
  console.log(createEntry.mock);
  expect(createEntry.mock.calls[0][0].title).toBe("title test");
});

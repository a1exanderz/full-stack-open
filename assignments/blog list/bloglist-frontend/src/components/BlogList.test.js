import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogList from "./BlogList";

// test("renders title only", () => {
//   const blogs = [
//     {
//       title: "test title",
//       author: "test author",
//       url: "test url",
//       likes: 0,
//     },
//   ];

//   render(<BlogList blogs={blogs} />);

//   const element = screen.getAllByText("test title");

//   expect(element).toBeDefined();
// });

// test("renders url and likes when full entry shown", async () => {
//   const blogs = [
//     {
//       title: "test title",
//       author: "test author",
//       url: "test url",
//       likes: 0,
//     },
//   ];

//   render(<BlogList blogs={blogs} />);

//   const button = screen.getByText("view");
//   userEvent.click(button);

//   const element = screen.getAllByText("Likes: 0");
//   expect(element).toBeDefined;
// });

test("full entry shown --> like button clicked twice, event handler received call twice", async () => {
  const blogs = [
    {
      title: "test title",
      author: "test author",
      url: "test url",
      likes: 0,
    },
  ];

  render(<BlogList blogs={blogs} />);
  const viewButton = screen.getByText("view");
  userEvent.click(viewButton);

  const likeButton = screen.getByText("like");
  userEvent.click(likeButton);
  userEvent.click(likeButton);

  const element = screen.getAllByText("Likes: 2");
  expect(element).toBeDefined;
});

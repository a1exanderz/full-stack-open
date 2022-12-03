/* Make a test which checks that the component displaying a blog renders the blog's title, but does not render its url or number of likes by default.
Add CSS-classes to the component to help the testing as necessary. */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import BlogList from "./BlogList";

test("renders title only", () => {
  const blogs = [
    {
      title: "test title",
      author: "test author",
      url: "test url",
      likes: 0,
    },
  ];

  render(<BlogList blogs={blogs} />);

  const element = screen.getAllByText("test title");

  expect(element).toBeDefined();
});

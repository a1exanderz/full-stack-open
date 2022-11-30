const BlogEntry = ({ title, author, url, likes }) => (
  <li>
    Title: {title}; Author: {author}; {url}; {likes} likes
  </li>
);

export default BlogEntry;

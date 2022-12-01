import ToggleBlogView from "./ToggleBlogView";

const BlogList = ({ blogs }) => (
  <div>
    <h2>blogs</h2>
    {blogs.map((blog) => (
      <ToggleBlogView buttonLabel="view" key={blog.id}>
        <div
          style={{
            backgroundColor: "pink",
            width: "150px",
            padding: "10px",
            marginBottom: "5px",
          }}
        >
          <div>{blog.title}</div>
          <div>Author: {blog.author}</div>
          <div>URL: {blog.url}</div>
          <div>
            Likes: {blog.likes} <button>like</button>
          </div>
        </div>
      </ToggleBlogView>
    ))}
  </div>
);

export default BlogList;

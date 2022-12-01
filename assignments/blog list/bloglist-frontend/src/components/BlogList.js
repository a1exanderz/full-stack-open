import ToggleBlogView from "./ToggleBlogView";
import blogService from "../services/blogs";

const BlogList = ({ blogs, setBlogs }) => {
  const handleLikeButton = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    const returnedBlog = await blogService.incrementLike(id, updatedBlog);
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
  };

  return (
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
              Likes: {blog.likes}{" "}
              <button onClick={() => handleLikeButton(blog.id)}>like</button>
            </div>
          </div>
        </ToggleBlogView>
      ))}
    </div>
  );
};

export default BlogList;

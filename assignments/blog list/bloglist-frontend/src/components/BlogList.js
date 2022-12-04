import ToggleBlogView from "./ToggleBlogView";
import blogService from "../services/blogs";

const BlogList = ({ blogs, setBlogs, setErrorMessage }) => {
  const handleLikeButton = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    const returnedBlog = await blogService.incrementLike(id, updatedBlog);
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
  };

  const handleDeleteButton = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.deleteBlog(id);
      } catch (exception) {
        setErrorMessage("Cannot delete a note that isn't yours!");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        return;
      }
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };

  const sortByLikes = () => {
    const sorted = blogs.sort((a, b) =>
      a.likes > b.likes ? 1 : a.likes < b.likes ? -1 : 0
    );
    setBlogs([...sorted]);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          width: "300px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>blogs</h2>{" "}
        <button
          id="sortByLikesButton"
          onClick={() => sortByLikes()}
          style={{ height: "21.5px" }}
        >
          sort by likes
        </button>
      </div>
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
              <button
                id="likeBlogButton"
                onClick={() => handleLikeButton(blog.id)}
              >
                like
              </button>
            </div>
            <button
              id="deleteBlogButton"
              onClick={() => handleDeleteButton(blog.id)}
            >
              delete
            </button>
          </div>
        </ToggleBlogView>
      ))}
    </div>
  );
};

export default BlogList;

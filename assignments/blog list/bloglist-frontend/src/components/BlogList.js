import { useDispatch, useSelector } from "react-redux";
import ToggleBlogView from "./ToggleBlogView";

import { deleteABlog, incrementLike } from "../reducers/blogReducer";

const BlogList = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);

  const handleLikeButton = (id) => {
    dispatch(incrementLike(id));
  };

  const handleDeleteButton = async (id) => {
    dispatch(deleteABlog(id));
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
        {/* <button
          id="sortByLikesButton"
          onClick={() => sortByLikes()}
          style={{ height: "21.5px" }}
        >
          sort by likes
        </button> */}
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

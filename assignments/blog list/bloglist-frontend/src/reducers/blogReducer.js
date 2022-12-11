import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

// const sortByLikes = (state) => {
//   const sorted = [...state].sort((a, b) =>
//     a.likes > b.likes ? 1 : a.likes < b.likes ? -1 : 0
//   );
//   return sorted;
// };

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    updateBlogs(state, action) {
      return state.map((b) =>
        b.id !== action.payload.id ? b : action.payload
      );
    },
  },
});

export const { appendBlog, setBlogs, updateBlogs, deleteBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createNewBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlog(newBlog));
  };
};

export const deleteABlog = (id) => {
  return async (dispatch) => {
    const blogId = await blogService.deleteBlog(id);
    dispatch(deleteBlog(blogId));
  };
};

export const incrementLike = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.incrementLike(blog);
    dispatch(updateBlogs(updatedBlog));
  };
};

export default blogSlice.reducer;

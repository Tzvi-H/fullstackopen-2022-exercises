import blogService from "../services/blogs";

import { setNotification, removeNotification } from "./notificationReducer";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;
    case "ADD_BLOG":
      return [...state, action.data];
    case "UPDATE_BLOG":
      return state.map((blog) =>
        blog.id !== action.data.id ? blog : action.data
      );
    case "DELETE_BLOG":
      return state.slice().filter((blog) => blog.id !== action.data);
    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs,
    });
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject);
    dispatch({
      type: "ADD_BLOG",
      data: newBlog,
    });
  };
};

export const updateblog = (blogId, newObject, title) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blogId, newObject);
    dispatch({
      type: "UPDATE_BLOG",
      data: updatedBlog,
    });
    dispatch(
      setNotification({
        type: "success",
        message: `successfully liked "${title}"`,
      })
    );
    setTimeout(() => {
      dispatch(removeNotification());
    }, 3000);
  };
};

export const deleteBlog = (blogId) => {
  return async (dispatch) => {
    await blogService.remove(blogId);
    dispatch({
      type: "DELETE_BLOG",
      data: blogId,
    });
  };
};

export const addCommentToBlog = (blogId, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.addComment(blogId, comment);
    dispatch({
      type: "UPDATE_BLOG",
      data: updatedBlog,
    });
    dispatch(
      setNotification({
        type: "success",
        message: `successfully liked "${updatedBlog.title}"`,
      })
    );
    setTimeout(() => {
      dispatch(removeNotification());
    }, 3000);
  };
};

export default blogReducer;

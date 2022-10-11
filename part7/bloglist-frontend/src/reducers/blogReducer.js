import blogService from "../services/blogs";

import { setNotification, removeNotification } from "./notificationReducer";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;
    case "ADD_BLOG":
      return [...state, action.data];
    default:
      return state;
  }
};

export const initializeBlogs = (blogs) => {
  return {
    type: "INIT_BLOGS",
    data: blogs,
  };
};

export const addBlog = (blog) => {
  return {
    type: "ADD_BLOG",
    data: blog,
  };
};

export const updateblog = (blogId, newObject) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blogId, newObject);
    dispatch({
      type: "UPDATE_BLOG",
      data: updatedBlog,
    });
    dispatch(
      setNotification({
        type: "success",
        message: `successfully liked "${newObject.title}"`,
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
  };
};

export default blogReducer;

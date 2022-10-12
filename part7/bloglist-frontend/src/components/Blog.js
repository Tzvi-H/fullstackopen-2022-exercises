import { useState } from "react";
import PropTypes from "prop-types";

import { updateblog, deleteBlog } from "../reducers/blogReducer";

import { useDispatch } from "react-redux";

import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const Blog = ({ blog, creatorIsLoggedIn }) => {
  const [showDetails, setShowDetails] = useState(false);

  const dispatch = useDispatch();

  const showWhenVisible = { display: showDetails ? "" : "none" };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleCreateButtonClick = () => {
    try {
      dispatch(updateblog(blog.id, { likes: blog.likes + 1 }, blog.title));
    } catch (error) {
      setNotification({ type: "error", message: error.response.data.error });
      setTimeout(() => {
        dispatch(removeNotification());
      }, 3000);
    }
  };

  const handleDeleteButtonClick = () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      return;
    }

    try {
      dispatch(deleteBlog(blog.id));
      dispatch(
        setNotification({
          type: "success",
          message: `successfully deleted "${blog.title}"`,
        })
      );
      setTimeout(() => {
        dispatch(setNotification());
      }, 3000);
    } catch (error) {
      dispatch(
        setNotification({ type: "error", message: error.response.data.error })
      );
      setTimeout(() => {
        dispatch(removeNotification());
      }, 3000);
    }
  };

  const buttonText = showDetails ? "hide" : "view";

  return (
    <div style={blogStyle} className="blog">
      {blog.title}: {blog.author}{" "}
      <button onClick={() => setShowDetails(!showDetails)}>{buttonText}</button>
      <div style={showWhenVisible} className="togglable-info">
        {blog.url}
        <br />
        likes {blog.likes}{" "}
        <button onClick={handleCreateButtonClick}>like</button>
        <br />
        {blog.user.username}
        <br />
        {creatorIsLoggedIn && (
          <button onClick={handleDeleteButtonClick}>remove</button>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;

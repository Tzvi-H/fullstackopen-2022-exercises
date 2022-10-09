import { useState } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";

import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const Blog = ({
  blog,
  handleLikeBlog,
  handleDeleteBlog,
  creatorIsLoggedIn,
}) => {
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
      handleLikeBlog(blog.id, { likes: blog.likes + 1 });
      dispatch(
        setNotification({
          type: "success",
          message: `successfully liked "${blog.title}"`,
        })
      );
      setTimeout(() => {
        dispatch(removeNotification());
      }, 3000);
    } catch (error) {
      setNotification({ type: "error", message: error.response.data.error });
      setTimeout(() => {
        dispatch(removeNotification());
      }, 3000);
    }
  };

  const handleDeleteButtonClick = () => {
    try {
      window.confirm(`Remove blog ${blog.title} by ${blog.author}?`) &&
        handleDeleteBlog(blog);
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

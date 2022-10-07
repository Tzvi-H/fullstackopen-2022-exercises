import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({
  blog,
  handleLikeBlog,
  handleDeleteBlog,
  creatorIsLoggedIn,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const showWhenVisible = { display: showDetails ? "" : "none" };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleCreateButtonClick = () => {
    handleLikeBlog(blog.id, { likes: blog.likes + 1 });
  };

  const handleDeleteButtonClick = () => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}?`) &&
      handleDeleteBlog(blog);
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

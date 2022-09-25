import { useState } from "react";

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
    <div style={blogStyle}>
      {blog.title}{" "}
      <button onClick={() => setShowDetails(!showDetails)}>{buttonText}</button>
      <div style={showWhenVisible}>
        {blog.url}
        <br />
        likes {blog.likes}{" "}
        <button onClick={handleCreateButtonClick}>like</button>
        <br />
        {blog.author}
        <br />
        {creatorIsLoggedIn && (
          <button onClick={handleDeleteButtonClick}>remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;

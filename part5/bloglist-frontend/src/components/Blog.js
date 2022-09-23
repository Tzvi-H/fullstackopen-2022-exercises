import { useState } from "react";

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const showWhenVisible = { display: showDetails ? "" : "none" };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const buttonText = showDetails ? "hide" : "view";

  return (
    <div style={blogStyle}>
      {blog.title}{" "}
      <button onClick={() => setShowDetails(!showDetails)}>{buttonText}</button>
      <div style={showWhenVisible}>
        {blog.url}
        <br />
        likes {blog.likes} <button>like</button>
        <br />
        {blog.author}
      </div>
    </div>
  );
};

export default Blog;

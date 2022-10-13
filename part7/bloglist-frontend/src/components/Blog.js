// import { useState } from "react";
// import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { updateblog } from "../reducers/blogReducer";

import { useDispatch } from "react-redux";

import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const Blog = () => {
  const dispatch = useDispatch();

  const blogId = useParams().id;

  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === blogId)
  );

  if (!blog) {
    return null;
  }
  // const [showDetails, setShowDetails] = useState(false);

  // const showWhenVisible = { display: showDetails ? "" : "none" };

  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: "solid",
  //   borderWidth: 1,
  //   marginBottom: 5,
  // };

  const handleLikeButtonClick = () => {
    try {
      dispatch(updateblog(blog.id, { likes: blog.likes + 1 }, blog.title));
    } catch (error) {
      setNotification({ type: "error", message: error.response.data.error });
      setTimeout(() => {
        dispatch(removeNotification());
      }, 3000);
    }
  };

  // const handleDeleteButtonClick = () => {
  //   if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
  //     return;
  //   }

  //   try {
  //     dispatch(deleteBlog(blog.id));
  //     dispatch(
  //       setNotification({
  //         type: "success",
  //         message: `successfully deleted "${blog.title}"`,
  //       })
  //     );
  //     setTimeout(() => {
  //       dispatch(removeNotification());
  //     }, 3000);
  //   } catch (error) {
  //     dispatch(
  //       setNotification({ type: "error", message: error.response.data.error })
  //     );
  //     setTimeout(() => {
  //       dispatch(removeNotification());
  //     }, 3000);
  //   }
  // };

  // const buttonText = showDetails ? "hide" : "view";

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      likes {blog.likes} <button onClick={handleLikeButtonClick}>like</button>
      <br />
      <p>added by {blog.author}</p>
      <h3>comments</h3>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
    // <div style={blogStyle} className="blog">
    //   <Link to={`/blogs/${blog.id}`}>
    //     {blog.title}: {blog.author}{" "}
    //   </Link>

    // {
    /* <button onClick={() => setShowDetails(!showDetails)}>{buttonText}</button>
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
      </div> */
    // }
    // </div>
  );
};

// Blog.propTypes = {
//   blog: PropTypes.object.isRequired,
// };

export default Blog;

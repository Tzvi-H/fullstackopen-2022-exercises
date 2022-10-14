import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { updateblog, addCommentToBlog } from "../reducers/blogReducer";

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

  const handleNewCommentSubmit = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    event.target.comment.value = "";

    dispatch(addCommentToBlog(blog.id, comment));
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      likes {blog.likes} <button onClick={handleLikeButtonClick}>like</button>
      <br />
      <p>added by {blog.author}</p>
      <h3>comments</h3>
      <form onSubmit={handleNewCommentSubmit}>
        <input type="text" name="comment" />
        <button>add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;

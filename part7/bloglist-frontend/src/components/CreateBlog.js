import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../reducers/blogReducer";

import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";
import blogService from "../services/blogs";

const CreateBlog = ({ blogFormRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newBlog = await blogService.create({ title, author, url });
      dispatch(addBlog(newBlog));

      setTitle("");
      setAuthor("");
      setUrl("");
      blogFormRef.current.toggleVisibility();
      dispatch(
        setNotification({
          type: "success",
          message: `a new blog "${title}" by ${author} added`,
        })
      );
      setTimeout(() => {
        dispatch(removeNotification());
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

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            id="title-input"
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            id="author-input"
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            id="url-input"
          />
        </div>
        <button type="submit" id="submit-button">
          create
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;

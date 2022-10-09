import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import Blog from "./components/Blog";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

import {
  setNotification,
  removeNotification,
} from "./reducers/notificationReducer";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (username, password) => {
    const user = await loginService.login({
      username,
      password,
    });
    blogService.setToken(user.token);
    setUser(user);
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
  };

  const handleLogOut = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken(null);
    dispatch(
      setNotification({ type: "success", message: "successfully logged out" })
    );
    setTimeout(() => {
      dispatch(removeNotification());
    }, 3000);
  };

  const handleCreateBlog = async (blogObject) => {
    const savedBlog = await blogService.create(blogObject);
    setBlogs([...blogs, savedBlog]);
    blogFormRef.current.toggleVisibility();
  };

  const handleLikeBlog = async (blogId, newBlog) => {
    const updatedBlog = await blogService.update(blogId, newBlog);
    setBlogs(blogs.map((blog) => (blog.id !== blogId ? blog : updatedBlog)));
  };

  const handleDeleteBlog = async (blog) => {
    const blogId = blog.id;
    await blogService.remove(blogId);
    setBlogs(blogs.filter((blog) => blog.id !== blogId));
  };

  const blogsSortedByLikes = blogs.sort(
    (blogA, blogB) => blogB.likes - blogA.likes
  );

  if (user === null) {
    return (
      <div>
        <Notification />
        <Login handleLogin={handleLogin} />
      </div>
    );
  }
  return (
    <div>
      <Notification />

      <h2>blogs</h2>

      <p>
        {user.name} logged in <button onClick={handleLogOut}>logout</button>
      </p>

      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <CreateBlog handleCreateBlog={handleCreateBlog} />
      </Togglable>

      {blogsSortedByLikes.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLikeBlog={handleLikeBlog}
          handleDeleteBlog={handleDeleteBlog}
          creatorIsLoggedIn={user.username === blog.user.username}
        />
      ))}
    </div>
  );
};

export default App;

import { useState, useEffect } from "react";

import Blog from "./components/Blog";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import Notification from "./components/Notification";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

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
    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      setUser(user);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setNotification({ type: "success", message: "successfully logged in" });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (exception) {
      setNotification({ type: "error", message: "wrong username or password" });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  const handleLogOut = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken(null);
    setNotification({ type: "success", message: "successfully logged out" });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleCreateBlog = async (blogObject) => {
    try {
      const savedBlog = await blogService.create(blogObject);
      setBlogs([...blogs, savedBlog]);
      setNotification({
        type: "success",
        message: `a new blog "${savedBlog.title}" by ${savedBlog.author} added`,
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (error) {
      setNotification({ type: "error", message: error.response.data.error });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification notification={notification} />
        <Login handleLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <Notification notification={notification} />

      <h2>blogs</h2>

      <p>
        {user.name} logged in <button onClick={handleLogOut}>logout</button>
      </p>

      <CreateBlog handleCreateBlog={handleCreateBlog} />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
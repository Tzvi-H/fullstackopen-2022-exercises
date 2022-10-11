import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import Blogs from "./components/Blogs";
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

import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

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
        <CreateBlog blogFormRef={blogFormRef} />
      </Togglable>

      <Blogs user={user} />
    </div>
  );
};

export default App;

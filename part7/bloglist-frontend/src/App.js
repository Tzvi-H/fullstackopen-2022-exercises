import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

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
import { setUser, removeUser } from "./reducers/userReducer";

const App = () => {
  const blogFormRef = useRef();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const handleLogin = async (username, password) => {
    const user = await loginService.login({
      username,
      password,
    });
    blogService.setToken(user.token);
    dispatch(setUser(user));
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
  };

  const handleLogOut = () => {
    dispatch(removeUser());
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

      <Blogs />
    </div>
  );
};

export default App;

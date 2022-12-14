import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Routes, Route, Link } from "react-router-dom";

import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Users from "./components/Users";
import User from "./components/User";

import blogService from "./services/blogs";
import loginService from "./services/login";

import {
  setNotification,
  removeNotification,
} from "./reducers/notificationReducer";

import { initializeBlogs } from "./reducers/blogReducer";
import { setUser, removeUser } from "./reducers/userReducer";
import { initializeUsers } from "./reducers/usersReducer";

const App = () => {
  const blogFormRef = useRef();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const padding = {
    padding: 5,
  };

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

      <div>
        <Link to="/" style={padding}>
          blogs
        </Link>
        <Link to="/users" style={padding}>
          users
        </Link>
        <span>
          {user.name} logged in <button onClick={handleLogOut}>logout</button>
        </span>
      </div>

      <h2>blogs</h2>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Togglable buttonLabel="new note" ref={blogFormRef}>
                <CreateBlog blogFormRef={blogFormRef} />
              </Togglable>
              <Blogs />
            </>
          }
        />

        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </div>
  );
};

export default App;

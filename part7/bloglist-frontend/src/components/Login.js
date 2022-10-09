import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      handleLogin(username, password);
      setUsername("");
      setPassword("");
      dispatch(
        setNotification({ type: "success", message: "successfully logged in" })
      );
      setTimeout(() => {
        dispatch(removeNotification());
      }, 3000);
    } catch (error) {
      dispatch(
        setNotification({
          type: "error",
          message: "wrong username or password",
        })
      );
      setTimeout(() => {
        dispatch(removeNotification());
      }, 3000);
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    </div>
  );
};

export default Login;

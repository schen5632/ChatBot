import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("Siena");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    console.log(password);
  }

  function handleSubmit() {
    console.log("?");
    if (username === "Siena" && password === "1234") {
      console.log("success");
      setErrorMessage(false);
      navigate(`/todos/${username}`);
    } else {
      console.log("failed");
      setErrorMessage(true);
    }
  }

  function SuccessMessage() {
    if (errorMessage) {
      return (
        <div className="error-message">
          Authentication Failed. Please check your credentials
        </div>
      );
    }
    return <div></div>;
  }

  return (
    <div className="login">
      <h1>To-do App</h1>
      <div className="login-form">
        <SuccessMessage />
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button type="button" name="login" onClick={handleSubmit}>
            login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import "./login.css";
import Home from "../Home";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === "Ajay" && password === "123") {
      setIsLoggedIn(true);
      setErrorMessage("");
    } else {
      setIsLoggedIn(false);
      setErrorMessage("Incorrect username or password");
    }
  };

  return (
    <div className="L-form">
      {isLoggedIn ? (
        <Home username={username} />
      ) : (
        <form onSubmit={handleSubmit}>
          <h2 className="L-h2">Login</h2>
          <div className="L-input">
            <input
              placeholder="Username"
              type="text"
              value={username}
              onChange={handleUsername}
            />
          </div>
          <div className="L-input">
            <br />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={handlePassword}
            />
          </div>
          <br />
          <button type="submit" className="L-btn">
            Login
          </button>
          {errorMessage && <p className="L-p">{errorMessage}</p>}
        </form>
      )}
    </div>
  );
};

export default Login;

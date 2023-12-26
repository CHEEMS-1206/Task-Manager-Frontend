import React from "react";
import { Typography, TextField, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

const Login = ({ onLogin, setIsLoggedIn }) => {
  const moveTo = useNavigate();

  const [userName, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    // Validate password (password: > 8 characters and  < 13)
    if (password.length < 8) {
      alert("Password must be atleast 8 characters.");
      return;
    } else if (password.length > 12) {
      alert("Password must be not be greater than 12 characters.");
      return;
    }

    const formData = {
      userName,
      password,
    };

    try {
      console.log(formData);
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const { token } = await response.json();
        alert("Logged in successfully! Token:");

        // Save the token and user details in local storage for further use
        localStorage.setItem("token", token);
        localStorage.setItem("userName", userName);
        onLogin();
        setTimeout(
          () => {
            localStorage.removeItem("token");
            localStorage.removeItem("userName");
            setIsLoggedIn(false);
            alert("Your Session Time elapsed.");
            onLogin();
          },
          600000
        );
        moveTo("/");
      } else {
        alert("Failed to log in.");
        // Handle other status codes or errors
      }
    } catch (error) {
      alert("Error:", error);
      // Handle network errors or exceptions
    }
  };

  function moveToRegisterPage() {
    moveTo("/register");
    console.log("Move to register page.");
  }
  return (
    <div className="login-page">
      {/* Section 1: Login */}
      <div className="form-container">
        <Typography variant="h4" id="company-name">
          Task Manager
        </Typography>
        <Typography variant="h5" id="login-desc">
          Login To Your Account...
        </Typography>
        <form noValidate autoComplete="off">
          <TextField
            id="userName"
            className="text-fields"
            label="Username"
            value={userName}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            margin="normal"
          />
          <TextField
            className="text-fields"
            id="password"
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            margin="normal"
          />
          <Button variant="contained" id="login-btn" onClick={loginHandler}>
            Login
          </Button>
        </form>
      </div>

      {/* Section 2: Sign Up */}
      <div className="reg-btn-container">
        <Typography variant="h4" id="login-page-reg-header">
          New here?
        </Typography>
        <Typography variant="body1" id="login-page-reg-desc">
          Sign up and befriend yourself with immense ocean of opportunities.
        </Typography>
        <Button
          onClick={moveToRegisterPage}
          variant="contained"
          id="reg-redirect-btn"
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Login;

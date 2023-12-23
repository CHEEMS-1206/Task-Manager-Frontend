import React from "react";
import { Typography, TextField, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const moveTo = useNavigate();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const isAlphanumeric = (str) => /^[a-zA-Z0-9]+$/.test(str);
  const isValidEmail = (str) => /\S+@\S+\.\S+/.test(str);

  const registerHandler = async (e) => {
    e.preventDefault();
    // Validate username
    if (!isAlphanumeric(username) || username.length < 5) {
      alert(
        "Username must be alphanumeric and at least 5 characters long."
      );
      return;
    }

    // Validate email
    if (!isValidEmail(email)) {
      alert("Invalid email address.");
      return;
    }

    // Validate password length and match with confirm password
    if (password.length < 8 || password.length > 12) {
      alert("Password must be 8 to 12 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const formData = {
      username,
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:5001/api/....", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        // Display a notification to the user
        alert("User created successfully!");

        // Redirect to the login page after 300ms
        setTimeout(() => {
          moveTo("/login");
        }, 300);
      } else {
        alert("Failed to create user.");
        // Handle other status codes or errors
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle network errors or exceptions
    }
  };
  function moveToLoginPage() {
    moveTo("/login");
    console.log("Moved to login");
  }

  return (
    <div className="register-page">
      {/* Section 1: Redirect to login */}
      <div className="login-btn-container">
        <Typography variant="h4" id="register-page-login-header">
          Have an account?
        </Typography>
        <Typography variant="body1" id="register-page-login-desc">
          Login now and seamlessly explore our services!
        </Typography>
        <Button
          variant="contained"
          id="login-redirect-btn"
          onClick={moveToLoginPage}
        >
          Login
        </Button>
      </div>

      {/* Section 2: Register form container */}
      <div className="form-container">
        <Typography variant="h4" id="company-name">
          Accredian
        </Typography>
        <Typography variant="h5" id="register-desc">
          Register an Account...
        </Typography>
        <form noValidate autoComplete="off">
          <TextField
            id="username"
            className="text-fields"
            label="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            margin="normal"
          />
          <TextField
            id="email"
            className="text-fields"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            margin="normal"
          />
          <TextField
            id="password"
            className="text-fields"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            margin="normal"
          />
          <TextField
            id="confirm-password"
            className="text-fields"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            margin="normal"
          />
          <Button
            variant="contained"
            id="register-btn"
            onClick={registerHandler}
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;

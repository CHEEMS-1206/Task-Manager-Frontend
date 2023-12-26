import React from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toastr from "toastr";
import "toastr/build/toastr.min.css";

const Register = () => {
  const moveTo = useNavigate();

  const [valErr, setValErr] = useState(false);
  const [errContent, setErrContent] = useState("");
  const [userName, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const errHandler = (errValue) => {
    setValErr(true);
    setErrContent(errValue);
    setTimeout(() => {
      setValErr(false);
    }, 3000);
  };
  toastr.options = {
    position: "bottom-right",
    hideDuration: 300,
    timeOut: 3000,
  };
  toastr.clear();

  const isAlphanumeric = (str) => /^[a-zA-Z0-9]+$/.test(str);
  const isValidEmail = (str) => /\S+@\S+\.\S+/.test(str);

  const registerHandler = async (e) => {
    e.preventDefault();

    if (!userName) {
      errHandler("Username field can't be empty.");
      return;
    } else if (!email) {
      errHandler("Email field can't be empty.");
      return;
    } else if (!password) {
      errHandler("Password field can't be empty.");
      return;
    } else if (!confirmPassword) {
      errHandler("Confirm your password.");
      return;
    }

    if (!isAlphanumeric(userName) || userName.length < 5) {
      errHandler(
        "Username must be alphanumeric and at least 5 characters long."
      );
      return;
    }
    if (!isValidEmail(email)) {
      errHandler("Please enter a valid email address.");
      return;
    }

    if (password.length < 8 || password.length > 12) {
      errHandler("Password must be 8 to 12 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      errHandler("Passwords do not match.");
      return;
    }

    const formData = {
      userName,
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:5001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        setTimeout(() => toastr.success(`User Registered Successfully !`), 300);

        // Redirect to the login page after 300ms
        setTimeout(() => {
          moveTo("/login");
        }, 300);
      } else if (response.status === 400) {
        response.json().then((error) => {
          errHandler(error.message);
        });
      } else if (response.status === 500) {
        response.json().then((error) => {
          console.log(error.message)
          errHandler(error.message);
        });
      }
    } catch (error) {
      errHandler(error);
    }
  };
  function moveToLoginPage() {
    moveTo("/login");
  }

  return (
    <div className="register-page">
      {/* Section 1: Redirect to login */}
      <div className="login-btn-container">
        <Typography variant="h4" id="register-page-login-header">
          Have an account?
        </Typography>
        <Typography variant="body1" id="register-page-login-desc">
          Login now and manage your tasks using TaskMaster.
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
          TaskMaster
        </Typography>
        <Typography variant="h5" id="register-desc">
          Register an Account...
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
          <p
            style={{ visibility: `${valErr ? "visible" : "hidden"}` }}
            className="err-container"
          >
            * {errContent}
          </p>
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

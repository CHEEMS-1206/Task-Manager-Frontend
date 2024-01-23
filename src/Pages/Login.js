import React from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toastr from "toastr";
import "toastr/build/toastr.min.css";
import LoaderSpinner from "../Component/LoaderSpineer.js";

const Login = (props) => {
  const moveTo = useNavigate();

  const [valErr, setValErr] = useState(false);
  const [errContent, setErrContent] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!userName) {
      errHandler("Username is required.");
      return;
    } else if (!password) {
      errHandler("Password field can't be blank.");
      return;
    }

    if (password.length < 8) {
      errHandler("Password must be atleast 8 characters.");
      return;
    } else if (password.length > 12) {
      errHandler("Password must be not be greater than 12 characters.");
      return;
    }

    const formData = {
      userName,
      password,
    };

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const { token } = await response.json();
        setTimeout(() => toastr.success(`User Logged in Successfully !`), 300);

        // Save the token in cookies
        props.setIsLoggedIn(true);
        props.setTokenInCookie(token);
        props.rerenderApp();

        // auto logout after 10 mins
        setTimeout(() => {
          setTimeout(() => toastr.error("Your Session Time elapsed."), 300);
          props.onLogout();
          props.rerenderApp();
        }, 600000);

        moveTo("/");
      } else if (response.status === 401) {
        setTimeout(() => toastr.error("Failed to login !"), 300);
        response.json().then((error) => {
          errHandler(error.message);
        });
      } else if (response.status === 500) {
        setTimeout(() => toastr.error("Failed to login !"), 300);
        response.json().then((error) => {
          errHandler(error.message);
        });
      }
    } catch (error) {
      setTimeout(() => toastr.error("Failed to login !"), 300);
      errHandler(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  function moveToRegisterPage() {
    moveTo("/register");
  }
  return isLoading ? (
    <div className="login-page">
      <LoaderSpinner />
    </div>
  ) : (
    <div className="login-page">
      {/* Section 1: Login */}
      <div className="form-container">
        <Typography variant="h4" id="company-name">
          TaskMaster
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
          <p
            style={{ visibility: `${valErr ? "visible" : "hidden"}` }}
            className="err-container"
          >
            * {errContent}
          </p>
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
          Sign up and start managing your tasks with TaskMaster
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

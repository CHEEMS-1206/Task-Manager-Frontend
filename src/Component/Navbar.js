import React from "react";
import { Link } from "react-router-dom";

import toastr from "toastr";
import "toastr/build/toastr.min.css";

import "./componentStyle.css";

function Navbar(props) {
  toastr.options = {
    position: "bottom-right",
    hideDuration: 300,
    timeOut: 3000,
  };

  const navigationHandler = () => {
    if (!props.isLoggedIn) {
      setTimeout(() => toastr.warning("Login to access this link."), 300);
    }
  };

  return (
    <div className="navbar">
      <div className="title-holder">TaskMaster</div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/my-tasks" onClick={navigationHandler}>
            All Tasks
          </Link>
        </li>
        <li>
          <Link to="/add-new-task" onClick={navigationHandler}>
            Add Tasks
          </Link>
        </li>
        <li>
          <Link to="/my-tasks-analytics" onClick={navigationHandler}>
            Task Analytics
          </Link>
        </li>
      </ul>
      {props.isLoggedIn ? (
        <ul>
          <li>
            <Link
              onClick={() => {
                props.onLogout();
                setTimeout(
                  () => toastr.success("User Logged Out successfully."),
                  300
                );
              }}
            >
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
}
export default Navbar;
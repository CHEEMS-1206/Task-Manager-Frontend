import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import toastr from "toastr";
import "toastr/build/toastr.min.css";

import "./componentStyle.css";

function Navbar({ onLogout }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  toastr.options = {
    position: "bottom-right",
    hideDuration: 300,
    timeOut: 3000,
  };
  toastr.clear();

  return (
    <div className="navbar">
      <div className="title-holder">TaskMaster</div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/my-tasks">All Taks</Link>
        </li>
        <li>
          <Link to="/add-new-task">Add Tasks</Link>
        </li>
        <li>
          <Link to="/my-tasks-analytics">Task Analytics</Link>
        </li>
      </ul>
      {isLoggedIn ? (
        <ul>
          <li>
            <Link
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("userName");
                setIsLoggedIn(false);
                setTimeout(
                  () => toastr.success("User Logged Out successfully."),
                  300
                );
                onLogout();
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

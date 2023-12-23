import React from "react";
import { Link } from "react-router-dom";

import "./componentStyle.css";

function Navbar() {
  const isLoggedIn = localStorage.getItem("token") ? true : false;

  return (
    <div className="navbar">
      <div className="title-holder">Task Manager</div>
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
            <Link to="/logout">Logout</Link>
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

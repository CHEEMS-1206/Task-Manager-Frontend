import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./componentStyle.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="title-holder">Task Manager</div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/all-tasks">All Taks</Link>
        </li>
        <li>
          <Link to="/add-new-task">Add Tasks</Link>
        </li>
        <li>
          <Link to="/my-task-analytics">Task Analytics</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
  );
}
export default Navbar;

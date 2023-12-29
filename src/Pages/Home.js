import React from "react";

import "animate.css";

// imported components
import Navbar from "../Component/Navbar.js";

function Home({ onLogout, isLoggedIn }) {
  return (
    <div className="home-container">
      <Navbar onLogout={onLogout}/>
      <div className="header-container">
        <h1 className="animate__animated animate__backInLeft animate__slow">
          TaskMaster
        </h1>
        <p className="animate__animated animate__backInRight animate__slow">
          TaskMaster is your ultimate solution for seamless task management.
          Stay organized, boost productivity, and achieve your goals
          effortlessly with our intuitive and powerful task management platform.
        </p>
        {isLoggedIn ? (
          <p
            className="animate__animated animate__backInLeft animate__slow"
            id="special-statement"
          >
            Manage your Tasks efficently with TaskMaster.
          </p>
        ) : (
          <p
            className="animate__animated animate__backInLeft animate__slow"
            id="special-statement"
          >
            Create an account or register to manage your tasks.
          </p>
        )}
      </div>
    </div>
  );
}
export default Home;
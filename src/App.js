import { useState } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

import toastr from "toastr";
import "toastr/build/toastr.min.css";

import Register from "./Pages/Regsiter.js";
import Home from "./Pages/Home.js";
import Login from "./Pages/Login.js";
import AllTasks from "./Pages/AllTasks.js";
import AddNewTask from "./Pages/AddNewTask.js";
import UpdateTask from "./Pages/UpdateTask.js";
import TasksAnalytics from "./Pages/TaskAnalytics.js";

function AppWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [key, setKey] = useState(0); // State to control the key of App component

  const rerenderApp = () => {
    setKey((prevKey) => prevKey + 1); // Increment key to trigger a re-render
  };

  return (
    <App
      key={key}
      rerenderApp={rerenderApp}
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}
    />
  );
}

function App(props) {
  toastr.options = {
    position: "bottom-right",
    hideDuration: 300,
    timeOut: 3000,
  };

  const setTokenInCookie = (cookieName) => {
    // Setting Cookie
    const expirationDate = new Date(Date.now() + 10 * 60 * 1000); // disable after 10 mins
    const expires = expirationDate.toUTCString();
    document.cookie = `token=${cookieName}; path=/; sameSite=Strict; Secure; expires=${expires}`;
  };

  const getTokenFromCookie = (cookieName) => {
    // Getting cookie
    const cookies = document.cookie.split(";"); // Split the cookies string into an array
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim(); // Trim any leading or trailing spaces
      // Check if this is the cookie we're looking for
      if (cookie.startsWith(cookieName + "=")) {
        return cookie.substring(cookieName.length + 1); // Return the value of the cookie
      }
    }
    return null;
  };

  const deleteTokenFromCookie = (cookieName) => {
    const expirationDate = new Date(Date.now());
    const expires = expirationDate.toUTCString();
    document.cookie = `token=${cookieName}; path=/; sameSite=Strict; Secure; expires=${expires}`;
  };

  const handleUnethicalDataAccess = (msg) => {
    setTimeout(() => toastr.error(msg), 300);
    setTimeout(() => toastr.error("Please Login again !"), 300);
    onLogout();
  };

  const validateToken = async () => {
    const token = getTokenFromCookie("token");
    if (token !== "") {
      try {
        const response = await fetch("http://localhost:5001/api/verify-token", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          props.setIsLoggedIn(true);
          // console.log(props.isLoggedIn, token);
          return true;
        } else if (response.status === 401) {
          // token expired login again
          handleUnethicalDataAccess("Your session expired !");
          response.json().then((error) => {
            console.log(error.msg);
          });
          return false;
        } else if (response.status === 403) {
          // invalid token login again
          handleUnethicalDataAccess("Invalid credentials !");
          response.json().then((error) => {
            console.log(error.msg);
          });
          return false;
        } else if (response.status === 500) {
          // server error login again
          response.json().then((error) => {
            console.log(error.message);
          });
          return false;
        }
      } catch (error) {
        // clientside error
        console.log(error.message);
      }
    }
  };

  const onLogout = () => {
    deleteTokenFromCookie("token");
    props.setIsLoggedIn(false);
    props.rerenderApp();
  };

  const tokenInCookie = getTokenFromCookie("token");
  if (tokenInCookie && tokenInCookie !== "") {
    validateToken(tokenInCookie);
  }

  return (
    <BrowserRouter>
      {props.isLoggedIn ? (
        <Routes>
          <Route
            path="/"
            element={
              <Home
                rerenderApp={props.rerenderApp}
                isLoggedIn={props.isLoggedIn}
                onLogout={onLogout}
                validateToken={validateToken}
              />
            }
          />
          <Route
            path="/my-tasks"
            element={
              <AllTasks
                rerenderApp={props.rerenderApp}
                isLoggedIn={props.isLoggedIn}
                getTokenFromCookie={getTokenFromCookie}
                onLogout={onLogout}
                validateToken={validateToken}
              />
            }
          />
          <Route
            path="/add-new-task"
            element={
              <AddNewTask
                rerenderApp={props.rerenderApp}
                isLoggedIn={props.isLoggedIn}
                getTokenFromCookie={getTokenFromCookie}
                onLogout={onLogout}
              />
            }
          />
          <Route
            path="/update-task/:taskId"
            element={<UpdateTask getTokenFromCookie={getTokenFromCookie} />}
          />
          <Route
            path="/my-tasks-analytics"
            element={
              <TasksAnalytics
                rerenderApp={props.rerenderApp}
                isLoggedIn={props.isLoggedIn}
                getTokenFromCookie={getTokenFromCookie}
                onLogout={onLogout}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={
              <Login
                rerenderApp={props.rerenderApp}
                setIsLoggedIn={props.setIsLoggedIn}
                setTokenInCookie={setTokenInCookie}
                onLogout={onLogout}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default AppWrapper;
import { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Register from "./Pages/Regsiter.js";

import Home from "./Pages/Home.js";
import Login from "./Pages/Login.js";

function AppWrapper() {
  const [key, setKey] = useState(0); // State to control the key of App component

  const handleLogin = () => {
    setKey((prevKey) => prevKey + 1); // Increment key to trigger a re-render
  };

  return <App key={key} handleLogin={handleLogin} />;
}

function App({handleLogin}) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [localStorage.getItem("token")]);

  console.log(isLoggedIn);
  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Home onLogout={handleLogin} />} />
          <Route path="/logout" element={<div>LOGOUT</div>} />
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/my-tasks" element={<div>My tasks</div>} />
          <Route path="/add-new-task" element={<div>Add New Task</div>} />
          <Route path="/update-task" element={<div>Update task</div>} />
          <Route path="/remove-task" element={<div>Delete task</div>} />
          <Route
            path="/my-tasks-analytics"
            element={<div>My tasks analytics</div>}
          />
          <Route path="/my-task:id" element={<div>Task by id</div>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default AppWrapper;

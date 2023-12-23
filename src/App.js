import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

import Home from "./Pages/Home.js";
import Login from "./Pages/Login.js";

function App() {
  const isLoggedIn = localStorage.getItem("token") ? true : false;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/logout"
          element={isLoggedIn ? <div>LOGOUT</div> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Home /> : <div>Register</div>}
        />
        <Route
          path="/my-tasks"
          element={isLoggedIn ? <div>My tasks</div> : <Navigate to="/login" />}
        />
        <Route
          path="/add-new-task"
          element={
            isLoggedIn ? <div>Add New Task</div> : <Navigate to="/login" />
          }
        />
        <Route
          path="/update-task"
          element={
            isLoggedIn ? <div>Update task</div> : <Navigate to="/login" />
          }
        />
        <Route
          path="/remove-task"
          element={
            isLoggedIn ? <div>Delete task</div> : <Navigate to="/login" />
          }
        />
        <Route
          path="/my-tasks-analytics"
          element={
            isLoggedIn ? (
              <div>My tasks analytics</div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/my-task:id"
          element={
            isLoggedIn ? <div>Task by id</div> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={isLoggedIn ? <Home/> : <Navigate to="/login" /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import toastr from "toastr";
import "toastr/build/toastr.min.css";

import Navbar from "../Component/Navbar.js";

const AddNewTask = ({ onLogout }) => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    taskName: "",
    taskDescription: "",
    taskDeadline: "",
    token: localStorage.getItem("token"),
  });

  const [valErr, setValErr] = useState(false);
  const [errContent, setErrContent] = useState("");

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.taskName) {
      errHandler("Task name must be provided.");
      return;
    } else if (!formData.taskDescription) {
      errHandler("Task description can't be empty.");
      return;
    } else if (!formData.taskDeadline) {
      errHandler("Chose a specific deadline date.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5001/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toastr.success("Task Added successfully !");
        Navigate("/my-tasks");
      } else {
        response.json().then((error) => {
          errHandler(error.msg);
        });
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="add-tasks-page">
      <Navbar onLogout={onLogout} />
      <h1>Add New Task</h1>
      <div className="add-task-container">
        <form className="task-form" onSubmit={handleSubmit}>
          <legend>Task Title</legend>
          <input
            type="text"
            name="taskName"
            placeholder="Task Name"
            value={formData.taskName}
            onChange={handleChange}
          />
          <legend>Task Description </legend>
          <input
            type="text"
            name="taskDescription"
            placeholder="Task Description"
            value={formData.taskDescription}
            onChange={handleChange}
          />
          <legend>Deadline Date</legend>
          <input
            type="date"
            name="taskDeadline"
            value={formData.taskDeadline}
            onChange={handleChange}
          />
          <p
            style={{ visibility: `${valErr ? "visible" : "hidden"}` }}
            className="err-container"
          >
            * {errContent}
          </p>
          <button className="add-task-button" type="submit">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewTask;

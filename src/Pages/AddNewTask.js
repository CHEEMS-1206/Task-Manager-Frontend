import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../Component/Navbar.js";

const AddNewTask = ({ onLogout }) => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    taskName: "",
    taskDescription: "",
    taskDeadline: "",
    token: localStorage.getItem("token"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.taskName ||
      !formData.taskDescription ||
      !formData.taskDeadline
    ) {
      alert("Form values cant be empty !");
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
        alert("Task Added successfully !");
        Navigate("/my-tasks");
      } else {
        alert("Failed to Add task");
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
          <button className="add-task-button" type="submit">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewTask;

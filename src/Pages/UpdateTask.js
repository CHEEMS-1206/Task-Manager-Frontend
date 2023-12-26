import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTask = () => {
  const Navigate = useNavigate();
  const params = useParams();
  const taskId = params.taskId;
  const [task, setTask] = useState({
    taskName: "",
    taskDescription: "",
    taskDeadline: "",
    taskStatus: "",
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:5001/api/task/${taskId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const taskData = await response.json();
          setTask(taskData);
        } else {
          console.error("Failed to fetch task");
        }
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5001/api/task/${taskId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (response.ok) {
        alert("Task Updated successfully !");
        Navigate("/my-tasks");
      } else if(response.status === 303){
        alert("Default Task can't be updated.")
        Navigate("/my-tasks")
      }
      else {
        alert("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="update-task-page">
      <div className="fake-navbar"></div>
      <h1>Update Task</h1>
      <div className="update-task-container">
        <form className="task-form" onSubmit={handleSubmit}>
          <legend>Task Title</legend>
          <input
            type="text"
            name="taskName"
            placeholder="Task Name"
            value={task.taskName}
            onChange={handleChange}
          />
          <legend>Task Description</legend>
          <input
            type="text"
            name="taskDescription"
            placeholder="Task Description"
            value={task.taskDescription}
            onChange={handleChange}
          />
          <legend>Deadline Date</legend>
          <input
            type="date"
            name="taskDeadline"
            value={task.taskDeadline}
            onChange={handleChange}
          />
          <legend>Status</legend>
          <select
            name="taskStatus"
            value={task.taskStatus}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <button className="update-task-button" type="submit">
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;

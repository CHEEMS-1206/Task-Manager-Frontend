import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import toastr from "toastr";
import "toastr/build/toastr.min.css";
import LoaderSpinner from "../Component/LoaderSpineer.js";

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
  const [valErr, setValErr] = useState(false);
  const [errContent, setErrContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setIsLoading(true);
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
          const parsedDate = new Date(taskData.taskDeadline);
          const year = parsedDate.getFullYear();
          const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
          const day = String(parsedDate.getDate()).padStart(2, "0");

          taskData.taskDeadline = `${year}-${month}-${day}`;
          setTask(taskData);
        } else {
          console.error("Failed to fetch task");
        }
      } catch (error) {
        console.error("Error fetching task:", error);
      } finally {
        setIsLoading(false);
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
    if (!task.taskName) {
      errHandler("Task name must be provided.");
      return;
    } else if (!task.taskDescription) {
      errHandler("Task description can't be empty.");
      return;
    } else if (!task.taskDeadline) {
      errHandler("Chose a specific deadline date.");
      return;
    }
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
        setTimeout(() => toastr.success("Task updated successfully !"), 300);
        Navigate("/my-tasks");
      } else if (response.status === 303) {
        setTimeout(() => toastr.error("Can't update default task."), 300);
        Navigate("/my-tasks");
      } else {
        response.json().then((error) => {
          errHandler(error.msg);
        });
      }
    } catch (error) {
      errHandler("Error updating task.");
    }
  };

  return isLoading ? (
    <div className="update-task-page">
      <LoaderSpinner />
    </div>
  ) : (
    <div className="update-task-page">
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
          <p
            style={{ visibility: `${valErr ? "visible" : "hidden"}` }}
            className="err-container"
          >
            * {errContent}
          </p>
          <button className="update-task-button" type="submit">
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;

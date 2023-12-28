import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen, fas } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {useState} from "react";

import LoaderSpinner from "./LoaderSpineer.js";

import toastr from "toastr";
import "toastr/build/toastr.min.css";

library.add(faFilePen, fas);

const TaskRow = ({ task, afterDelete }) => {
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleUpdate = () => {
    Navigate(`/update-task/${task.taskId}`);
  };

  toastr.options = {
    position: "bottom",
    hideDuration: 300,
    timeOut: 3000,
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      const token = localStorage.getItem("token");
      const userRes = window.confirm(
        `You sure to to delete task : ${task.taskName} ?`
      );
      if (userRes) {
        const response = await fetch(
          `http://localhost:5001/api/task/${task.taskId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          setTimeout(() => toastr.success("Task deleted successfully."), 300);
          afterDelete();
        } else if (response.status === 303) {
          setTimeout(() => toastr.warning("Default Tasks can't be deleted."),300);
        } else {
          setTimeout(() => toastr.error("Failed to delete task"),300);
        }
      }
    } catch (error) {
      setTimeout(() => toastr.error("Failed to delete task"), 300);
      console.error("Error deleting task:", error);
    }finally{
      setIsLoading(false)
    }
  };

  let colorCode;
  if (task.taskStatus === "Pending") {
    colorCode = "#3498db";
  } else if (task.taskStatus === "Completed") {
    colorCode = "#1abc9c";
  } else colorCode = "#c0392b";

  const getDateChanged = (value) => {
    const date = new Date(value);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return isLoading ? (
    <div className="task-card">
      <LoaderSpinner />
    </div>
  ) : (
    <div className="task-card">
      <div className="task-title">{task.taskName}</div>
      <div className="task-description">{task.taskDescription}</div>
      <div className="task-deadline">
        Added on : {getDateChanged(task.taskCreatedAt)}
      </div>
      <div className="task-deadline">
        Deadline : {getDateChanged(task.taskDeadline)}
      </div>
      <div className="task-status">
        <p style={{ backgroundColor: colorCode }}>{task.taskStatus}</p>
        {task.taskStatus === "Missed" || task.taskStatus === "Completed" ? (
          <div className="task-actions">
            <FontAwesomeIcon
              icon="fa-solid fa-trash"
              onClick={handleDelete}
              className="action-btn"
              style={{ color: "crimson" }}
            />
          </div>
        ) : (
          <div className="task-actions">
            <FontAwesomeIcon
              icon="fa-solid fa-file-pen"
              onClick={handleUpdate}
              className="action-btn"
              style={{ color: "green" }}
            />
            <FontAwesomeIcon
              icon="fa-solid fa-trash"
              onClick={handleDelete}
              className="action-btn"
              style={{ color: "crimson" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskRow;

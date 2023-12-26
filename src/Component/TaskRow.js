import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen, fas } from "@fortawesome/free-solid-svg-icons";

library.add(faFilePen, fas);

const TaskRow = ({ task }) => {
  const handleUpdate = () => {
    // Handle navigation to task update page
  };

  const handleDelete = () => {
    // Handle deletion of the task from the database
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

  return (
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
      </div>
    </div>
  );
};

export default TaskRow;

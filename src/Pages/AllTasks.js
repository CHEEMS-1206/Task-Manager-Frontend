// AllTasks.js
import React, { useState, useEffect } from "react";
import Navbar from "../Component/Navbar.js";
import TaskRow from "../Component/TaskRow.js";

const AllTasks = ({ onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    fetchTasks(currentPage, 10);
  }, [currentPage]);

  const fetchTasks = async (page = 1, limit = 10) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5001/api/all-tasks?page=${page}&limit=${limit}}}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMaxPage(data.totalPages);
        setTasks(data.tasks);
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, maxPage));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="all-tasks-page">
      <Navbar onLogout={onLogout} />
      <div className="all-tasks-holder">
        {tasks.length === 0 ? (
          <p>No Tasks created by you.</p>
        ) : (
          <div className="card-container">
            <h1>List of Tasks : </h1>
            <div className="all-tasks">
              {tasks.map((task) => (
                <TaskRow afterDelete={fetchTasks} key={task._id} task={task} />
              ))}
            </div>
          </div>
        )}
        <div className="pagination">
          <button onClick={goToPreviousPage}>Previous</button>
          <span>Page: {currentPage}</span>
          <button onClick={goToNextPage}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default AllTasks;

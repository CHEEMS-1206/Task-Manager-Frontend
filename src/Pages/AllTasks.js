// AllTasks.js
import React, { useState, useEffect } from "react";
import Navbar from "../Component/Navbar.js";
import TaskRow from "../Component/TaskRow.js";

import toastr from "toastr";
import "toastr/build/toastr.min.css";
import LoaderSpinner from "../Component/LoaderSpineer.js";

const AllTasks = (props) => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTasks(currentPage, 10);
  }, [currentPage]);

  toastr.options = {
    position: "bottom-right",
    hideDuration: 300,
    timeOut: 3000,
  };

  const fetchTasks = async (page = 1, limit = 10) => {
    const token = props.getTokenFromCookie("token");

    if ( ! await props.validateToken(token)) {
      return;
    } else {
      try {
        setIsLoading(true);
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
          setTimeout(() => toastr.success("All tasks fetched."), 300);
        } else {
          console.log("Failed To fetch tasks.");
          setTimeout(() => toastr.error("Couldn't fetch tasks."), 300);
        }
      } catch (error) {
        setTimeout(() => toastr.error("Couldn't fetch tasks."), 300);
        console.log("Failed To fetch tasks.");
      } finally {
        setIsLoading(false);
      }
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
      <Navbar
        rerenderApp={props.rerenderApp}
        isLoggedIn={props.isLoggedIn}
        onLogout={props.onLogout}
      />
      {isLoading ? (
        <div className="all-tasks-holder">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="all-tasks-holder">
          {tasks.length === 0 ? (
            <p>No Tasks created by you.</p>
          ) : (
            <div className="card-container">
              <h1>List of Tasks</h1>
              <div className="all-tasks">
                {tasks.map((task) => (
                  <TaskRow
                    afterDelete={fetchTasks}
                    key={task._id}
                    task={task}
                    getTokenFromCookie={props.getTokenFromCookie}
                    validateToken={props.validateToken}
                  />
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
      )}
    </div>
  );
};

export default AllTasks;

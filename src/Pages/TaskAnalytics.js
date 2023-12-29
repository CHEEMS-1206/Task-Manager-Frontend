import React, { useState, useEffect } from "react";
import Navbar from "../Component/Navbar.js";

import toastr from "toastr";
import "toastr/build/toastr.min.css";
import LoaderSpinner from "../Component/LoaderSpineer.js";
import Accordion from "../Component/Accordion.js";

import { AgChartsReact } from "ag-charts-react";

const TasksAnalytics = ({ onLogout }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [numericalData, setNumericalData] = useState([]);
  const [tasksByWeek, setTaksByWeek] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  toastr.options = {
    position: "bottom-right",
    hideDuration: 300,
    timeOut: 3000,
  };

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5001/api/analytics`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        // getting counts for firts chart
        const statusCounts = data.reduce((acc, task) => {
          acc[task.taskStatus] = (acc[task.taskStatus] || 0) + 1;
          return acc;
        }, {});
        const numericallData = [
          statusCounts["Pending"] || 0,
          statusCounts["Completed"] || 0,
          statusCounts["Missed"] || 0,
        ];
        setNumericalData(numericallData);
        console.log(numericallData);

        // chart 2 data getting data for last 28 days in 4 quarters
        const currentDate = new Date();
        const last28Days = new Date(
          currentDate.getTime() - 28 * 24 * 60 * 60 * 1000
        ); // Get date 28 days ago

        // Filter tasks within the last 28 days
        const filteredTasks = data.filter((task) => {
          const taskDate = new Date(task.taskCreatedAt);
          return (
            taskDate >= last28Days &&
            taskDate <= currentDate &&
            task.taskStatus !== "Default"
          );
        });

        // Sort filtered tasks by taskCreatedAt in ascending order
        filteredTasks.sort(
          (a, b) => new Date(a.taskCreatedAt) - new Date(b.taskCreatedAt)
        );

        // Divide tasks into four quarters (last 7 days each)
        const quarters = [[], [], [], []];
        const quarterSize = 7;

        filteredTasks.forEach((task) => {
          const taskDate = new Date(task.taskCreatedAt);
          const daysDiff = Math.floor(
            (currentDate - taskDate) / (24 * 60 * 60 * 1000)
          );
          const quarterIndex = Math.floor(daysDiff / quarterSize);

          quarters[quarterIndex].push(task);
        });

        // Calculate counts for each type of task in each quarter
        const quarterStats = quarters.map((quarter, index) => {
          const totalTasks = quarter.length;
          const pendingTasks = quarter.filter(
            (task) => task.taskStatus === "Pending"
          ).length;
          const completedTasks = quarter.filter(
            (task) => task.taskStatus === "Completed"
          ).length;
          const missedTasks = quarter.filter(
            (task) => task.taskStatus === "Missed"
          ).length;

          return {
            quarter: `Q${index + 1}`,
            totalTasks: totalTasks,
            pendingTasks,
            completedTasks,
            missedTasks,
          };
        });

        console.log(quarterStats);
        setTaksByWeek(quarterStats);

        setTimeout(() => toastr.success("All tasks fetched."), 300);
      } else {
        console.log("Failed To fetch tasks. 1");
        setTimeout(() => toastr.error("Couldn't fetch tasks."), 300);
      }
    } catch (error) {
      setTimeout(() => toastr.error("An error occured."), 300);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const chartItems = [
    {
      title: "Numerical Comparision",
      content:
        (numericalData[0] === 0 &&
          numericalData[1] === 0 &&
          numericalData[2] === 0) ? (
          "You Don't have enough tasks to show analytics."
        ) : (
          <AgChartsReact
            options={{
              title: {
                text: "Tasks Composition",
              },
              data: [
                { tag: "Pending", numbers: numericalData[0] },
                { tag: "Completed", numbers: numericalData[1] },
                { tag: "Missed", numbers: numericalData[2] },
              ],
              series: [
                {
                  type: "pie",
                  angleKey: "numbers",
                  legendItemKey: "tag",
                },
              ],
            }}
          />
        ),
    },
    {
      title: "Tasks By Date",
      content:
        tasksByWeek.length === 0 ||
        (tasksByWeek[0].totalTasks === 0 &&
          tasksByWeek[1].totalTasks === 0 &&
          tasksByWeek[2].totalTasks === 0 &&
          tasksByWeek[3].totalTasks === 0) ? (
          "No tasks history in last 28 days."
        ) : (
          <AgChartsReact
            className="quarterChart"
            options={{
              title: {
                text: "Tasks statuses in last 28 Days.",
              },
              subtitle: {
                text: "Segragated in quarters.",
              },
              data: tasksByWeek,
              series: [
                {
                  type: "bar",
                  xKey: "quarter",
                  yKey: "pendingTasks",
                  yName: "Pending Tasks",
                  stacked: true,
                  normalizedTo: 100,
                },
                {
                  type: "bar",
                  stacked: true,
                  normalizedTo: 100,
                  xKey: "quarter",
                  yKey: "completedTasks",
                  yName: "Completed Tasks",
                },
                {
                  type: "bar",
                  stacked: true,
                  normalizedTo: 100,
                  xKey: "quarter",
                  yKey: "missedTasks",
                  yName: "Missed Tasks",
                },
              ],
            }}
          />
        ),
    },
  ];

  return (
    <div className="task-analytics-page">
      <Navbar onLogout={onLogout} />
      {isLoading ? (
        <div className="all-charts-holder">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="all-charts-holder">
          <h1 className="all-charts-holder-header">Your Tasks analytics </h1>
          <Accordion items={chartItems} />
        </div>
      )}
    </div>
  );
};

export default TasksAnalytics;

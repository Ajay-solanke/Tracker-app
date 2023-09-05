import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskForm from "./component/TaskFrom";
import TaskList from "./component/TaskList";

import "./home.css";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const completeTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const editTask = (taskId) => {
    setEditTaskId(taskId);
  };

  const calculateDueDateNotifications = () => {
    const now = new Date();
    const notifiedTasks = new Set();

    tasks.forEach((task) => {
      const dueDateTime = new Date(task.dueDate + " " + task.dueTime);
      const timeDiff = dueDateTime - now;
      const daysDiff = timeDiff / 1000;

      if (daysDiff < 0 && !task.completed && !notifiedTasks.has(task.id)) {
        toast.warning(`Task "${task.title}" is overdue!`);
        notifiedTasks.add(task.id);
      } else if (
        daysDiff >= 0 &&
        daysDiff < 2 &&
        !task.completed &&
        !notifiedTasks.has(task.id)
      ) {
        toast.info(`Task "${task.title}" is expiring soon.`);
        notifiedTasks.add(task.id);
      }
    });
  };

  useEffect(() => {
    calculateDueDateNotifications();
  }, [tasks]);
  return (
    <div className="app">
      <h1 className="h1">
        <u>Tracker App</u>
      </h1>
      <TaskForm
        addTask={addTask}
        editTaskId={editTaskId}
        tasks={tasks}
        setEditTaskId={setEditTaskId}
        setTasks={setTasks} // Pass the setTasks function to TaskForm
      />
      <TaskList
        tasks={tasks}
        completeTask={completeTask}
        deleteTask={deleteTask}
        editTask={editTask} // Pass the editTask function to TaskList component
      />

      <ToastContainer position="top-right" autoClose={60000} />
    </div>
  );
}

export default Home;

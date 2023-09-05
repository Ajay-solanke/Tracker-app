import React, { useState, useEffect } from "react";

const TaskForm = ({ addTask, editTaskId, tasks, setEditTaskId, setTasks }) => {
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [dueDate, setDueDate] = useState("");

  const [dueTime, setDueTime] = useState("");

  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (editTaskId !== null) {
      const taskToEdit = tasks.find((task) => task.id === editTaskId);
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setDueDate(taskToEdit.dueDate);
      setDueTime(taskToEdit.dueTime);
      setIsCompleted(taskToEdit.completed);
    }
  }, [editTaskId, tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editTaskId !== null) {
      const updatedTask = {
        id: editTaskId,
        title,
        description,
        dueDate,
        dueTime,
        completed: isCompleted,
      };

      const taskIndex = tasks.findIndex((task) => task.id === editTaskId);

      const updatedTasks = [...tasks];

      updatedTasks[taskIndex] = updatedTask;

      setTasks(updatedTasks);
    } else {
      const newTask = {
        id: new Date().getTime(),
        title,
        description,
        dueDate,
        dueTime,
        completed: false,
      };

      addTask(newTask);
    }

    setTitle("");

    setDescription("");

    setDueDate("");

    setDueTime("");

    setEditTaskId(null);

    const now = new Date();
    const dueDateTime = new Date(dueDate + " " + dueTime);
    if (dueDateTime > now) {
      const timeDiff = dueDateTime - now;
      setTimeout(() => {
        alert(`Task "${title}" is pending!`);
      }, timeDiff);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        placeholder="Task Title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="textarea"
        placeholder="Task Description"
        name="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="date"
        type="date"
        name="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <input
        className="time"
        type="time"
        name="time"
        value={dueTime}
        onChange={(e) => setDueTime(e.target.value)}
      />
      {/* 
      <label>
        Completed:
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={(e) => setIsCompleted(e.target.checked)}
          disabled={editTaskId !== null && isCompleted}
        />
      </label> */}

      <button type="submit">
        {editTaskId !== null ? "Edit Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;

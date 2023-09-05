import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { GrCompliance } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";

const TaskList = ({ tasks, completeTask, deleteTask, editTask }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`task ${task.completed ? "completed" : ""}`}
        >
          <div className="task-details">
            <p>Title: {task.title}</p>
            <p>Description: {task.description}</p>
            <p>Due Date: {task.dueDate}</p>
          </div>
          <div className="btnbackground">
            <div className="task-actions">
              <button onClick={() => completeTask(task.id)}>
                <GrCompliance className="complete" color="blue" />
              </button>
              <button onClick={() => deleteTask(task.id)}>
                <AiOutlineDelete className="complete" />
              </button>
              <button onClick={() => editTask(task.id)}>
                <FiEdit className="complete" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;

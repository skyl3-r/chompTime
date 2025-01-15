"use client";

import React, { useState } from 'react';
import axios from 'axios';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    const task = { description: e.target.task.value, assignedTo: e.target.assignedTo.value };
    const response = await axios.post('/api/tasks', task);
    setTasks([...tasks, response.data.task]);
  };

  return (
    <form onSubmit={handleTaskSubmit}>
      <input type="text" name="task" placeholder="Task Description" required />
      <input type="email" name="assignedTo" placeholder="Assign to (email)" required />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskManager;
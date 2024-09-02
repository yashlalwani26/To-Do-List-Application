import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await axios.get('/api/tasks');
      setTasks(res.data);
    };

    fetchTasks();
  }, []);

  const addTask = async () => {
    if (newTask.trim()) {
      const res = await axios.post('/api/tasks', { title: newTask });
      setTasks([...tasks, res.data]);
      setNewTask('');
    }
  };

  const updateTask = async (id, updatedTask) => {
    const res = await axios.put(`/api/tasks/${id}`, updatedTask);
    setTasks(tasks.map(task => (task._id === id ? res.data : task)));
  };

  const deleteTask = async (id) => {
    await axios.delete(`/api/tasks/${id}`);
    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => updateTask(task._id, { completed: !task.completed })}
            />
            <input
              type="text"
              value={task.title}
              onChange={(e) => updateTask(task._id, { title: e.target.value })}
            />
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

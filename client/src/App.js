import React, { useEffect, useState } from 'react';
import { getTasks, addTask, updateTask, deleteTask } from './api';
// import "tailwindcss/tailwind.css"

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // fetch the task when the component loads
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try{
      const response = await getTasks();
      setTasks(response.data);
    }
    catch(err){
      console.error('Error fetching task',err);
    }
  };

  const handleAddTask = async () => {
    if(newTask) {
      try{
        const task = {title: newTask, status: 'pending'};
        await addTask(task);
        setNewTask('');
        fetchTasks();
      }
      catch(err){
        console.error('Error adding task',err);
      }
    }
  };

  const handleDeleteTask = async (id) => {
    try{
      await deleteTask(id);
      fetchTasks();
    }
    catch(err){
      console.error('Error deleting task',err);
    }
  };

  const handleToggleComplete = async (id,completed) => {
    try{
      await updateTask(id, {completed: !completed});
      fetchTasks();
    }
    catch(err){
      console.error('Error updating task',err);
    }
  }
  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <div className='bg-white p-6 rounded shadow-lg w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-4 text-center'>To-Do List</h1>
        <div className='mb-4'>
          <input 
            type='text'
            placeholder='New Task'
            className='border p-2 w-full rounded mb-2'
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition duration-200'
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </div>

        <ul className='space-y-2'>
          {tasks.map((task) => (
            <li 
              key={task._id}
              className={`p-4 border rounded ${task.completed ? 'line-through bg-green-200' : 'bg-gray-200'}`}
            >
              <span>{task.title}</span>
              <div className='flex justify-end space-x-2 mt-2'>
                <button
                  className='text-white bg-green-500 px-2 py-1 rounded hover:bg=green-600'
                  onClick={() => handleToggleComplete(task._id, task.completed)}
                >
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button
                  className='text-white bg-red-500 px-2 py-1 rounded hover:bg-red-600'
                  onClick={() => handleDeleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>      
    </div>
  );
}

export default App

const express = require('express');
const {createTask, getAllTasks, updateTask, deleteTask} = require('../controller/taskController');
const router = express.Router();

// POST /tasks - Create a new tasks 
router.post('/tasks', createTask);

// GET /tasks - Get all tasks
router.get('/tasks', getAllTasks);

// PUT /tasks/:id - Update tasks by id
router.put('/tasks/:id', updateTask);

// DELETE /tasks/:id - Delete tasks by id
router.delete('/tasks/:id', deleteTask);

module.exports = router;
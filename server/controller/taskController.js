const Task = require("../model/taskModel");

// Create a new task (POST /tasks)
const createTask = async (req,res) => {
    try{
        const newTask = new Task(req.body);
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    }
    catch(error){
        res.status(400).json({error: 'Error in Creating task'});
    }
};

// Get all tasks (GET /tasks)
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks); // Send response once here
    } catch (error) {
        res.status(500).json({ message: error.message }); // Or send error response once
    }
};

// Update a tasks by ID (PUT /tasks/:id)
const updateTask = async (req,res) => {
    try{
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if(!updatedTask){
            return res.status(404).json({error: 'Task not found'});
        }
        res.status(200).json(updatedTask);
    }
    catch(error){
        res.status(400).json({error: 'Error in updating task'});
    }
};

// Delete a task by ID (DELETE /tasks/:id)
const deleteTask = async (req,res) => {
    try{
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if(!deletedTask){
            return res.status(404).json({error: 'Task not found'});
        }
        res.status(200).json({message: 'Task deleted successfully'});
    }
    catch(error){
        res.status(400).json({error: 'Error in Deleting task'});
    }
};

module.exports = {createTask, getAllTasks, updateTask, deleteTask};
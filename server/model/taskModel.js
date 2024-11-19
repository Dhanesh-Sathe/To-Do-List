const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    completed: {
        type: Boolean,
        default: false,
      },
    createdAt:{
        type:Date,
        default:Date.now
    },
    dueDate:{
        type:Date,
        default:null
    },
    priority:{
        type:String,
        enum:['low','medium','high'],
        default:'medium'
    },
    // userId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'User',
    //     required:true
    // }
});

// Export the Task Model
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
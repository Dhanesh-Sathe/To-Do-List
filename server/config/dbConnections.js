const mongoose = require('mongoose');
const connectDB = async () => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/To-Do-List');
        console.log("Connect to MongoDB");
    }
    catch(err){
        console.error(err);
    }
}

module.exports = connectDB;
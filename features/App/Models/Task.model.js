const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: String,
    description: String,
    type: String, // can be bug, feature or story
    assignee: String,
    sprint:String,
    status: String, // can be to-do, in-progress, done
  });
  
  const TaskModel = mongoose.model('Task', taskSchema);
  module.exports=TaskModel
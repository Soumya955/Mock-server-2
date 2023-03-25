const mongoose = require("mongoose");



const sprintSchema = new mongoose.Schema({
    sprint: String
});
  
const SprintModel = mongoose.model('Sprint', sprintSchema);


module.exports = SprintModel
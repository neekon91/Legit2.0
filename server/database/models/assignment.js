const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignment = new Schema({
  name: String,
  maxScore: Number
});

const Assignment = mongoose.model("Assignment", assignment);

module.exports = Assignment;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignment = new Schema({
  name: String,
  maxScore: Number,
  sectionId: String
});

const Assignment = mongoose.model("Assignment", assignment);

module.exports = Assignment;

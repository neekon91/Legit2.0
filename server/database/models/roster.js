const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roster = new Schema({
  class_id: String,
  teacher_id: String,
  student_id: String
});

const Roster = mongoose.model("Roster", roster);

module.exports = Roster;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const section = new Schema({
  name: String,
  grade: Number,
  subject: String,
  teacher_id: Number,
  student_id: Number
});

const Section = mongoose.model("Section", section);
module.exports = Section;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const section = new Schema({
  name: String,
  grade: Number,
  subject: String
});

const Section = mongoose.model("Section", section);
module.exports = Section;

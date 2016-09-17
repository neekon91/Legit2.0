var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var section = new Schema({
  name: String,
  grade: Number,
  subject: String
});

var Section = mongoose.model("Section", section);
module.exports = Section;

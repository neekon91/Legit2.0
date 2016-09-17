var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assignment = new Schema({
  name: String,
  maxScore: Number
});

var Assignment = mongoose.model("Assignment", assignment);

module.exports = Assignment;

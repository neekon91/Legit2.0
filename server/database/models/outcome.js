const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outcome = new Schema({
 student_id: String,
 assignment_id: String,
 grade: Number,
 maxGrade: Number,
 date: {type: Date, default: Date.now}
});

const Outcome = mongoose.model("Outcome", outcome);

module.exports = Outcome;
//
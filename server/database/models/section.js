// var Sequelize = require('sequelize');
// var db = require('../database_config.js');
//
// var Section = db.define('Section', {
//   name: Sequelize.STRING,
//   grade: Sequelize.INTEGER,
//   subject: Sequelize.STRING
// });
//
// module.exports = Section;



var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var section = new Schema({
  name: String,
  grade: Number,
  subject: String
});

var Section = mongoose.model("Section", section);

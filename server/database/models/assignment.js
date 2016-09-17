var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assignment = new Schema({
  name: String,
  maxScore: Number
});

var Assignment = mongoose.model("Assignment", assignment);

module.exports = Assignment;



// var Sequelize = require('sequelize');
// var db = require('../database_config.js');
//
// var Assignment = db.define('Assignment', {
//   name: Sequelize.STRING,
//   maxScore: Sequelize.INTEGER
// });
//
// module.exports = Assignment;

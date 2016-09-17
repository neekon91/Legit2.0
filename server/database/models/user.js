var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
// var db = require('../database_config.js');

var user = new Schema({
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  first: String,
  last: String,
  schoolStartDate: {type: Date, default: Date.now},
  schoolEndDate: {type: Date, default: Date.now}
});

user.comparePassword = function (attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function (err, isMatch) {
    if (err) { throw err; }
    callback(null, isMatch);
  });
}

user.pre(function (user) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(user.password, null, null)
    .then(function (hash) {
      user.password = hash;
    });
});

var User = Mongoose.model('User', user);
module.exports = User;

// module.exports = mongoose.model('User', user);






// ==============================================================
// NPC CODE

// In this file we are comparing the attempted password with the stored hash password.
// It will salt+ hash, and then compare the two.

// Also have a pre save hook to cipher any password

// var Sequelize = require('sequelize');
// var Promise = require('bluebird');
// var bcrypt = require('bcrypt-nodejs');
// var db = require('../database_config.js');
//
// var User = db.define('User', {
//   email: Sequelize.STRING,
//   password: Sequelize.STRING,
//   first: Sequelize.STRING,
//   last: Sequelize.STRING,
//   schoolStartDate: {type: Sequelize.DATE, defaultValue: Date.now()},
//   schoolEndDate: {type: Sequelize.DATE, defaultValue: Date.now()}
// },
// {
//   instanceMethods: {
//     comparePassword: function (attemptedPassword, callback) {
//       bcrypt.compare(attemptedPassword, this.password, function (err, isMatch) {
//         if (err) { throw err; }
//         callback(null, isMatch);
//       });
//     }
//   }
// });
//
// User.beforeCreate(function (user) {
//   var cipher = Promise.promisify(bcrypt.hash);
//   return cipher(user.password, null, null)
//     .then(function (hash) {
//       user.password = hash;
//     });
// });
//
// module.exports = User;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const SALT_WORK_FACTOR = 10;

var student = new Schema({
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  first: String,
  last: String
});

// student.pre('save', function(next) {
//   var that = this;

//   if (!that.isModified('password')) return next();

//   bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//     if (err) return next(err);

//     bcrypt.hash(that.password, salt, function(err, hash) {
//       if (err) return next(err);

//       that.password = hash;
//       next();
//     });
//   });
// });

// student.methods.comparePassword = function(candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };

const Student = mongoose.model('Student', student);
module.exports = Student;

// module.exports = mongoose.model('User', user);



// =================================================================
// NPC code
// var Sequelize = require('sequelize');
// var db = require('../database_config.js');
//
// var Student = db.define('Student', {
//   first: Sequelize.STRING,
//   last: Sequelize.STRING
// });
//
// module.exports = Student;



// ============================================================
// new and improved



// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt-nodejs');
//
// const studentSchema = new Schema({
//   email: {
//     type: String,
//     unique: true,
//     lowercase: true
//   },
//   password: {
//     type: String
//   },
//   first: String,
//   last: String,
//   schoolStartDate: {type: Date, default: Date.now},
//   schoolEndDate: {type: Date, default: Date.now}
// });
//
// studentSchema.pre('save', function (next) {
//
//   const user = this;
//
//   bcrypt.genSalt(10, function (err, salt) {
//     if (err) {
//       return next(err);
//     }
//
//     bcrypt.hash(user.password, salt, null, function (err, hash) {
//       if (err) {
//         return next(err);
//       }
//
//
//       user.password = hash;
//       next();
//     });
//   });
// });
//
// studentSchema.methods.comparePassword = function(candidatePassword, callback) {
//   bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
//     if (err) {
//       return callback(err);
//     }
//
//     callback(null, isMatch);
//   });
// };
//
// const Student = mongoose.model('Student', studentSchema);
//
// module.exports = Student;

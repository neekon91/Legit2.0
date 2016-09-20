const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: {
    type: String
  },
  first: String,
  last: String,
  schoolStartDate: {type: Date, default: Date.now},
  schoolEndDate: {type: Date, default: Date.now},
  photoPath: String
});

userSchema.pre('save', function (next) {

  const user = this;

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }


      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

const User = mongoose.model('user', userSchema);

module.exports = User;




// ==============================================================
// NPC CODE



// var Mongoose = require('mongoose');
// var Schema = Mongoose.Schema;
// var Promise = require('bluebird');
// var bcrypt = require('bcrypt-nodejs');
// // var db = require('../database_config.js');
//
// var user = new Schema({
//   email: { type: String, required: true, index: { unique: true } },
//   password: { type: String, required: true },
//   first: String,
//   last: String,
//   schoolStartDate: {type: Date, default: Date.now},
//   schoolEndDate: {type: Date, default: Date.now}
// });
//
// var User = Mongoose.model('User', user);
// module.exports = User;

// user.comparePassword = function (attemptedPassword, callback) {
//   bcrypt.compare(attemptedPassword, this.password, function (err, isMatch) {
//     if (err) { throw err; }
//     callback(null, isMatch);
//   });
// }
//
// user.pre(function (user) {
//   var cipher = Promise.promisify(bcrypt.hash);
//   return cipher(user.password, null, null)
//     .then(function (hash) {
//       user.password = hash;
//     });
// });


// module.exports = mongoose.model('User', user);

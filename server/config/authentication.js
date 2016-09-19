var User = require('../database/models/user');
const jwt = require('jwt-simple');
// const User = require('../models/user');
const config = require('../../config.js');

function tokenForUser(user) {
  const timestamp = new Date().getTime();

  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function (req, res, next) {
  res.send({ token: tokenForUser(req.user), userid:req.user.id });
}

exports.signup = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email & password!' });
  }

  User.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    const user = new User({
      email: email,
      password: password,
      first: req.body.first,
      last: req.body.last,
      schoolStartDate: req.body.schoolStartDate,
      schoolEndDate: req.body.schoolEndDate
    });

    user.save(function (err) {
      if (err) {
        return next(err);
      }
      res.json({ token: tokenForUser(user), userid: user.id });
    });
  });
}











// ========================================================






















// var jwt = require('jwt-simple');
// var User = require('../database/models/user.js');
// var Promise = require("bluebird");
// if (process.env.NODE_ENV !== 'production') {
//
//   // config.js is ignored by Git
//   var config = require('../../config.js');
// }
// // Using Jason web Tokens to create tokens for user.
//
// var tokenForUser = function(user) {
//   var secret = process.env.secret || config.secret;
//   // each token we take email and add a string
//   const timestamp = new Date().getTime();
//   return jwt.encode({sub: user.email, iat: timestamp}, secret);
//   };
//
// // The signin route only sends back a token + user.id
// // The signup route will create a user and send back a token
// module.exports = {
//
//   authenticate: function (req, res) {
//   },
//
//   signin: function (req, res) {
//     res.send({token: tokenForUser(req.user), userid:req.user.id });
//   },
//
//    signup: function(req, res, next) {
//     var email = req.body.email;
//     var password = req.body.password;
//
//     User.save({
//       // where: {
//       email: email,
//       password: password,
//       first: req.body.first,
//       last: req.body.last,
//       schoolStartDate: req.body.schoolStartDate,
//       schoolEndDate: req.body.schoolEndDate
//
//       // }
//     }).then(function (user) {
//
//       //signin user?
//       // sending back jwt to user
//       res.json({token: tokenForUser(user), userid: user.id });
//       // redirect to home?
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }
// }
//

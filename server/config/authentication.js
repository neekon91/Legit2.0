var User = require('../database/models/user.js');
var Promise = require("bluebird");
var bcrypt = require("bcrypt-nodejs");


module.exports = {};

// var sess;


// Using Jason web Tokens to create tokens for user.


// The signin route only sends back a token + user.id
// The signup route will create a user and send back a token



module.exports.signin = function (req, res) {
  res.send({token: tokenForUser(req.user), userid:req.user.id });
}


module.exports.signup = function(req, res) {
 var email = req.body.email;
 var password = req.body.password;

 var userSign = new User ({

   email: email,
   password: password,
   first: req.body.first,
   last: req.body.last,
   schoolStartDate: req.body.schoolStartDate,
   schoolEndDate: req.body.schoolEndDate


 });

 userSign.save(function(err, newUser){
   if(err){
     res.send(500, err);
   }
   res.status(200).send();
 })

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

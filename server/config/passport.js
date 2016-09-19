const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt-nodejs');
const User = require('../database/models/user.js');
const config = require('../../config.js');
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {

  User.findOne({ email: email }, function (err, user) {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false);
    }

    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        return done(err);
      }

      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {

  User.findById(payload.sub, function (err, user) {
    if (err) {

      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);































// const bcrypt = require("bcrypt-nodejs");

// module.exports = {};
//
// var sess;
//
//
// module.exports.signIn = (req, res) => {
// // redirect to signup when user does not exist
//   User.signIn(req.body, (err,data) => {
//     if(data.length > 0) {
//       bcrypt.compare(req.body.password, data[0].password, (err, result) =>  {
//         if(result){
//           sess = req.session;
//           sess.email = data[0].email;
//           sess.user = data[0].id;
//           module.exports.sess = sess;
//           res.status(202).send();
//         }else{
//           res.status(401).send("That email and/or password was not found");
//         }
//       });
//     } else {
//       res.status(401).send("That email and/or password was not found");
//     }
//   });
// };
//
//
//
// module.exports.signUp = (req, res) =>{
//   User.checkUser(req.body, (err, data) => {
//     if(err) throw err;
//
//     if(data.length > 0){
//       res.status(409).send("The email address you specified is already in use.")
//     } else {
//       hashHelpers.hashPassword(req.body.password)
//       .then(hashed=>{
//         req.body.password = hashed;
//
//         userHelper.signUp(req.body, (err,data)=>{
//           if(err) console.log(err);
//           sess = req.session;
//           sess.email = req.body.email;
//           sess.user = data.user; //chnaged from "data.insertId"
//           module.exports.sess = sess;
//           res.status(200).send();
//         });
//       })
//     }
//   })
// }
//
//
// module.exports.getOneUser = (req, res)=>{
//   //verify user is currently signed in
//   if(sess !== undefined){
//     User.getOne(sess.user, (err,data)=>{
//       if(err) console.log(err);
//       res.json(data);
//     });
//   } else {
//     res.status(401).send("That email and/or password was not found");
//   }
// };
//
//
// module.exports.logout = (req, res)=>{
//   sess = undefined;
//   req.session.destroy();
//   res.status(200).send("request processed");
// };
//
//
//
//
// const passport = require('passport');
// const User = require('../database/models/user');
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
//
// const LocalStrategy = require('passport-local');
//
// const localOptions = {usernameField: 'email'};
//
//
// const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
//
//   User.findOne({ email: email }).then( function(user) {
//     console.log("line 14 passport");
//     if (!user) {
//       done(null, false);
//     }
//   user.comparePassword(password, function(err, isMatch) {
//     if (err) {return done(err); }
//     if (!isMatch) { return done(null, false); }
//
//     return done(null, user);
//   });
//   }).catch(function (err) {
//     return console.log(err);
//   });
// });
//
//
// // fix ME PLEASE
// var secret = "testtesttest";
// //setup Options for jwt strategy
// const jwtOptions = {
//   jwtFromRequest: ExtractJwt.fromHeader('authorization'),
//   secretOrKey: secret
// };
//
// // create jwt strategy - in this strategy, we accept a token, and see if is it real or fake.
// const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
//   // See if email in the payload exists in our database
//   User.findOne({ email: payload.sub }).then(function(user) {
//     if (user) {
//       done(null, user);
//     } else {
//       done(null, false);
//     }
//   }).catch(function (err) {
//     return console.log(err);
//   });
//
// });
//
//
// // tell passport to use the following strategies
// passport.use(jwtLogin);
// passport.use(localLogin);

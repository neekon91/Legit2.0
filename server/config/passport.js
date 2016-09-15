var passport = require('passport');
var User = require('../database/models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var LocalStrategy = require('passport-local');
// Passport : is the User logged in or not?
if (process.env.NODE_ENV !== 'production') {

  // config.js is ignored by Git
  var config = require('../../config.js');
}
// Passport JS - two middle strategies for Auth.
// Create Local Strategy - finds a user with same email and compare password

const localOptions = {usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {

  User.findOne({ where: {email: email} }).then(function(user) {
    if (!user) {
      done(null, false);
    }
  user.comparePassword(password, function(err, isMatch) {
    if (err) {return done(err); }
    if (!isMatch) { return done(null, false); }

    return done(null, user);
  });
  }).catch(function (err) {
    return console.log(err);
  });
});


var secret = process.env.secret || config.secret;
//setup Options for jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: secret
};

// create jwt strategy - in this strategy, we accept a token, and see if is it real or fake.
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if email in the payload exists in our database
  User.findOne({ where: {email: payload.sub} }).then(function(user) {
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  }).catch(function (err) {
    return console.log(err);
  });

});


// tell passport to use the following strategies
passport.use(jwtLogin);
passport.use(localLogin);

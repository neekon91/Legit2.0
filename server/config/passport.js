const passport = require('passport');
const User = require('../database/models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const LocalStrategy = require('passport-local');

const localOptions = {usernameField: 'email'};


const localLogin = new LocalStrategy(localOptions, function(email, password, done) {

  User.findOne({ email: email }).then( function(user) {
    console.log("line 14 passport");
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


// fix ME PLEASE
var secret = "testtesttest";
//setup Options for jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: secret
};

// create jwt strategy - in this strategy, we accept a token, and see if is it real or fake.
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if email in the payload exists in our database
  User.findOne({ email: payload.sub }).then(function(user) {
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

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var session = require('express-session');
var path = require('path');
var Auth = require('./config/authentication.js');
var passportService = require('./config/passport.js');
var passport = require('passport');



var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/tcp');

var db = mongoose.connection;
db.on('error', console.error.bind(console, "There's an error"));
db.once('open', function callback(){console.log('successfully logged into mongo');  });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.././client')));


var requireAuth = passport.authenticate('jwt', { session: false});
var requireSignin = passport.authenticate('local', {session: false});

app.post('/signin', requireSignin, Auth.signin);
app.post('/signup', Auth.signup);



app.all('/*', function(req, res) {
  res.sendFile('index.html', {
    root: path.resolve(__dirname, '.././client')
  });
});

app.listen(1337);
console.log("Server is doing big things on port 1337");


module.exports = app;



// var express = require('express');
// var db = require('./database/database_config.js');
//
// var app = express();
//
// require('./config/middleware.js')(app, express);
// require('./config/routes.js')(app, express);
//
// app.set('port', (process.env.PORT || 1337));
//
// db.sync().then(function () {
//   app.listen(app.get('port'), function() {
//     console.log('listening on port ', app.get('port'));
//   });
// }).catch(function (err) {
//   console.log(err);
// });
//
// module.exports = app;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// var session = require('express-session');
const path = require('path');
const Auth = require('./config/authentication.js');
const passportService = require('./config/passport.js');
const passport = require('passport');
const Controller = require('./database/controller.js');


const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/tcp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, "There's an error"));
db.once('open', function callback(){console.log('successfully logged into mongo');  });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.././client')));


var requireAuth = passport.authenticate('jwt', { session: false});
var requireSignin = passport.authenticate('local', {session: false});

app.post('/signin', requireSignin, Auth.signin);
app.post('/signup', Auth.signup);


//GET CONTENT FROM DATABASE

app.get('/api/report/users/:id', Controller.mainDashboard);
app.get('/api/report/classes/:id', Controller.classDashboard);
app.get('/api/report/students/:id', Controller.studentDashboard);

app.get('/api/outcome/:StudentId/:SectionId', Controller.outcomeInfo);

//Get Messages for Students and Teachers

app.get('/api/messages/teacher/:UserId/', Controller.getMessages)
app.get('/api/messages/student/:StudentId/', Controller.getMessages)


//ADD CONTENT TO DATABASE

app.post('/api/add/classes', Controller.addClass);

app.post('/api/add/assignments', Controller.addAssignment);

app.post('/api/add/students', Controller.addStudent);

app.post('/api/enrol', Controller.enrollStudent);



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

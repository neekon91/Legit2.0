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

app.get('/api/report/users/:id', Controller.mainDashboard); //WORKS
app.get('/api/report/classes/:id', Controller.classDashboard); //WORKS
app.get('/api/report/students/:id', Controller.studentDashboard); //Works

app.get('/api/outcome/:StudentId/:SectionId', Controller.outcomeInfo); //Need to work on this

//Get Messages for Students and Teachers


app.get('/api/messages/:id', Controller.getMessages) //Work me

//ADD CONTENT TO DATABASE

app.post('/api/add/classes', Controller.addClass); //Works


app.post('/api/add/assignments', Controller.addAssignment); //Works

app.post('/api/add/students', Controller.addStudent); //Works

app.post('/api/add/message', Controller.addMessage); //Should work??

app.put('/api/enrol', Controller.enrollStudent); //Works



// ========
// image upload

// const multiparty = require('multiparty');
// const fs = require('fs');

// function saveImage(req, res) {
//   const form = new multiparty.Form();

//   form.parse(req, (err, fields, files) => {

//     // var {path: tempPath, originalFilename} = files.imageFile[0];
//     var copyToPath = "./images/" + files.imageFile[0];

//     fs.readFile(files.imageFile[0], (err, data) => {
//       // make copy of image to new location
//       fs.writeFile(newPath, data, (err) => {
//         // delete temp image
//         fs.unlink(tmpPath, () => {
//           res.send("File uploaded to: " + newPath);
//         });
//       });
//     });
//   })
// }

// app.post('/upload', saveImage);

// app.use('/images',express.static(__dirname + '/images'));

//  upload end
// ========

app.all('/*', function(req, res) {
  res.sendFile('index.html', {
    root: path.resolve(__dirname, '.././client')
  });
});

app.listen(1337);
console.log("Server is doing big things on port 1337");


module.exports = app;

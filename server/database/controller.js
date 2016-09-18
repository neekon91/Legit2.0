// note to team NPC must be spelt out here

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Promise = require("bluebird");
// var bcrypt = require('bcrypt');
// var SALT_WORK_FACTOR = 10;

const Assignment = require('./models/assignment.js');
const Section = require('./models/section.js');
const Student = require('./models/student.js');
const User = require('./models/user.js');

var Student_O = new Schema({
  score: Number
});

var Student_Outcomes = mongoose.model("Student_Outcomes", Student_O);

var resData = {};

module.exports = {
  // enrol: function(req, res){
  //   Student.findOne({
  //     id: req.body.students
  //   }).then(function(err, student){
  //     if (student) {
  //       return student.addSections(req.body.classes);
  //     } else {
  //       console.log('no matching student record found');
  //       return res.sendStatus(404);
  //     }
  //   })
  //   res.sendStatus(201);
  // },

  dashBoard: function(req, res){
    User.findOne({_id: req.params.id}).then(function(user){
      resData.details = user;

      Section.findAll({teacher_id: user.id}).then(function(classes){
        resData.classes = classes;
        // array of objects with class tables
        var studentData = [];
        var studArray = [];
        classes.forEach(function(val){
          // which way do you want us to present the data to you? in and object or array?
          // studentObj[val.student_id] = [val.name, val.grade, val.Subject, val.teacher_id];
          // studentObj[val.student_id] = {val.name:val.name, val.grade:val.grade, val.Subject:val.Subject, val.teacher_id:val.teacher_id};
          studArray.push(val.student_id]);
        })

        studArray.forEach(function(stud){
          Student.findOne({_id: stud }).then(function(stu){
            studentData.push(stu);
          })

        })

        resData.students = studentData;
      })
      console.log(resData.classes);
      console.log(resData.students);
      res.json(resData);

    })
  },
  addClass: function(req, res){
    var newSection = new Section({
      name: req.body.name,
      grade: req.body.grade,
      subject: req.body.subject,
      teacher_id: req.body.UserId,
      student_id: req.body.student_id || []
    })
    newSection.save(function (err) {
      if (err) {
        return console.log(err);
      }

      res.json(newSection);
    });
  }



};

// Schema
// const section = new Schema({
//   name: String,
//   grade: Number,
//   subject: String,
//   teacher_id: Number,
//   student_id: Number
// });


// output
//
// input
//
// constr
//
// edge casses and examples of them
//

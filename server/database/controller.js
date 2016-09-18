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
const Roster = require('./models/roster.js');


var Student_O = new Schema({
  score: Number
});

var Student_Outcomes = mongoose.model("Student_Outcomes", Student_O);

var resData = {};

module.exports = {

  //Main Dashboard

  mainDashboard: function(req, res){

    var getUser = User.where({_id: req.params.id});

      getUser.findOne(function(err, user){
      resData.details = user;;
      var getSection = Section.where({teacher_id: user.id});
      getSection.find(function(err, classes){
        resData.classes = classes;
        // array of objects with class tables
        var studentData = [];
        var studArray = [];

        classes.forEach(function(val){
          studArray.push(val.student_id);
        });

        studArray.forEach(function(stud){
         var getStudents = Student.where({_id: stud });

          getStudents.find(function(stu){
            studentData.push(stu);
          })
        });

        resData.students = studentData;
      })
      console.log(resData.classes);
      console.log(resData.students);
      res.json(resData);

    })
  },


  //classDashboard

    classDashboard: function(req, res){
    var getSection = Section.where({_id: req.params.id});

      getSection.findOne(function(err, section){
        resData.details = section;

    var getAssignments = Assignment.where({sectionId: mongoose.Types.ObjectId(section._id)})
      getAssignments.find(function(err, assignments){

        resData.assignments = assignments;
      });

    var getRoster = Roster.where({class_id: section._id})
        resData.students = [];
          getRoster.find(function(err, data){
         console.log("ROSTERROSTERROSTER", data);
            data.forEach(function(roster){
             console.log("ROSTER222222222", roster);
              var currStudent = Student.where({_id: roster.student_id});
                currStudent.find(function(err,data){
                resData.students.push(data);
              });
            });

        });

      res.json(resData);

    })
  },



  //studentDashboard

    studentDashboard: function(req, res){

    var getStudent = Student.where({_id: req.params.id});
      getStudent.findOne(function(err, student){
      resData.details = student;
      var getSection = Section.where({teacher_id: user.id});
      getSection.find(function(err, classes){
        resData.classes = classes;
        // array of objects with class tables
        var studentData = [];
        var studArray = [];
        classes.forEach(function(val){
          studArray.push(val.student_id);
        })
        studArray.forEach(function(stud){
         var getStudents = Student.where({_id: stud });

          getStudents.find(function(stu){
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

  //outcomeInfo

    outcomeInfo: function(req, res){

    var getUser = User.where({_id: req.params.id});
      getUser.findOne(function(err, user){
      resData.details = user;
      var getSection = Section.where({teacher_id: user.id});
      getSection.find(function(err, classes){
        resData.classes = classes;
        // array of objects with class tables
        var studentData = [];
        var studArray = [];
        classes.forEach(function(val){
          studArray.push(val.student_id);
        })
        studArray.forEach(function(stud){
         var getStudents = Student.where({_id: stud });

          getStudents.find(function(stu){
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


//getMessages

//outcomeInfo

    getMessages: function(req, res){

    var getUser = User.where({_id: req.params.id});
      getUser.findOne(function(err, user){
      resData.details = user;
      var getSection = Section.where({teacher_id: user.id});
      getSection.find(function(err, classes){
        resData.classes = classes;
        // array of objects with class tables
        var studentData = [];
        var studArray = [];
        classes.forEach(function(val){
          studArray.push(val.student_id);
        })
        studArray.forEach(function(stud){
         var getStudents = Student.where({_id: stud });

          getStudents.find(function(stu){
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



  //Class Additions

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
  },

//Assignment Additions

  addAssignment: function(req, res){
    var newAssignment = new Section({
      name: req.body.name,
      maxScore: req.body.maxScore,
      sectionId: req.body.sectionId
    })
    newAssignment.save(function (err) {
      if (err) {
        return console.log(err);
      }
      res.json(newAssignment);
    });
  },



//Students Additions

  addStudent: function(req, res){
    var newStudent = new Student({
      first: req.body.first,
      last: req.body.last,
      email: req.body.email || Math.floor(Math.random()*1000),
      password: req.body.password || Math.floor(Math.random()*1000),
    })
    console.log("NEW STUDENT", newStudent);
    newStudent.save(function (err) {
      if (err) {
        return console.log(err);
      }

      res.json(newStudent);
    });
  },



  //Enroll Students

  enrollStudent: function(req, res){

    // CREATE
    var newRosterStudent = new Roster({
      studentId: req.body.students,
      classId: req.body.classes
    })
   console.log("NEW ROSTER STUDENT", newRosterStudent);
    newRosterStudent.save(function (err) {
      if (err) {
        return console.log(err);
      }

      res.json(newRosterStudent);
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




// dashBoard: function(req, res){
//   User.findOne({_id: req.params.id}).then(function(user){
//     resData.details = user;
//
//     Section.findAll({teacher_id: user.id}).then(function(classes){
//       resData.classes = classes;
//       // array of objects with class tables
//       var studentData = [];
//       var studArray = [];
//       classes.forEach(function(val){
//         // which way do you want us to present the data to you? in and object or array?
//         // studentObj[val.student_id] = [val.name, val.grade, val.Subject, val.teacher_id];
//         // studentObj[val.student_id] = {val.name:val.name, val.grade:val.grade, val.Subject:val.Subject, val.teacher_id:val.teacher_id};
//         studArray.push(val.student_id);
//       })
//
//       studArray.forEach(function(stud){
//         Student.findOne({_id: stud }).then(function(stu){
//           studentData.push(stu);
//         })
//
//       })
//
//       resData.students = studentData;
//     })
//     console.log(resData.classes);
//     console.log(resData.students);
//     res.json(resData);
//
//   })
// },

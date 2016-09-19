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
const Message = require('./models/message.js');
const Outcome = require('./models/outcome.js');


var Student_O = new Schema({
  score: Number
});

var Student_Outcomes = mongoose.model("Student_Outcomes", Student_O);

var resData = {};

module.exports = {

//*****************MAIN DASHBOARD*******************************//

  mainDashboard: function(req, res){

//Get teacher details

    var getUser = User.where({_id: req.params.id});

      getUser.findOne(function(err, user){

      resData.details = user;

  //Get teacher's classes

      var getSection = Section.where({teacher_id: user.id});

      getSection.find(function(err, classes){
        resData.classes = classes;
      });

      var getStudents = Roster.where({teacher_id: req.params.id});

//Get array of all teacher's students

     resData.students = [];
      getStudents.find(function(err,data){
        data.forEach(function(roster){
          var currStudent = Student.where({_id: roster.student_id});
            currStudent.findOne(function(err,studData){
              resData.students.push(studData);
            });
        });
      });
    });

    res.json(resData);
    resData = {};

  },


  //********************CLASS DASHBOARD****************************//

    classDashboard: function(req, res){

  //Get all section information
    var getSection = Section.where({_id: req.params.id});
      getSection.findOne(function(err, section){
        resData.details = section;

  //Get all assignments information

    var getAssignments = Assignment.where({sectionId: section._id})
      getAssignments.find(function(err, assignments){
        resData.assignments = assignments;
      });

//Get all students information
    var getRoster = Roster.where({class_id: section._id})
        resData.students = [];
        getRoster.find(function(err, data){
            data.forEach(function(roster){
              var currStudent = Student.where({_id: roster.student_id});
                currStudent.findOne(function(err,studData){
                  resData.students.push(studData);
                });
            });
        });

//End Get all students

    })

    res.json(resData);
    resData = {};

  },


  //********************STUDENT DASHBOARD****************************//

    studentDashboard: function(req, res){

    var getStudent = Student.where({_id: req.params.id});

    //Get all student details
      getStudent.findOne(function(err, student){
        console.log("GET ALL STUDENT IS CALLED ", student);
        resData.details = student;
    //Get all student classes & assignments from all classes
      var getClasses = Roster.where({student_id: req.params.id}); //Get all class id's associated with student in roster table
        resData.classes = []; //Array to store class objects
        resData.assignments = []; //Array to store assignment objects
        getClasses.find(function(err, data){
            data.forEach(function(roster){ //Looks at each row in the roster table with the student id
              var currClass = Section.where({_id: roster.class_id}); //Get associated class id in roster table
                currClass.findOne(function(err,classData){
                  resData.classes.push(classData); //this should get all Class Data for student
                });
              var getAssignments = Assignment.where({sectionId: roster.class_id}); //Assignemnt
              getAssignments.find(function(err, assgn){
                resData.assignments = resData.assignments.concat(assgn);
              });
            });
        });
    });
      console.log("FINAL RESULT RESULT DATA", resData);
      res.json(resData);
      resData = {};
  },

  //outcomeInfo

  outcomeInfo: function(req, res){ //NEED TO WORK ON THIS

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
      resData = {};


    })
  },


//getMessages


  getMessages: function(req, res){ //NEED TO WORK ON THIS


    var receive = Message.where({receive_id: req.params.id});

    var sent = Message.where({sent_id: req.params.id});

      receive.find(function(err, user){
        resData.receivers = user.message;

      })
      sent.find(function(err, user){
        resData.senders = user.message;

      })
      res.json(resData);
      resData = {};
  },
  // const message = new Schema({
  //   receive_id: String, //sender
  //   sent_id: String, //gets it
  //   message: String,
  //   date: {type: Date, default: Date.now}
  // });


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
    var newAssignment = new Assignment({
      name: req.body.name,
      maxScore: req.body.maxScore,
      sectionId: req.body.SectionId
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




//Message Additions

  addMessage: function(req, res){
    var newMessage = new Message({
      receive_id: req.body.receiver,
      sent_id: req.body.sender,
      message: req.body.message,
    })
    console.log("NEW MESSAGE", newMessage);
    newMessage.save(function (err) {
      if (err) {
        return console.log(err);
      }

      res.json(newMessage);
    });
  },


 //Enroll Students

  enrollStudent: function(req, res){
    console.log("REQUESTBODYFORENROLL", req.body);
    // CREATE
    var newRosterStudent = new Roster({
      student_id: req.body.students,
      teacher_id: req.body.teacher,
      class_id: req.body.classes
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

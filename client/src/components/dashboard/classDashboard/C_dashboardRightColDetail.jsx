// This component renders the summary info of whatever class was clicked on from the left column
import React, { Component } from 'react'
import { browserHistory } from 'react-router'
// const Modal = require('react-modal');
class DashboardRightColDetail extends Component {
  constructor (props) {
    super(props)
  }

  getAssignment(id) {
    localStorage.setItem('assignmentId', id);
    browserHistory.push('/assignment');
  }

  renderDetails (props) {
  // if student has been select render assignment and scores on right hand side.
    if (this.props.assignments.data.assignments.length) {
      return (
        <div className='studentDetails'>
             {this.props.assignments.data.assignments.map((assignment) => {
              return <h1 key={assignment._id} onClick={this.getAssignment.bind(this, assignment._id)}>{assignment.name}</h1>

             })}
        </div>
   ) } }

  render () {
    return (
      <div>
      {this.renderDetails() }
      </div>
    )
  }
};

export default DashboardRightColDetail









  //     renderDetails (props) {
  // // if student has been select render assignment and scores on right hand side.
  //   if (this.props.currentstudent.data.currentstudent.first) {
  //     return (
  //       <div className='studentDetails'>
  //          {console.log(this.props.currentstudent.data.currentstudent.first)}
  //         <h1> {this.props.currentstudent.data.currentstudent.first} {this.props.currentstudent.data.currentstudent.last} </h1>
  //            {this.props.currentstudent.data.scores.map(function (assignment) {
  //              return <div className='dashboardLeftColItem clearfix'><span>
  //              Assignment Name: {assignment.name}
  //                <br />
  //              Sudent Score: {assignment.Student_Outcomes.score}
  //                <br />
  //                 Max Score: {assignment.maxScore}
  //              </span> </div>
  //            })}
  //       </div>
  //  ) } }

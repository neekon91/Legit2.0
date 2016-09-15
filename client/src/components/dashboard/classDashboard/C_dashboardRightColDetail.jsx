// This component renders the summary info of whatever class was clicked on from the left column
import React from 'react'
// const Modal = require('react-modal');
class DashboardRightColDetail extends React.Component {
  constructor (props) {
    super(props)
  }
  renderDetails (props) {
  // if student has been select render assignment and scores on right hand side.
    if (this.props.currentstudent.data.currentstudent.first) {
      return (
        <div className='studentDetails'>
           {console.log(this.props.currentstudent.data.currentstudent.first)}
          <h1> {this.props.currentstudent.data.currentstudent.first} {this.props.currentstudent.data.currentstudent.last} </h1>
             {this.props.currentstudent.data.scores.map(function (assignment) {
               return <div className='dashboardLeftColItem clearfix'><span>
               Assignment Name: {assignment.name}
                 <br />
               Sudent Score: {assignment.Student_Outcomes.score}
                 <br />
                  Max Score: {assignment.maxScore}
               </span> </div>
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


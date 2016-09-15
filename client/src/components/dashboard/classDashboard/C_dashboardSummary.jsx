// Dashboard summary is the component above the two columns in the dashboard
import React from 'react'
// all props passed down from dashboardClass_component
class DashboardSummary extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div className='clearfix dashboardSummary'>
        <div className='dashboardSummaryProf'>
          <img src='http://yadayadacreative.com/projects/biology.jpg' alt='' />
          <h3>{this.props.data.details.name} </h3>
          <a href='/assignmentform' className='button'>Add Assignment</a>
        </div>
        <div className='dashboardSummaryStats clearfix'>
          <div>
            <p>84</p>
            <h5>Class Average</h5>
          </div>
          <div>
            <p> {this.props.data.students.length}</p>
            <h5>Number of Students</h5>
          </div>
          <div>
            <p>{this.props.data.assignments.length}</p>
            <h5>Number of Assignments</h5>
          </div>
        </div>
      </div>
    )
  }
}
export default DashboardSummary

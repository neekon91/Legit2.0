import React from 'react'
// Components
import Header from '../../headers/authorized_header.jsx'
import DashboardSummary from './C_dashboardSummary.jsx'
import DashboardLeftCol from './C_dashboardLeftCol.jsx'
import DashboardRightCol from './C_dashboardRightCol.jsx'
import axios from 'axios'

class DashboardClass extends React.Component {
  constructor (props) {
    super(props)
    // set initial state to expected data types based on API return and Databases schema
    this.state = {
      isAuthenticated: this.props.isAuthenticated,
      students: [],
      details: {},
      currentstudent: '',
      assignments: [],
      scores: []
    }
    // set context for methods
    this.componentDidMount = this.componentDidMount.bind(this)
    this.setCurrentStudent = this.setCurrentStudent.bind(this)
  }
  // set the state with data for a specific student, this funcion is called downstream in C_dashbaordRightColDetail
  setCurrentStudent (student, classid) {
    const that = this
    const url = `/api/outcome/${student.id}/${classid}`
    const studentScores = axios.get(url).then(function (response) {
      that.setState({
        currentstudent: student,
        scores: response.data.assignments
      })
    })
  }
 // on page render fetch all class info, query is based on classid store in the localStorage varible, set state using class data
  componentDidMount () {
    const classid = localStorage.getItem('classId')
    const url = `/api/report/classes/${classid}`
    this.serverRequest = $.get(url, function (classData) {
      this.setState({
        isAuthenticated: this.props.isAuthenticated,
        students: classData.students,
        details: classData.details,
        assignments: classData.assignments
      })
    }.bind(this))
  }

  componentWillUnmount () {
    this.serverRequest.abort()
  }
  render () {
    return (
      <div>
        <Header />
        <main>
          <div className='dashboardWrapper'>
            <DashboardSummary data={this.state} />
            <div className='dashboardCols'>
              <div>
                <h3>Students <a href='/studentForm'><i className='fa fa-plus' aria-hidden='true' /></a></h3>
                <DashboardLeftCol data={this.state} func={this.setCurrentStudent} />
              </div>
              <div>
                <DashboardRightCol data={this.state} />
              </div>
            </div>
          </div>
        </main>
      </div>
   )
  }
};

export default DashboardClass

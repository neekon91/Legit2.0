import React from 'react'
import { browserHistory } from 'react-router'
class DashboardLeftColItem extends React.Component {
  constructor (props) {
    super(props)
    this.updateCurrentUser = this.updateCurrentUser.bind(this)
  }
  updateCurrentUser (props) {
    const classid = localStorage.getItem('classId')
    this.props.func(this.props.data, classid)
  }

  getStudent(id) {
    localStorage.setItem('studentId', id);
    browserHistory.push('/student');
  }

  render () {
    return (
      <div className='dashboardLeftColItem clearfix' onClick={this.getStudent.bind(this, this.props.data._id)}>
      {console.log(this.props.data._id)}
        <div>
          <h6>Name</h6>
          <p> {this.props.data.first} + {this.props.data.last}</p>
        </div>
        <div>
          <i className='fa fa-angle-right fa-2x' aria-hidden='true' />
        </div>
      </div>
    )
  }
}

export default DashboardLeftColItem


// // Will be the indivisual class, student, or assignment
// import React from 'react'
// class DashboardLeftColItem extends React.Component {
//   constructor (props) {
//     super(props)
//     this.updateCurrentUser = this.updateCurrentUser.bind(this)
//   }
//   updateCurrentUser (props) {
//     const classid = localStorage.getItem('classId')
//     this.props.func(this.props.data, classid)
//   }
//   render () {
//     return (
//       <div className='dashboardLeftColItem clearfix' onClick={this.updateCurrentUser}>
//         <div>
//           <h6>Name</h6>
//           <p> {this.props.data.first} {this.props.data.last}</p>
//         </div>
//         <div>
//           <i className='fa fa-angle-right fa-2x' aria-hidden='true' />
//         </div>
//       </div>
//     )
//   }
// }

// export default DashboardLeftColItem

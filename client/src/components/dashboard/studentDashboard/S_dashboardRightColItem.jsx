//Did not get to linking up this dashboard
// This component renders the summary info of whatever class was clicked on from the left column
import React from 'react';
import { browserHistory } from 'react-router';

class DashboardRightColItem extends React.Component {
  constructor (props) {
    super(props);
  }

  getAssignment (id) {
    localStorage.setItem('assignmentId', id);
    browserHistory.push('/assignment');
  }

  render () {
    return (
      <a onClick={this.getAssignment.bind(this)}>
        <div className="dashboardRightColDetail">
          <div className="dashboardLeftColItem clearfix">
            <h6>Assignment: {this.props.assignment.assignmentName}</h6>
            <h6>Score :{Math.floor((this.props.assignment.grade)/(this.props.assignment.maxGrade) * 100)} %</h6>
          </div>

        </div>
      </a>
    );
  }
};

export default DashboardRightColItem;




// //Did not get to linking up this dashboard
// // This component renders the summary info of whatever class was clicked on from the left column
// import React from 'react';
// import { browserHistory } from 'react-router';

// class DashboardRightColDetail extends React.Component {
//   constructor (props) {
//     super(props);
//   }

//   getAssignment (id) {
//     localStorage.setItem('assignmentId', id);
//     browserHistory.push('/assignment');
//   }

//   render () {
//     return (
//       <a onClick={this.getAssignment.bind(this, this.props.key)}>
//         <div className="dashboardRightColDetail">
//           <div>
//             <h6>Assignment</h6>
//             <p>{this.props.assignment.name}</p>
//           </div>
//           <div>
//             <a href="/assignment" >Assignment Details</a>
//           </div>
//         </div>
//       </a>
//     );
//   }
// };

// export default DashboardRightColDetail;

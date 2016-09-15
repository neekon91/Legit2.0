//Did not get to linking up this dashboard 
// This component renders the summary info of whatever class was clicked on from the left column
import React from 'react';
import { browserHistory } from 'react-router';

class DashboardRightColDetail extends React.Component {
  constructor (props) {
    super(props);
  }

  getAssignment (id) {
    localStorage.setItem('assignmentId', id);
    browserHistory.push('/assignment');
  }

  render () {
    return (
      <a onClick={this.getAssignment.bind(this, this.props.key)}>
        <div className="dashboardRightColDetail">
          <div>
            <h6>Assignment</h6>
            <p>{this.props.assignment.name}</p>
          </div>
          <div>
            <a href="/assignment" >Assignment Details</a>
          </div>
        </div>
      </a>
    );
  }
};

export default DashboardRightColDetail;
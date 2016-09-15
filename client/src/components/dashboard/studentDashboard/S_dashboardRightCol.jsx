//Did not get to linking up this dashboard 
// Right column is going to hold the preview of class, student, or assignment that was clicked on from left column
import React from 'react';
import DashboardRightColDetail from './S_dashboardRightColItem.jsx';


const DashboardRightCol = ({assignments}) => {
    return (
        <div className="dashboardRightCol">
            {assignments.map((assignment) =>
              <DashboardRightColItem
                key={assignment.id}
                assignment={assignment}
              />
            )}
        </div>
    );
};

export default DashboardRightCol;
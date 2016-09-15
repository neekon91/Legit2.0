//Did not get to linking up this dashboard 
// Right column is going to hold the preview of class, student, or assignment that was clicked on from left column
import React from 'react';
import DashboardRightColDetail from './A_dashboardRightColDetail.jsx';


const DashboardRightCol = () => {
    return (
        <div className="dashboardRightCol">
            <DashboardRightColDetail />
        </div>
    );
};

export default DashboardRightCol;
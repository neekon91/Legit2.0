//Did not get to linking up this dashboard 
// Left column is going to hold the list of classes, students, or assignments
import React from 'react';

// Components
import DashboardLeftColItem from './A_dashboardLeftColItem.jsx';

const DashboardLeftCol = () => {
    return (
        <div className="dashboardLeftCol">
            <ul>
                <DashboardLeftColItem />
                <DashboardLeftColItem />
                <DashboardLeftColItem />
            </ul>
        </div>
        
    );
};

export default DashboardLeftCol;
//Did not get to linking up this dashboard 

//React
import React from 'react';

// Components
import Header from '../../headers/authorized_header.jsx';
import DashboardSummary from './A_dashboardSummary.jsx';
import DashboardLeftCol from './A_dashboardLeftCol.jsx';
import DashboardRightCol from './A_dashboardRightCol.jsx';

const DashboardAssignment = () => {
    return (
        <div>
            <Header />
            <main>
                <div className="dashboardWrapper">
                    <DashboardSummary />
                    <div className="dashboardCols">
                        <div>
                            Notes
                        </div>
                    </div>
                </div>
            </main>
        </div>
        
    );
};

export default DashboardAssignment;
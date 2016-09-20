// Dashboard summary is the component above the two columns in the dashboard
//React
import React from 'react';


const DashboardSummary = ({ first, last, numberClasses, numberStudents, daysLeft }) => {

    return (
        <div className="clearfix dashboardSummary">
            <div className="dashboardSummaryProf">
                <img src="http://www.globaldetroit.com/wp-content/uploads/2014/10/Gracie-Headshot-square.png" alt=""/>
                <h3>{first} {last}</h3>
            </div>
            <div className="dashboardSummaryStats clearfix">
                <div>
                    <p>1</p>
                    <h5>Inbox</h5>
                </div>
                <div>
                    <p>2</p>
                    <h5>Outbox</h5>
                </div>
                <div>
                    <p>3</p>
                    <h5>Trash</h5>
                </div>
            </div>
        </div>
    );
};

export default DashboardSummary;

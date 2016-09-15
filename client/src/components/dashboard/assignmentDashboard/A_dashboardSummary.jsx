//Did not get to linking up this dashboard 
// Dashboard summary is the component above the two columns in the dashboard
import React from 'react';

const DashboardSummary = () => {
    return (
        <div className="clearfix dashboardSummary">
            <div className="dashboardSummaryProf">
                <img src="http://yadayadacreative.com/projects/biology.jpg" alt=""/>
                <h3>Quiz 01</h3>
                <a className="button">Edit Assignment</a>
            </div>
            <div className="dashboardSummaryStats clearfix">
                <div>
                    <p>84</p>
                    <h5>Class Average</h5>
                </div>
                <div>
                    <p>24</p>
                    <h5>Average Something</h5>
                </div>
                <div>
                    <p>134</p>
                    <h5># of School Something</h5>
                </div>
            </div>
        </div>
    );
};

export default DashboardSummary;

//Did not get to linking up this dashboard
// Dashboard summary is the component above the two columns in the dashboard
import React, { Component } from 'react';


class DashboardSummary extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log('whatwaht', this.props.outcome)
    return (
        <div className="clearfix dashboardSummary">
            <div className="dashboardSummaryProf">
                <img src="http://yadayadacreative.com/projects/biology.jpg" alt=""/>
                <h3>{this.props.outcome.name}</h3>
                <a className="button">Edit Assignment</a>
            </div>
            <div className="dashboardSummaryStats clearfix">
                <div>
                    <p>84</p>
                    <h5>Class Average</h5>
                </div>
                <div>
                    <p>{this.props.outcome.maxScore}</p>
                    <h5>Total Score</h5>
                </div>
                <div>
                    <p>8</p>
                    <h5>Grade Level</h5>
                </div>
            </div>
        </div>
    );

    }
}
// const DashboardSummary = (props) => {
    // return (
    //     <div className="clearfix dashboardSummary">
    //         <div className="dashboardSummaryProf">
    //             <img src="http://yadayadacreative.com/projects/biology.jpg" alt=""/>
    //             <h3>{props.outcome.details.name}</h3>
    //             <a className="button">Edit Assignment</a>
    //         </div>
    //         <div className="dashboardSummaryStats clearfix">
    //             <div>
    //                 <p>84</p>
    //                 <h5>Class Average</h5>
    //             </div>
    //             <div>
    //                 <p>24</p>
    //                 <h5>Average Something</h5>
    //             </div>
    //             <div>
    //                 <p>134</p>
    //                 <h5># of School Something</h5>
    //             </div>
    //         </div>
    //     </div>
    // );
// };

export default DashboardSummary;

// import React, { Component } from 'react';


// class DashboardSummary extends Component {
//     constructor(props) {
//         super(props)
//     }

//     render() {

//         return (
//         <div className="clearfix dashboardSummary">
//             <div className="dashboardSummaryProf">
//                 <img src="http://yadayadacreative.com/projects/biology.jpg" alt=""/>
//                 <h3>{this.props.outcome.name}</h3>
//                 <a className="button">Edit Assignment</a>
//             </div>
//             <div className="dashboardSummaryStats clearfix">
//                 <div>
//                     <p>84</p>
//                     <h5>Class Average</h5>
//                 </div>
//                 <div>
//                     <p>{this.props.outcome.createdAt.slice(5,10)}</p>
//                     <h5>Date Posted</h5>
//                 </div>
//                 <div>
//                     <p>{this.props.outcome.maxScore}</p>
//                     <h5>Total Score</h5>
//                 </div>
//             </div>
//         </div>
//     );

//     }
//}







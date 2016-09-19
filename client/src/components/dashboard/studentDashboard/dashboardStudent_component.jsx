import React, { Component, PropTypes, ContextTypes } from 'react';
import { browserHistory } from 'react-router'

// Redux
import { connect } from 'react-redux';
import axios from 'axios'
// Components
import Header from '../../headers/authorized_header.jsx';
import DashboardSummary from './S_dashboardSummary.jsx';
import DashboardLeftCol from './S_dashboardLeftCol.jsx';
import DashboardRightCol from './S_dashboardRightCol.jsx';


class Dashboard extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isAuthenticated: this.props.isAuthenticated,
            classes: [],
            assignments: [],
            first: '',
            last: '',
            id: null
        }
    }

     componentDidMount() {
        let that = this;

        var outcome = [ {
         _id: 6,
         studentID: 214,
         assignmentID: 4,
         assignmentName: 'Container',
         grade: 10,
         maxGrade: 100,
        }, {
         _id: 4,
         studentID: 214,
         assignmentID: 3,
         assignmentName: 'Reducer',
         grade: 5,
         maxGrade: 100,
        }, {
         _id:2 ,
         studentID: 214,
         assignmentID: 2,
         assignmentName: 'Component',
         grade: 7,
         maxGrade: 20,
        },{
         _id: 1,
         studentID: 214,
         assignmentID: 1,
         assignmentName: 'Redux',
         grade: 8,
         maxGrade: 50,
        } ];
        // console.log(this)
        // console.log(localStorage.getItem('studentId'))
        var id = localStorage.getItem('studentId');

        this.serverRequest = $.ajax({
            method: "GET",
            url: `/api/report/students/${id}`,
            contentType: 'application/json',
            data: {},
            success: function(data){
                if(!data.assignments) {
                    this.serverRequest = $.ajax({
            method: "GET",
            url: `/api/report/students/${id}`,
            contentType: 'application/json',
            data: {},
            success: function(data){
                console.log("fetchedData :", data);
                that.setState({
                    classes: data.classes,
                    assignments: outcome,
                    first: data.details.first,
                    last: data.details.last,
                    id: data.details._id
                })
            }
        })
                }
                console.log("fetchedData :", data);
                that.setState({
                    classes: data.classes,
                    assignments: outcome,
                    first: data.details.first,
                    last: data.details.last,
                    id: data.details._id
                })
            }
        })

    }

    componentWillUnmount () {
        this.serverRequest.abort();
    }

    render() {

                return (
                    <div>
                        <Header />
                        <main>
                            <div className="dashboardWrapper">
                                <DashboardSummary id={this.state.id} first={this.state.first} last={this.state.last} />
                                <div className="dashboardCols clearfix">
                                    <div>
                                        <DashboardLeftCol classes={this.state.classes} />
                                    </div>
                                    <div>
                                        <h3>Class Info</h3>
                                        <DashboardRightCol assignments={this.state.assignments} />
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>

                );


    }
};


function mapStateToProps(state) {
    console.log("STATE", state);
    return {
        isAuthenticated: state.auth.isAuthenticated,
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(Dashboard);







// //Did not get to linking up this dashboard
// //React
// import React, { Component, PropTypes, ContextTypes } from 'react';
// import { browserHistory } from 'react-router'

// // Redux
// import { connect } from 'react-redux';

// // Components
// import Header from '../../headers/authorized_header.jsx';
// import DashboardSummary from './S_dashboardSummary.jsx';
// import DashboardLeftCol from './S_dashboardLeftCol.jsx';
// import DashboardRightCol from './S_dashboardRightCol.jsx';


// class Dashboard extends React.Component {
//     constructor(props){
//         super(props);

//         this.state = {
//             isAuthenticated: this.props.isAuthenticated,
//             classes: [],
//             assignments: [],
//             first: '',
//             last: ''
//         }
//     }

//      componentDidMount() {
//         let that = this;
//         // console.log(this)
//         // console.log(localStorage.getItem('studentId'))
//         var id = localStorage.getItem('studentId');
//         this.serverRequest = $.ajax({
//             method: "GET",
//             url: `/api/report/students/${id}`,
//             contentType: 'application/json',
//             data: {},
//             success: function(data){
//                 console.log('dataFetched', data);
//                 that.setState({
//                     classes: data.classes,
//                     assignments: data.assignments,
//                     first: data.details.first,
//                     last: data.details.last
//                 })
//             }
//         })
//     }

//     componentWillUnmount () {
//         this.serverRequest.abort();
//     }

//     render() {
//         console.log("STATE", this.state);
//                 return (
//                     <div>
//                         <Header />
//                         <main>
//                             <div className="dashboardWrapper">
//                                 <DashboardSummary first={this.state.first} last={this.state.last} />
//                                 <div className="dashboardCols clearfix">
//                                     <div>
//                                         <DashboardLeftCol classes={this.state.classes} />
//                                     </div>
//                                     <div>
//                                         <h3>Students</h3>
//                                         <DashboardRightCol assignments={this.state.assignments} />
//                                     </div>
//                                 </div>
//                             </div>
//                         </main>
//                     </div>

//                 );


//     }
// };


// function mapStateToProps(state) {
//     return {
//         isAuthenticated: state.auth.isAuthenticated,
//         token: state.auth.token
//     }
// }

// export default connect(mapStateToProps)(Dashboard);

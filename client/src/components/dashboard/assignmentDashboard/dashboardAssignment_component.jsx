//Did not get to linking up this dashboard

//React
import React, { Component, PropTypes, ContextTypes } from 'react';
import { browserHistory } from 'react-router'
// Components
import { connect } from 'react-redux';
import axios from 'axios'

import Header from '../../headers/authorized_header.jsx';
import DashboardSummary from './A_dashboardSummary.jsx';
import DashboardLeftCol from './A_dashboardLeftCol.jsx';
import DashboardRightCol from './A_dashboardRightCol.jsx';

class DashboardAssignment extends Component {
    constructor(props){
        super(props);

        this.state={
            isAuthenticated: this.props.isAuthenticated,
            // classes: [],
            // assignments: [],
            // first: '',
            // last: '',
            // id: null
            outcome: {},
            test: {}
        }
    }

    componentDidMount() {
        let that = this;

        var id = localStorage.getItem('assignmentId');
        console.log(id)
        this.serverRequest = $.ajax({
            method: "GET",
            url: `/api/report/assignments/${id}`,
            contentType: 'application/json',
            data: {},
            success: function(data){

                console.log("for Assignment: ", data);
                that.setState({
                    outcome: data.assignments[0],
                    test: data
                })
            }
        })
    }

    // componentWillUnmount () {
    //     this.serverRequest.abort();
    // }

    render() {
       return (
        <div>
            <Header />
            <main>
                <div className="dashboardWrapper">
                    <DashboardSummary outcome={this.state.outcome}/>
                    <div className="dashboardCols">
                        <div>
                        <DashboardLeftCol data={this.state.test}/>
                        </div>
                    </div>
                </div>
            </main>
        </div>

    );
    }
}
// const DashboardAssignment = () => {
//     return (
//         <div>
//             <Header />
//             <main>
//                 <div className="dashboardWrapper">
//                     <DashboardSummary />
//                     <div className="dashboardCols">
//                         <div>
//                             Notes
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </div>

//     );
// };

function mapStateToProps(state) {
    // console.log("STATE", state);
    return {
        isAuthenticated: state.auth.isAuthenticated,
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(DashboardAssignment);
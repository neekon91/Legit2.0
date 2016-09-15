// Dashboard summary is the component above the two columns in the dashboard
import React, { Component, PropTypes } from 'react';

// Redux
import { connect } from 'react-redux';

// Components
import Dashboard from './dashboard/mainDashboard/dashboardCentral_component.jsx';
import DashboardClass from './dashboard/classDashboard/dashboardClass_component.jsx';
import DashboardStudent from './dashboard/studentDashboard/dashboardStudent_component.jsx';
import DashboardAssignment from './dashboard/assignmentDashboard/dashboardAssignment_component.jsx';
import Header from './headers/authorized_header.jsx';
import UnauthHeader from './headers/unauthorized_header.jsx';
import Welcome from './auth/welcome/welcome_component.jsx';
import Forms from './forms/form_component.jsx';

export default class App extends React.Component {
    
    render(){
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
    
};

// See not in routes.js to understand this.props.children
// Using that because the way we are nesting our routes
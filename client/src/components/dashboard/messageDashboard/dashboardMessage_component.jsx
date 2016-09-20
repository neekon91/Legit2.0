//React
import React, { Component, PropTypes, ContextTypes } from 'react';

// Components
import Header from '../../headers/authorized_header.jsx';
import DashboardSummary from './M_dashboardSummary.jsx';
import DashboardLeftCol from './M_dashboardLeftCol.jsx';
import DashboardRightCol from './M_dashboardRightCol.jsx';
import axios from 'axios'

class DashboardMessage extends Component {
    constructor(props){
        super(props);

        this.state = {
            // getting access to isAuthenticated through the
            // mapStateToProps method at the bottom of doc
            isAuthenticated: this.props.isAuthenticated,
            classes: [],
            students: [],
            first: '',
            last: ' ',
            sentMessages:'',
            receivedMessages:''
        }
    }

     componentWillMount() {
        let that = this;
         // userid being saved in storage upon successfull signup or login
        var id = localStorage.getItem('userid');
         // api request using userid saved in localStorage
         // will get back the user's info, their classes, and their students
        this.serverRequest = $.ajax({
            method: "GET",
            url: `/api/report/users/${id}`,
            contentType: 'application/json',
            data: {},
            success: function(data){
                // update the state
                that.setState({
                    classes: data.classes,
                    students: data.students,
                    first: data.details.first || 'Welcome!',
                    last: data.details.last
                })
            }
        });


        axios.get(`/api/messages/${id}`).then(function(newData){
              console.log("DATADATADATA ", newData);
                // update the state
                that.setState({
                   sentMessages: newData.senders,
                   receivedMessages: newData.receivers
                })
            });
    }

    componentWillUnmount () {
        //kill all server requests if there are
        //any still going once component is being unmounted
        this.serverRequest.abort();
        this.messageRequest.abort();
    }
  render () {
    return (
      <div>
        <Header />
        <main>
          <div className='dashboardWrapper'>
          <DashboardSummary
              first={this.state.first}
              last={this.state.last}
              numberClasses={this.state.numberClasses}
              numberStudents={this.state.numberStudents}
              daysLeft={this.state.daysLeft}
          />
          <br />
          <a href='/messageform' className='button'>Send Message</a>
          {console.log(this.state)}
          </div>
        </main>
      </div>
   )
  }
};

export default DashboardMessage

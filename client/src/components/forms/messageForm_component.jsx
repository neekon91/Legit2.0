//Form to add Message
//React
import React from 'react';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addMessage } from '../../actions/addMessage.js';


class MessageForm extends React.Component {
    constructor(props) {
        super(props);

        //Passing through userId when calling addMessage so that
        //Message can be associated to that user right after it is created

        let userid = localStorage.getItem('userid')
        this.state = {
            sender: userid,
            receiver: userid,
            message: '',
            students: '',
            first: '',
            last:''

        };
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
                    students: data.students,
                    first: data.details.first || 'Welcome!',
                    last: data.details.last
                })
            }
        })
    }

    componentWillUnmount () {
        //kill all server requests if there are
        //any still going once component is being unmounted
        this.serverRequest.abort();
    }





    onReceiverChange(event){
        this.setState({ receiver: event.target.value })
    }

    onMessageChange(event){
        this.setState({ message: event.target.value })
    }

    onFormSubmit(event){
        //Need to preventDefault, because without it, once the user hits
        //enter or submit it would send an http request. This being a single
        //page app, that's not needed and handled in the front-end
        event.preventDefault();
        // Call our action, addStudent, which will send a POST request to the api
        // see actions/addStudent.js
        this.props.addMessage(this.state);
        //Reset our form fields to empty
        this.setState({
            receiver: '',
            message: '',
        })
    }

    render(){
      let students = localStorage.getItem('emailStudents');
        return (
            <div className="formWrapper">
                <h3>Send Message</h3>
                <form  onSubmit={this.onFormSubmit.bind(this)}>
                    <label htmlFor="student">Send To:</label>
                    <select value={this.onReceiverChange.bind(this)}>
                      <option value={this.state.sender}>
                      {this.state.first + ''} {this.state.last}
                      </option>
                    </select>
                    <label htmlFor="message">Message</label>
                    <textarea
                        name="message"
                        placeholder="Message"
                        value={this.state.message}
                        onChange={this.onMessageChange.bind(this)}
                    ></textarea>

                    <button>Send Message</button>
                </form>
            </div>
        );
    }
};

// gives us access to this.props.addUser within component
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addMessage }, dispatch);
}

export default connect(null, mapDispatchToProps)(MessageForm);

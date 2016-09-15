//Form to add student
//React
import React from 'react';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addStudent } from '../../actions/addStudent.js';


class StudentForm extends React.Component {
    constructor(props) {
        super(props);

        //Passing through classId when calling addStudent so that
        //student can be associated to that class right after it is created
        let classId = localStorage.getItem('classId')

        this.state = {
            first: '',
            last: '',
            classId: classId
        };
    }

    onFirstNameChange(event){
        //As user types in name input, update the state
        //Once state updates the input value is updated to match the state
        this.setState({ first: event.target.value })
    }

    onLastNameChange(event){
        //As user types in last name input, update the state
        //Once state updates the input value is updated to match the state
        this.setState({ last: event.target.value })
    }

    onFormSubmit(event){
        //Need to preventDefault, because without it, once the user hits
        //enter or submit it would send an http request. This being a single
        //page app, that's not needed and handled in the front-end
        event.preventDefault();
        // Call our action, addStudent, which will send a POST request to the api
        // see actions/addStudent.js
        this.props.addStudent(this.state);
        //Reset our form fields to empty
        this.setState({
            first: '',
            last: '',
        })
    }

    render(){
        return (
            <div className="formWrapper">
                <h3>Student</h3>
                <form  onSubmit={this.onFormSubmit.bind(this)}>
                    <label htmlFor="first">First Name</label>
                    <input 
                        name="first" 
                        type="text" 
                        placeholder="First Name..."
                        value={this.state.first}
                        onChange={this.onFirstNameChange.bind(this)}
                    />
                    <label htmlFor="last">Last Name</label>
                    <input 
                        name="last" 
                        type="text" 
                        placeholder="Last Name..."
                        value={this.state.last}
                        onChange={this.onLastNameChange.bind(this)}
                    />
                    
                    <button>Save Student</button>
                </form>
            </div>
        );
    }
};

// gives us access to this.props.addUser within component
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addStudent }, dispatch);
}

export default connect(null, mapDispatchToProps)(StudentForm);
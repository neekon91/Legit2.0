//Form to add a class
//React
import React from 'react';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addClass } from '../../actions/addClass.js';

class ClassForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            grade: '',
            subject: '',
            UserId: localStorage.getItem('userid')
        };
    }

    onNameChange(event){
        //As user types in name input, update the state
        //Once state updates the input value is updated to match the state
        this.setState({ name: event.target.value })
    }

    onGradeChange(event){
        //As user types in grade input, update the state
        //Once state updates the input value is updated to match the state
        this.setState({ grade: event.target.value })
    }

    onSubjectChange(event){
        //As user types in subject name input, update the state
        //Once state updates the input value is updated to match the state
        this.setState({ subject: event.target.value })
    }

    onFormSubmit(event){
        //Need to preventDefault, because without it, once the user hits
        //enter or submit it would send an http request. This being a single
        //page app, that's not needed and handled in the front-end
        event.preventDefault();
        // Call our action, addClass, which will send a POST request to the api
        // see actions/addClass.js
        this.props.addClass(this.state);
        //Reset our form fields to empty
        this.setState({
            name: '',
            grade: '',
            subject: ''
        })
    }

    render(){
        return (
            <div className="formWrapper">
                <h3>Class</h3>
                <form  onSubmit={this.onFormSubmit.bind(this)}>
                    <label htmlFor="">Class Name</label>
                    <input 
                        name="class" 
                        type="text" 
                        placeholder="Class Name..."
                        value={this.state.name}
                        onChange={this.onNameChange.bind(this)}
                    />

                    <label htmlFor="grade">Grade</label>
                    <input 
                        name="grade" 
                        type="text" 
                        placeholder="0-12..."
                        value={this.state.grade}
                        onChange={this.onGradeChange.bind(this)}
                    />

                    <label htmlFor="subject">Subject</label>
                    <input 
                        name="subject" 
                        type="text" 
                        placeholder="Subject..."
                        value={this.state.subject}
                        onChange={this.onSubjectChange.bind(this)}
                    />
                    <button type="submit" >Save Class</button>
                </form>
            </div>
            
        );
    }
};


// gives us access to this.props.addUser within component
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addClass }, dispatch);
}

export default connect(null, mapDispatchToProps)(ClassForm);
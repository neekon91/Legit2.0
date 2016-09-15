//React
import React from 'react';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addAssignment } from '../../actions/addAssignment.js';

class AssignmentForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            maxScore: '',
            sectionId: ''
        }
    }

    onNameChange(event){
     const classid = localStorage.getItem('classId')
      this.setState({ name: event.target.value, sectionId: classid })
    }

    onMaxScoreChange(event){
        this.setState({ maxScore: event.target.value });
    }

    onFormSubmit(event){
        event.preventDefault();
        // need to send request to API
        console.log(this.state);
        this.props.addAssignment(this.state);
        this.setState({
            name: '',
            maxScore: ''
        })
    }

    render(){
        return (
            <div className="formWrapper">
                <h3>Assignment</h3>
                <form  onSubmit={this.onFormSubmit.bind(this)}>
                    <label htmlFor="">Assignment Name</label>
                    <input
                        name="Assignment"
                        type="text"
                        placeholder="Assignment Name..."
                        value={this.state.name}
                        onChange={this.onNameChange.bind(this)}
                    />

                    <label htmlFor="grade">max Score</label>
                    <input
                        name="maxScore"
                        type="text"
                        placeholder="0-12..."
                        value={this.state.maxScore}
                        onChange={this.onMaxScoreChange.bind(this)}
                    />


                    <button type="submit" >Save Assignment</button>
                </form>
            </div>

        );
    }
};



function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addAssignment }, dispatch);
}

export default connect(null, mapDispatchToProps)(AssignmentForm);
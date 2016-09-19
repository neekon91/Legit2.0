// made form a controlled field --> value of input set by state, not other way around

//React
import React from 'react';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Action
import { signupUser, uploadImage } from '../../../actions/index.js';


class SignUpForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            first: '',
            last: '',
            schoolStart: '',
            schoolEnd: '',
            file: '',
            imagePreviewUrl: ''
        };
        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }
    _handleSubmit(event) {
        event.preventDefault();
        this.props.uploadImage(this.state.file, function(url){
            this.setState({
                file: url
            })
        });
    }
    onFirstNameChange(event){
        //As user types in first name input, update the state
        //Once state updates the input value is updated to match the state
        this.setState({ first: event.target.value })
    }

    onLastNameChange(event){
        //As user types in last name input, update the state
        //Once state updates the input value is updated to match the state
        this.setState({ last: event.target.value })
    }

    onSchoolStartChange(event){
        //As user types in school start input, update the state
        //Once state updates the input value is updated to match the state
        this.setState({ schoolStart: event.target.value })
    }

    onSchoolEndChange(event){
        //As user types in school end input, update the state
        //Once state updates the input value is updated to match the state
        this.setState({ schoolEnd: event.target.value })
    }

    onEmailChange(event){
        //As user types in email input, update the state
        //Once state updates the input value is updated to match the state
        this.setState({ email: event.target.value })
    }

    onPasswordChange(event){
        //As user types in password input, update the state
        //Once state updates the input value is updated to match the state
        this.setState({ password: event.target.value })
    }

    onFormSubmit(event){
        //Need to preventDefault, because without it, once the user hits
        //enter or submit it would send an http request. This being a single
        //page app, that's not needed and handled in the front-end
        event.preventDefault();
        // Call our action, signupUser, which will send a POST request to the api
        // see actions/index.js
        this.props.signupUser(this.state);
        this.setState({
            email: '',
            password: ''
        })
    }

    _handleImageChange(event) {
        event.preventDefault();

        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        }

        return (
            <form onSubmit={this.onFormSubmit.bind(this)}>
                <label >First Name</label>
                <input
                    type="text"
                    placeholder="First Name..."
                    value={this.state.first}
                    onChange={this.onFirstNameChange.bind(this)}
                />
                <label >Last Name</label>
                <input
                    type="text"
                    placeholder="Last Name..."
                    value={this.state.last}
                    onChange={this.onLastNameChange.bind(this)}
                />
                <label >School Start Date</label>
                <input
                    type="date"
                    placeholder="School start date..."
                    value={this.state.schoolStart}
                    onChange={this.onSchoolStartChange.bind(this)}
                />
                <label >School End Date</label>
                <input
                    type="date"
                    placeholder="School end date..."
                    value={this.state.shoolEnd}
                    onChange={this.onSchoolEndChange.bind(this)}
                />
                <label >Email</label>
                <input
                    type="text"
                    placeholder="Username..."
                    value={this.state.email}
                    onChange={this.onEmailChange.bind(this)}
                />
                <label >Password</label>
                <input
                    type="password"
                    placeholder="Password..."
                    value={this.state.password}
                    onChange={this.onPasswordChange.bind(this)}
                />
                <input
                  type="file" onChange={this._handleImageChange}
                />
                <button type="submit" onClick={this._handleSubmit}>Upload Image</button>
                <div>
                  {$imagePreview}
                </div>
                <button type="submit">
                    Sign Up
                </button>
            </form>
        );
    }

};

//Gives us access to our action, signupUser, as this.props.signupUser within container
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ signupUser, uploadImage }, dispatch);
}

export default connect(null, mapDispatchToProps)(SignUpForm);

// Header shown when user is authorized and logged in
// Actual auth being done in dashboard component
//React
import React from 'react';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Action
import { logoutUser } from '../../actions/index.js';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <header>
                <div className="wrapper clearfix">
                    <h1>
                        <a href="/home">
                            <img src="http://yadayadacreative.com/projects/legitLogo.png" alt=""/>
                        </a>
                    </h1>
                    <nav className="clearfix">
                        <ul>
                            <li>
                                <a href='/home'>
                                    <i className="fa fa-tachometer" aria-hidden="true"></i>
                                    Dashboard
                                </a>
                            </li>
                            <li>
                                <a>
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                    Messages
                                </a>
                            </li>
                            <li>
                                <a onClick={this.props.logoutUser}>
                                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

            </header>
        );
    }
};

//Gives us access to our action, logoutUser, as this.props.logoutUser within container
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logoutUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(Header);

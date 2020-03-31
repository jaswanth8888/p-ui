import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { fetchUserDetails } from '../../redux/actions/RetailerActions';
import SubNavbar from '../organisms/SubNavbar.jsx';

class Welcome extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
        }
    }
    isAuthenticated() {
        var token = sessionStorage.getItem("token");
        return token && token.length > 10;
      }
    
    render() {
        // const isAlreayAuthenticated = this.isAuthenticated();
        return (
            <SubNavbar/>
        )
    }
}

const stateAsProps = store => ({
  loggedInUser: store.RetailerReducer.loggedInUser,
  login_status: store.RetailerReducer.login_status
});
const actionsAsProps = {
  getUserDetails: fetchUserDetails
};

// export default connect(stateAsProps,{})(Welcome)
export default connect(stateAsProps, actionsAsProps)(Welcome);
// export default connect(null,actionsAsProps)(Welcome)

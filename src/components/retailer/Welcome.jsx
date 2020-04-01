import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { fetchUserDetails } from '../../redux/actions/RetailerActions.js';
import SubNavbar from '../organisms/SubNavbar.jsx';

class Welcome extends Component {
    render() {
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

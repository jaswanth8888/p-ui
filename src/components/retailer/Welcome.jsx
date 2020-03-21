import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import { Grid} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import {fetchUserDetails} from '../../redux/actions/RetailerActions'
import {Link} from 'react-router-dom'
import Message from './Message.jsx'
import SubNavbar from '../organisms/SubNavbar.jsx'

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

const stateAsProps = (store) => ({
    loggedInUser: store.RetailerReducer.loggedInUser,
    login_status:store.RetailerReducer.login_status
});
const actionsAsProps = {
    getUserDetails: fetchUserDetails
};

// export default connect(stateAsProps,{})(Welcome)
export default connect(stateAsProps,actionsAsProps)(Welcome)
// export default connect(null,actionsAsProps)(Welcome)
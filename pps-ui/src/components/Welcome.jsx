import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import {fetchUserDetails} from '../redux/actions/userActions'
// import {store} from '../App'
class Welcome extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            //  username:this.props.loggedInUser
        }
    }
    
    render() {
        return (
            <div>
                {console.log()}
                <br/><br/><br/><br/>
                <p>Welcome </p>
            </div>
        )
    }
}

const stateAsProps = (reducers) => {
    console.log(reducers);
    return {
        loggedInUser: reducers.RetailerReducer.loggedInUser   
    }
}
const actionsAsProps = {
    getUserDetails: fetchUserDetails
};

export default connect(stateAsProps, actionsAsProps)(Welcome)
// export default connect(null,actionsAsProps)(Welcome)
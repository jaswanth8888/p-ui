import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import { Grid} from "@material-ui/core";
import Button from "../atoms/Button";
import {fetchUserDetails} from '../../redux/actions/RetailerActions'
import {Link} from 'react-router-dom'
import Message from './Message.jsx'
// import {store} from '../App'
class Welcome extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            
            //  username:this.props.loggedInUser.username
        }
    }
    
    render() {
        return (
            <div>
                <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: "100vh" }}
                >
                <Grid item xs={3}>
                <div className="" style={{alignContent:"center"}}>
                </div>
                <Message />
                    <form className="{classes.form}" noValidate>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="{classes.submit}"
                        onClick={this.handleSubmit}
                    >
                        CREATE ZONE
                    </Button>
                    
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="{classes.submit}"
                        onClick={this.handleSubmit}
                    >
                        CREATE CLUSTER
                    </Button>
                    <Link to='/store'>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="{classes.submit}"
                        onClick={this.handleSubmit}
                    >
                        CREATE STORE
                    </Button>
                    </Link>
                    </form>
                </Grid>
                </Grid>
            </div>
        )
    }
}

// const stateAsProps = (reducers) => {
//     console.log(reducers);
//     return {
//         loggedInUser: reducers.RetailerReducer.loggedInUser   
//     }
// }
const stateAsProps = (store) => ({
    loggedInUser: store.RetailerReducer.loggedInUser
});
const actionsAsProps = {
    getUserDetails: fetchUserDetails
};

// export default connect(stateAsProps,{})(Welcome)
export default connect(stateAsProps,actionsAsProps)(Welcome)
// export default connect(null,actionsAsProps)(Welcome)
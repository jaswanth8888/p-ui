import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import { Grid} from "@material-ui/core";
import Button from "../atoms/Button";
import {fetchUserDetails} from '../../redux/actions/userActions'
import SideBar from './SideBar'
import {
    Redirect
  } from "react-router-dom";


class Welcome extends Component {
    constructor(props) {
        super(props)
    
        
    }
    isAuthenticated() {
        var token = sessionStorage.getItem("token");
        return token && token.length > 10;
      }
    
    render() {
        // const isAlreayAuthenticated = this.isAuthenticated();
        return (
            <div>
               
                    <div>
                <br/><br/><br/><br/>
                <p>Welcome {this.props.loggedInUser.username}</p>
                <SideBar />
                <Grid
                container
                spacing={0}
                direction="row"
                alignItems="center"
                justify="center"
                style={{ minHeight: "100vh" }}
                >
                <Grid item xs={3}>
                <div className="" style={{alignContent:"center"}}>
                </div>
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
                    </form>
                </Grid>
                </Grid>
                </div>
                
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
    loggedInUser: store.RetailerReducer.loggedInUser,
    login_status:store.RetailerReducer.login_status
});
const actionsAsProps = {
    getUserDetails: fetchUserDetails
};

// export default connect(stateAsProps,{})(Welcome)
export default connect(stateAsProps,actionsAsProps)(Welcome)
// export default connect(null,actionsAsProps)(Welcome)
import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import { Grid} from "@material-ui/core";
import Button from "../atoms/Button";
import {fetchUserDetails} from '../../redux/actions/RetailerActions'
import {Link} from 'react-router-dom'
import Message from './Message.jsx'

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
            <div>
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
                <Message/>
                    <form className="{classes.form}" noValidate>
                    <Link to='/zonepage'>
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
                    </Link>
                    <Link to='/cluster'>
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
                    </Link>
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
                    <Link to='/view'>
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
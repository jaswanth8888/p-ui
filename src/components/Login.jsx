import React, { Component } from "react";
import { Grid, TextField, Avatar, Typography, Box } from "@material-ui/core";
import Button from "./atoms/Button";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { connect } from "react-redux";
import { login } from "../redux/actions/RetailerActions";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.login({ ...this.state }); // thunk action
  }
  isAuthenticated() {
    var token = sessionStorage.getItem("token");
    return token && token.length > 10;
  }

  render() {
    // const isAlreayAuthenticated = this.isAuthenticated();
    return (
      
      <div>
       {this.props.login_status.success ? ( window.location.href="/welcome"):
        (<Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <Box diasplay="flex" flexDirection="row" justifyContent="center">
              <Box p={1}>
                <Avatar
                  className="{classes.avatar}"
                  style={{ color: "#3F51B5" }}
                >
                  <LockOutlinedIcon />
                </Avatar>
              </Box>

              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Typography component="span" color="error" variant="h5">
                {this.props.login_status.errorMsg}
              </Typography>
              {/* {this.props.login_status['errorMsg']} */}
            </Box>
            <form className="{classes.form}" noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                onChange={this.handleChange}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={this.handleChange}
                autoComplete="current-password"
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className="{classes.submit}"
                onClick={this.handleSubmit}
              >
                Sign In
              </Button>
            </form>
          </Grid>
        </Grid>)
         }
      </div>
    );
  }
}

const stateAsProps = function(store) {
  if("login_status" in store.RetailerReducer) {
    console.log("hi");
    return {
      login_status: store.RetailerReducer.login_status
    };
    
  }else {
    return {login_status :{errorMsg:''}};    
  }
};

export default connect(stateAsProps, { login })(Login);

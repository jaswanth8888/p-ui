import React, { Component } from "react";
import { Grid, TextField, Avatar, Typography, Box } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { connect } from "react-redux";
import { login } from "../redux/actions/RetailerActions.jsx";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_crendentials: {
        username: "",
        password: ""
      },
      error: {
        usernameError: false,
        usernameErrorMsg: "",
        passwordError: false,
        passwordErrorMsg: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    let user_crendentials = this.state.user_crendentials;
    user_crendentials[name] = value;
    this.setState({ user_crendentials });
  }
  is_validUsername=()=>{
    console.log('entered valid username')
    let username=this.state.user_crendentials.username
    let error=this.state.error
    if(username===''){
      error.usernameError=true;
      error.usernameErrorMsg='please fill username'
      this.setState({error})
      return false
    }
    error.usernameError=false;
    error.usernameErrorMsg=''
    this.setState({error})

    return true

  }
  is_validPassword=()=>{
    let password=this.state.user_crendentials.password
    let error=this.state.error
    if(password===''){
      error.passwordError=true;
      error.passwordErrorMsg='please fill password'
      this.setState({error})
      return false
    }
    error.passwordError=false;
    error.passwordErrorMsg=''
    this.setState({error})

    return true

  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('handle submit',this.is_validPassword(),this.is_validUsername())
    if (this.is_validUsername() && this.is_validPassword()) {
      this.props.login({ ...this.state.user_crendentials }); // thunk action
    }
  }
  isAuthenticated() {
    var token = sessionStorage.getItem("token");
    return token && token.length > 10;
  }

  render() {
    return (
      <div>
        {this.props.login_status.success ? (
          (window.location.href = "/welcome")
        ) : (
          <Grid
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
                  error={this.state.error.usernameError}
                  helperText={this.state.error.usernameErrorMsg}
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
                  error={this.state.error.passwordError}
                  helperText={this.state.error.passwordErrorMsg}
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
          </Grid>
        )}
      </div>
    );
  }
}

const stateAsProps = function(store) {
  if ("login_status" in store.RetailerReducer) {
    return {
      login_status: store.RetailerReducer.login_status
    };
  } else {
    return { login_status: { errorMsg: "" } };
  }
};

export default connect(stateAsProps, { login })(Login);

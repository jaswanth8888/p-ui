import React, { Component } from "react";
import { Grid, TextField,Button,Avatar,Typography} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { connect } from 'react-redux';
import { login } from '../redux/actions/userActions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    // console.log("changeeeeeeeee");
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    // console.log("submitttttttttt");
    this.props.login({ ...this.state }); // thunk action
    this.props.history.push('/welcome');
    // this.setState({ submitted: true });
    // const { username, password } = this.state;
    // if (username && password) {
    //   this.props.login(username, password);
    // }
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
        <Avatar className="{classes.avatar}">
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        </div>
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
        </Grid>

      </div>
    );
  }
}

export default connect(null, { login })(Login);

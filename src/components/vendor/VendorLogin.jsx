// vendor login
import { Avatar, Box, Grid, TextField, Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import InputAdornment from "@material-ui/core/InputAdornment"
import Lock from "@material-ui/icons/Lock"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import PersonIcon from "@material-ui/icons/Person"
import React, { Component } from "react"
import { connect } from "react-redux"
import { vendorlogin } from "../../redux/actions/VendorActions"
import Message from "./Message"

class VenderLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_crendentials: {
        username: "",
        password: "",
      },
      error: {
        usernameError: false,
        usernameErrorMsg: "",
        passwordError: false,
        passwordErrorMsg: "",
      },
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  isValidusername = () => {
    // console.log('entered valid username')
    const { username } = this.state.user_crendentials
    const { error } = this.state
    if (username === "") {
      error.usernameError = true
      error.usernameErrorMsg = "please fill username"
      this.setState({ error })
      return false
    }
    error.usernameError = false
    error.usernameErrorMsg = ""
    this.setState({ error })
    return true
  }

  isValidPassword = () => {
    const { password } = this.state.user_crendentials
    const { error } = this.state
    if (password === "") {
      error.passwordError = true
      error.passwordErrorMsg = "please fill password"
      this.setState({ error })
      return false
    }
    error.passwordError = false
    error.passwordErrorMsg = ""
    this.setState({ error })
    return true
  }

  handleChange(e) {
    const { name, value } = e.target
    const { user_crendentials } = this.state
    user_crendentials[name] = value
    this.setState({ user_crendentials })
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.isValidusername() && this.isValidPassword()) {
      this.props.vendorlogin({ ...this.state.user_crendentials }) // thunk action
      if (this.isAuthenticated()) {
        window.location.href = "/vendor/home"
      }
    }
  }

  isAuthenticated() {
    this.token = sessionStorage.getItem("token")
    return this.token && this.token.length > 10
  }

  render() {
    if (this.props.login_status.success) {
      console.log(this.props.login_status)
      // window.location.href = "/home"
    }
    return (
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={3}>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              pt={4}
            >
              <Box p={1}>
                <Avatar>
                  <LockOutlinedIcon color="white" />
                </Avatar>
              </Box>
              <Typography color="primary" component="h1" variant="h4">
                Login
              </Typography>
              <Typography component="span" color="error" variant="h5">
                {this.props.login_status.errorMsg}
              </Typography>
            </Box>
            <form>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                error={this.state.error.usernameError}
                helperText={this.state.error.usernameErrorMsg}
                id="username-vendor"
                label="User Name"
                name="username"
                autoComplete="username"
                onChange={this.handleChange}
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon
                        color="primary"
                        borderColor="primary.main"
                        borderRight={1}
                      />
                    </InputAdornment>
                  ),
                }}
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
                id="password-vendor"
                onChange={this.handleChange}
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock
                        color="primary"
                        borderColor="primary.main"
                        borderRight={1}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className="{classes.submit} submit-pad"
                id="login-vendor"
                onClick={this.handleSubmit}
              >
                Login
              </Button>
            </form>
          </Grid>
        </Grid>
        <Message />
      </div>
    )
  }
}
const stateAsProps = function (state) {
  if (state.login_status) {
    return {
      login_status: state.login_status,
      loggedInUser: state.loggedInUser,
    }
  }
  return { login_status: { errorMsg: "" } }
}
export default connect(stateAsProps, { vendorlogin })(VenderLogin)

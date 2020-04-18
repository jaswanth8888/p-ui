// vendor login
import {
  Avatar,
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  InputAdornment,
  AppBar,
  Toolbar,
} from "@material-ui/core"
import Lock from "@material-ui/icons/Lock"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import PersonIcon from "@material-ui/icons/Person"
import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import MenuIcon from "@material-ui/icons/Menu"
import AccountCircle from "@material-ui/icons/AccountCircle"
import { Link } from "react-router-dom"
import { vendorLogin } from "../../redux/actions/VendorActions"
import Message from "./Message"
import "./style.css"

class VendorLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userCredentials: {
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
    const { userCredentials } = this.state
    const { error } = this.state
    if (userCredentials.username === "") {
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
    const { userCredentials } = this.state
    const { error } = this.state
    if (userCredentials.password === "") {
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
    const { userCredentials } = this.state
    userCredentials[name] = value
    this.setState({ userCredentials })
  }

  handleSubmit(e) {
    e.preventDefault()
    const { userCredentials } = this.state
    const { vendorLogin: vendorLoginAlt } = this.props
    if (this.isValidusername() && this.isValidPassword()) {
      vendorLoginAlt({ ...userCredentials }) // thunk action
      sessionStorage.setItem("loginType", "vendor")
      this.props.history.push("/vendor/addproduct")
    }
  }

  isAuthenticated() {
    this.token = sessionStorage.getItem("token")
    return this.token && this.token.length > 10
  }

  render() {
    const { loginStatus } = this.props
    const { error } = this.state
    return (
      <div>
        <div>
          <div className="box-container">
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
                    {loginStatus.errorMsg}
                  </Typography>
                </Box>
                <form>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    error={error.usernameError}
                    helperText={error.usernameErrorMsg}
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
                    error={error.passwordError}
                    helperText={error.passwordErrorMsg}
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
        </div>
      </div>
    )
  }
}

VendorLogin.propTypes = {
  loginStatus: PropTypes.shape.isRequired,
  vendorLogin: PropTypes.func.isRequired,
  history: PropTypes.shape.isRequired,
  t: PropTypes.shape.isRequired,
}

const stateAsProps = (store) => {
  if ("loginStatus" in store.VendorReducer) {
    return {
      loginStatus: store.VendorReducer.loginStatus,
    }
  }
  return { loginStatus: { errorMsg: "" } }
}

export default connect(stateAsProps, { vendorLogin })(VendorLogin)

import { TextField } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import InputAdornment from "@material-ui/core/InputAdornment"
import Lock from "@material-ui/icons/Lock"
import LockOpenIcon from "@material-ui/icons/LockOpen"
import PersonIcon from "@material-ui/icons/Person"
import i18n from "i18next"
import md5 from "md5"
import React, { Component } from "react"
import { withTranslation } from "react-i18next"
import { connect } from "react-redux"
import { login } from "../redux/actions/RetailerActions"
import Message from "./utils/Message"

class Login extends Component {
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

  isValidUsername = () => {
    const { userCredentials, error } = this.state
    if (userCredentials.username === "") {
      error.usernameError = true
      error.usernameErrorMsg = i18n.t("please fill username")
      this.setState({ error })
      return false
    }
    error.usernameError = false
    error.usernameErrorMsg = ""
    this.setState({ error })
    return true
  }

  isValidPassword = () => {
    const { userCredentials, error } = this.state
    if (userCredentials.password === "") {
      error.passwordError = true
      error.passwordErrorMsg = i18n.t("please fill password")
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
    const u = this.isValidUsername()
    const p = this.isValidPassword()
    const tempProps = this.props
    if (u && p) {
      const userObject = this.state
      userObject.userCredentials.password = md5(
        userObject.userCredentials.password
      )

      tempProps.login({ ...userObject.userCredentials }) // thunk action
    }
  }

  isAuthenticated() {
    this.token = sessionStorage.getItem("token")
    return this.token && this.token.length > 10
  }

  render() {
    const { t, i18n } = this.props
    return (
      <null>
        {this.props.login_status.success ? (
          this.props.history.push("/group")
        ) : (
          <div className="box-container">
            <div className="joint-form">
              <div className="login-full">
                <div>
                  {this.state.userCredentials.password.length <= 0 ? (
                    <div className="help-block">
                      <Lock className="login-icon" />
                    </div>
                  ) : (
                    <div className="help-block">
                      <LockOpenIcon className="login-icon" />
                    </div>
                  )}
                </div>
                <form className="{classes.form}" noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    error={this.state.error.usernameError}
                    helperText={this.state.error.usernameErrorMsg}
                    id="username"
                    label={t("login.userName")}
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
                    label={t("login.password")}
                    type="password"
                    id="password"
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
                    onClick={this.handleSubmit}
                  >
                    {t("header.logIn")}
                  </Button>
                </form>
              </div>
            </div>
            <Message />
          </div>
        )}
      </null>
    )
  }
}

const stateAsProps = (store) => {
  if ("login_status" in store.RetailerReducer) {
    return {
      login_status: store.RetailerReducer.login_status,
    }
  }
  return { login_status: { errorMsg: "" } }
}

export default connect(stateAsProps, { login })(withTranslation()(Login))

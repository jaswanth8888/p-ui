import { Avatar, Box, Grid, TextField, Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import InputAdornment from "@material-ui/core/InputAdornment"
import Lock from "@material-ui/icons/Lock"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import PersonIcon from "@material-ui/icons/Person"
import React, { Component } from "react"
import { connect } from "react-redux"
import md5 from "md5"
import { withTranslation } from "react-i18next"
import i18n from "i18next"
import { login } from "../redux/actions/RetailerActions.js"

class Login extends Component {
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

  handleChange(e) {
    const { name, value } = e.target
    const { user_crendentials } = this.state
    user_crendentials[name] = value
    this.setState({ user_crendentials })
  }

  is_validUsername = () => {
    const { username } = this.state.user_crendentials
    const { error } = this.state
    if (username === "") {
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

  is_validPassword = () => {
    const { password } = this.state.user_crendentials
    const { error } = this.state
    if (password === "") {
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

  handleSubmit(e) {
    e.preventDefault()
    const u = this.is_validUsername()
    const p = this.is_validPassword()
    if (u && p) {
      const user_crendentials = { ...this.state.user_crendentials }
      user_crendentials.password = md5(user_crendentials.password)
      this.props.login({ ...user_crendentials }) // thunk action
    }
  }

  isAuthenticated() {
    const token = sessionStorage.getItem("token")
    return token && token.length > 10
  }

  render() {
    const { t, i18n } = this.props
    return (
      <>
        {this.props.login_status.success ? (
          this.props.history.push("/group")
        ) : (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid
              item
              xs={3}
              style={{
                border: "1px solid rgba(0,0,0,0.2)",
                borderLeft: "5px solid #673ab7",
                borderRadius: "4px",
                boxShadow: "0px 10px 17px 6px rgba(0,0,0,0.24)",
              }}
            >
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                style={{
                  fontWeight: 300,
                  BorderRadius: "4px",
                  marginLeft: "-40px",
                  position: "relative",
                }}
                pt={4}
              >
                <Typography
                  color="primary"
                  component="h1"
                  variant="h4"
                  style={{
                    marginLeft: "20px",
                    fontFamily: "font-family: 'Open Sans', sans-serif;",
                  }}
                >
                  {t("header.logIn")}
                </Typography>
                <Typography component="span" color="error" variant="h5">
                  {this.props.login_status.errorMsg}
                </Typography>
              </Box>
              <form
                className="{classes.form}"
                noValidate
                style={{ padding: "40px" }}
              >
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
                  className="{classes.submit}"
                  onClick={this.handleSubmit}
                  style={{ marginTop: "30px" }}
                >
                  {t("header.logIn")}
                </Button>
              </form>
            </Grid>
          </Grid>
        )}
      </>
    )
  }
}

const stateAsProps = function (store) {
  if ("login_status" in store.RetailerReducer) {
    return {
      login_status: store.RetailerReducer.login_status,
    }
  }
  return { login_status: { errorMsg: "" } }
}

export default connect(stateAsProps, { login })(withTranslation()(Login))

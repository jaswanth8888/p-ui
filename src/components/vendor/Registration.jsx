import React, { Component } from "react"
import {
  Grid,
  TextField,
  Avatar,
  Typography,
  Box,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  FormHelperText,
} from "@material-ui/core"
import Button from "@material-ui/core/Button"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import md5 from "md5"
import { registration } from "../../redux/actions/VendorActions"
import Message from "./Message"

const categoryList = ["Baby", "Liquor"]
export class Registration extends Component {
  constructor(props) {
    super(props)

    this.state = {
      vendorDetails: {
        email: "",
        companyName: "",
        companyType: "",
        password: "",
        confirmPassword: "",
        productSold: [],
      },
      error: {
        emailError: false,
        emailErrorMsg: "",
        passwordError: false,
        passwordErrorMsg: "",
        confirmPasswordError: false,
        confirmPasswordErrorMsg: "",
        companyNameError: false,
        companyNameErrorMsg: "",
        checkedBoxError: false,
        checkedBoxErrorMsg: "",
      },
      submitted: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCheckedInput = this.handleCheckedInput.bind(this)
  }

  isValidPassword = () => {
    const { password } = this.state.vendorDetails
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

  isValidEmail = () => {
    const { email } = this.state.vendorDetails
    const { error } = this.state
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()[\]\\.,:\s@\"]+(\.[^<>()[\]\\.,:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(email)) {
      error.emailError = true
      error.emailErrorMsg = "Please enter valid email address"
      this.setState({ error })
      return false
    }
    error.emailError = false
    error.emailErrorMsg = ""
    this.setState({ error })
    return true
  }

  isConfirmPassword = () => {
    const { confirmPassword } = this.state.vendorDetails
    const { error } = this.state
    if (confirmPassword !== this.state.vendorDetails.password) {
      error.confirmPasswordError = true
      error.confirmPasswordErrorMsg =
        "Please enter a password and confirm password same"
      this.setState({ error })
      return false
    }
    error.confirmPasswordError = false
    error.confirmPasswordErrorMsg = ""
    this.setState({ error })
    return true
  }

  isValidCompanyName = () => {
    const { companyName } = this.state.vendorDetails
    const { error } = this.state
    if (companyName.length < 5) {
      error.companyNameError = true
      error.companyNameErrorMsg =
        "Company name cannot be empty or should be minimum 5 characters"
      this.setState({ error })
      return false
    }
    error.companyNameError = false
    error.companyNameErrorMsg = ""
    this.setState({ error })
    return true
  }

  isValidCheckBox = () => {
    const { vendorDetails } = this.state
    const { productSold } = vendorDetails
    const { error } = this.state
    if (productSold.length === 0) {
      error.checkedBoxError = true
      error.checkedBoxErrorMsg = "Please select minimum 1 category to sell"
      this.setState({ error })
      return false
    }
    return true
  }

  handleChange(e) {
    const { name, value } = e.target
    const { vendorDetails } = this.state
    vendorDetails[name] = value
    this.setState({ vendorDetails })
  }

  handleSubmit(e) {
    e.preventDefault()
    const { vendorDetails } = this.state
    if (
      this.isValidEmail() &&
      this.isValidPassword() &&
      this.isConfirmPassword() &&
      this.isValidCompanyName() &&
      this.isValidCheckBox()
    ) {
      delete vendorDetails.confirmPassword
      vendorDetails.password = md5(vendorDetails.password)
      this.props.registration({ ...vendorDetails })
      let { submitted } = this.state
      submitted = true
      this.setState({ submitted })
    }
  }

  handleCheckedInput(e) {
    e.preventDefault()
    const { checked, value } = e.target
    const { vendorDetails } = this.state
    const { productSold } = vendorDetails
    if (checked) {
      productSold.push(value)
    } else {
      productSold.splice(productSold.indexOf(value), 1)
    }
    this.setState({ productSold })
  }

  render() {
    const { error, vendorDetails } = this.state
    const { registerStatus } = this.props
    return (
      <>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={3}>
            <Box diasplay="flex" flexDirection="row" justifyContent="center">
              <Box p={1}>
                <Avatar className="{classes.avatar}">
                  <LockOutlinedIcon />
                </Avatar>
              </Box>

              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <Typography component="span" color="error" variant="h5">
                {registerStatus.msg}
              </Typography>
            </Box>

            <form className="{classes.form}">
              <TextField
                className="{classes.form}"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                error={error.emailError}
                helperText={error.emailErrorMsg}
                id="email"
                label="email"
                type="email"
                name="email"
                autoComplete="email"
                onChange={this.handleChange}
                autoFocus
              />
              <TextField
                className="{classes.form}"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                error={error.passwordError}
                helperText={error.passwordErrorMsg}
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={this.handleChange}
                autoComplete="current-password"
              />
              <TextField
                className="{classes.form}"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                error={error.confirmPasswordError}
                helperText={error.confirmPasswordErrorMsg}
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                onChange={this.handleChange}
                autoComplete="current-password"
              />
              <TextField
                className="{classes.form}"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                error={error.companyNameError}
                helperText={error.companyNameErrorMsg}
                name="companyName"
                label="Company Name"
                type="text"
                id="companyName"
                onChange={this.handleChange}
              />
              <InputLabel htmlFor="companyType">Company Type</InputLabel>
              <Select
                label="Company Type"
                fullWidth
                id="companyType"
                name="companyType"
                value={vendorDetails.companyType}
                onChange={this.handleChange}
              >
                <MenuItem value="Alcohol">Alcohol</MenuItem>
                <MenuItem value="BabyFood">BabyFood </MenuItem>
              </Select>

              <div>
                <FormLabel>Products Sold</FormLabel>
                {categoryList.map((x) => (
                  <div key={x}>
                    <Checkbox
                      variant="outlined"
                      margin="normal"
                      onChange={this.handleCheckedInput}
                      label={x}
                      value={x}
                      key={x}
                      id="Checkbox"
                    />
                    <FormLabel>{x}</FormLabel>
                  </div>
                ))}
                <FormHelperText error={error.checkedBoxError}>
                  {error.checkedBoxErrorMsg}
                </FormHelperText>
              </div>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className="{classes.submit}"
                onClick={this.handleSubmit}
                id="signupsubmit"
              >
                Sign up
              </Button>
            </form>
          </Grid>
          <Message />
        </Grid>
      </>
    )
  }
}
Registration.propTypes = {
  registerStatus: PropTypes.shape.isRequired,
}
const stateAsProps = function (store) {
  if ("registerStatus" in store.VendorReducer) {
    return {
      registerStatus: store.VendorReducer.registerStatus,
    }
  }
  return { registerStatus: { errorMsg: "Registration Failed" } }
}
export default connect(stateAsProps, { registration })(Registration)

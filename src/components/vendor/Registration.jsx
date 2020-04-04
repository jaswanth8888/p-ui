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
import { connect } from "react-redux"
import { render } from "@testing-library/react"
import md5 from 'md5'
import { registration } from "../../redux/actions/VendorActions.js";
import Message from "./Message"

const categoryList = ["Baby", "Liquor"]
export class Registration extends Component {
  constructor(props) {
    super(props)

    this.state = {
      vender_details: {
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
  handleChange(e) {
    const { name, value } = e.target
    let vender_details = this.state.vender_details
    vender_details[name] = value
    this.setState({ vender_details })
  }
  handleCheckedInput(e) {
    e.preventDefault()
    const { checked, value } = e.target
    let productSold = this.state.vender_details.productSold
    if (checked) {
      productSold.push(value)
    } else {
      productSold.splice(productSold.indexOf(value), 1)
    }
    this.setState({ productSold })
  }
  remove_attribute = () => {
    this.setState({
      vender_details: this.state.vender_details.filter(
        (item) => item != "confirmPassword"
      )
    })

  }
  handleSubmit(e) {
    e.preventDefault()
    if (
      this.is_validEmail() &&
      this.is_validPassword() &&
      this.is_confirmPassword() &&
      this.is_validCompanyName() &&
      this.is_validCheckBox()
    ) {
      delete this.state.vender_details.confirmPassword
      let vender_details = { ...this.state.vender_details }
      vender_details.password = md5(vender_details.password)
      this.props.registration({ ...this.state.vender_details })
      console.log(this.state.vender_details)
      let submitted = this.state.submitted
      submitted = true
      this.setState({ submitted })
      console.log(submitted)
    }
  }
  is_validPassword = () => {
    let password = this.state.vender_details.password
    let error = this.state.error
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
  is_validEmail = () => {
    let email = this.state.vender_details.email
    let error = this.state.error
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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
  is_confirmPassword = () => {
    let confirmPassword = this.state.vender_details.confirmPassword
    let error = this.state.error
    if (confirmPassword !== this.state.vender_details.password) {
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
  is_validCompanyName = () => {
    let companyName = this.state.vender_details.companyName
    let error = this.state.error
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
  is_validCheckBox = () => {
    let productSold = this.state.vender_details.productSold
    let error = this.state.error
    if (productSold.length === 0) {
      error.checkedBoxError = true
      error.checkedBoxErrorMsg = "Please select minimum 1 category to sell"
      this.setState({ error })
      return false
    }
    return true
  }
  render() {
    return (
      <div>
        {this.props.register_status.registered ? (
          console.log("successfully registered")
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
                  Sign Up
                </Typography>
                <Typography component="span" color="error" variant="h5">
                  {this.props.register_status.msg}
                </Typography>
              </Box>

              <form className="{classes.form}">
                <TextField
                  className="{classes.form}"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  error={this.state.error.emailError}
                  helperText={this.state.error.emailErrorMsg}
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
                  error={this.state.error.passwordError}
                  helperText={this.state.error.passwordErrorMsg}
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
                  error={this.state.error.confirmPasswordError}
                  helperText={this.state.error.confirmPasswordErrorMsg}
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
                  error={this.state.error.companyNameError}
                  helperText={this.state.error.companyNameErrorMsg}
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
                  value={this.state.vender_details.companyType}
                  onChange={this.handleChange}
                >
                  <MenuItem value={"Alcohol"}>Alcohol</MenuItem>
                  <MenuItem value={"BabyFood"}>BabyFood </MenuItem>
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
                  <FormHelperText error={this.state.error.checkedBoxError}>
                    {this.state.error.checkedBoxErrorMsg}
                  </FormHelperText>
                </div>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="{classes.submit}"
                  onClick={this.handleSubmit}
                >
                  Sign up
                </Button>
              </form>
            </Grid>
            <Message />
          </Grid>
        )}
      </div>
    )
  }
}
const stateAsProps = function(store) {
if ("register_status" in store.VendorReducer) {
  return {
    register_status: store.VendorReducer.register_status
  };
} 
  return { register_status: { errorMsg: "Registration Failed" } };

};
export default connect(stateAsProps, { registration })(Registration)

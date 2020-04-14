import React, { Component } from "react"

import connect from "react-redux/es/connect/connect"
import Button from "@material-ui/core/Button"
import { vendorlogout } from "../../redux/actions/VendorActions"
import Message from "./Message"

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["handleSubmit","handleLogout"] }] */
class Home extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleSubmit() {
    window.location.href = "./addproduct"
  }

  handleLogout() {
    sessionStorage.removeItem("token")
    window.location.href = "./"
  }

  render() {
    if (sessionStorage.getItem("token") != null) {
      return (
        <div>
          <Button
            type="button"
            variant="contained"
            color="primary"
            className="{classes.submit}"
            onClick={this.handleSubmit}
            id="add-prod-vendor"
          >
            addproduct
          </Button>
          <Button
            type="button"
            variant="contained"
            color="primary"
            className="{classes.submit}"
            onClick={this.handleLogout}
            id="logout-vendor"
          >
            logout
          </Button>
          <Message />
        </div>
      )
    }
    window.location.href = "./vendor"
    return true
  }
}
const stateAsProps = (store) => ({
  msg: store.VendorReducer.msg,
})
const actionsAsProps = {
  vendorlogout,
}
export default connect(stateAsProps, actionsAsProps)(Home)

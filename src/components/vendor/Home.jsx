import React, { Component } from "react"

import connect from "react-redux/es/connect/connect"
import Button from "@material-ui/core/Button"
import { vendorlogout } from "../../redux/actions/VendorActions"

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogout: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    console.log("home")
    window.location.href = "./addproduct"
  }

  handleLogout(e) {
    sessionStorage.setItem("token", null)
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
            style={{ marginTop: "30px", maeginleft: "70px" }}
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
            style={{ marginTop: "30px", marginLeft: "1000px" }}
            onClick={this.handleLogout}
            id="logout-vendor"
          >
            logout
          </Button>
        </div>
      )
    }
    window.location.href = "./vendor"
  }
}
const actionsAsProps = {
  vendorlogout,
}
export default connect(null, actionsAsProps)(Home)

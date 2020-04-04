import React, { Component } from "react"
import connect from "react-redux/es/connect/connect"
import MuiAlert from "@material-ui/lab/Alert"
import Snackbar from "@material-ui/core/Snackbar"
import { messageSetNull } from "../../redux/actions/VendorActions"

class Message extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  closeAlert = () => {
    this.props.messageSetNull()
  }

  render() {
    return (
      <>
        {this.props.msg !== "" ? (
          <Snackbar
            open="true"
            onClose={this.closeAlert}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MuiAlert
              severity={this.props.msgSeverity}
              elevation={6}
              variant="filled"
              onClose={this.closeAlert}
            >
              {this.props.msg}
            </MuiAlert>
          </Snackbar>
        ) : (
          ""
        )}
      </>
    )
  }
}

const stateAsProps = (store) => ({
  msg: store.VendorReducer.msg,
  msgSeverity: store.VendorReducer.msgSeverity,
})
const actionsAsProps = {
  messageSetNull,
}
export default connect(stateAsProps, actionsAsProps)(Message)

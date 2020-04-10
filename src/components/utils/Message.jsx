import React, { Component } from "react"
import connect from "react-redux/es/connect/connect"
import MuiAlert from "@material-ui/lab/Alert"
import Snackbar from "@material-ui/core/Snackbar"
import PropTypes from "prop-types"
import { messageSetNull } from "../../redux/actions/RetailerActions"

class Message extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  closeAlert = () => {
    this.props.messageSetNull()
  }

  render() {
    const { msg, msgSeverity } = this.props
    return (
      <>
        {msg !== "" ? (
          <Snackbar
            open="true"
            onClose={this.closeAlert}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MuiAlert
              severity={msgSeverity}
              elevation={6}
              variant="filled"
              onClose={this.closeAlert}
            >
              {msg}
            </MuiAlert>
          </Snackbar>
        ) : (
          ""
        )}
      </>
    )
  }
}

Message.propTypes = {
  msg: PropTypes.string.isRequired,
  msgSeverity: PropTypes.string.isRequired,
  messageSetNull: PropTypes.func.isRequired,
}

const stateAsProps = (store) => ({
  msg: store.RetailerReducer.msg,
  msgSeverity: store.RetailerReducer.msgSeverity,
})
const actionsAsProps = {
  messageSetNull,
}
export default connect(stateAsProps, actionsAsProps)(Message)

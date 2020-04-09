import { TextField, Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import Snackbar from "@material-ui/core/Snackbar"
import CheckIcon from "@material-ui/icons/Check"
import ClearIcon from "@material-ui/icons/Clear"
import MuiAlert from "@material-ui/lab/Alert"
import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { postZone, getPricesInRange } from "../../redux/actions/RetailerActions"
import Message from "../utils/Message"

class GetProductsInDateRange extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentDate: new Date().toISOString().slice(0, 10),
      startDate: "",
      endDate: "",
      isSubmit: false,
      status: 0,
    }

    this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = () => {
    this.props.getPricesInRange(
      this.state.startDate,
      this.state.endDate,
      this.state.currentDate
    )
    this.props.history.push("/view/effectiveprices")
  }

  render() {
    return (
      <div className="box-container">
        <div className="joint-form">
          <div className="validation-half">
            <div className="validations">
              <h3 style={{ textAlign: "center" }}>Requirements</h3>
              {this.state.startDate.length == 0 && (
                <div style={{ display: "flex" }}>
                  <ClearIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    Enter a valid Start Date
                  </Typography>
                </div>
              )}
              {this.state.startDate.length != 0 && (
                <div style={{ display: "flex", color: "#ffc107" }}>
                  <CheckIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    Enter a valid Start Date
                  </Typography>
                </div>
              )}
              {this.state.endDate.length == 0 && (
                <div style={{ display: "flex" }}>
                  <ClearIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    Enter a valid End Date
                  </Typography>
                </div>
              )}
              {this.state.endDate.length != 0 && (
                <div style={{ display: "flex", color: "#ffc107" }}>
                  <CheckIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    Enter a valid End Date
                  </Typography>
                </div>
              )}
              {this.state.startDate <= this.state.currentDate && (
                <div style={{ display: "flex" }}>
                  <ClearIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    Start date has to be a future Date
                  </Typography>
                </div>
              )}
              {this.state.startDate >= this.state.currentDate && (
                <div style={{ display: "flex", color: "#ffc107" }}>
                  <CheckIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    Start date has to be a future Date
                  </Typography>
                </div>
              )}
              {this.state.endDate <= this.state.startDate && (
                <div style={{ display: "flex" }}>
                  <ClearIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    End Date has to be greater than Start Date
                  </Typography>
                </div>
              )}
              {this.state.endDate > this.state.startDate && (
                <div style={{ display: "flex", color: "#ffc107" }}>
                  <CheckIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    End Date has to be greater than Start Date
                  </Typography>
                </div>
              )}
            </div>
          </div>
          <div className="form-half">
            <form className="{classes.form}" noValidate>
              <div>
                <div className="help-block">
                  <Typography color="primary" component="h1" variant="h4">
                    Prices for Products
                  </Typography>
                </div>
              </div>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="date"
                id="startDate-in-range"
                label="Start Date"
                InputLabelProps={{ shrink: true, required: true }}
                name="startDate"
                autoComplete="startDate"
                onChange={this.handleChange}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="date"
                // defaultValue={new Date().toISOString().slice(0,10)}
                step="0.01"
                id="endDate-in-range"
                label="End Date"
                InputLabelProps={{ shrink: true, required: true }}
                name="endDate"
                autoComplete="endDate"
                onChange={this.handleChange}
                autoFocus
              />
              {this.state.startDate >= this.state.currentDate &&
                this.state.endDate > this.state.startDate && (
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="{classes.submit}"
                    onClick={this.handleSubmit}
                    style={{ marginTop: "30px" }}
                    id="get-prods-in-range-submit"
                  >
                    Show
                  </Button>
                )}
            </form>
          </div>
        </div>
      </div>
    )
  }
}
const stateAsProps = (store) => ({
  products: store.RetailerReducer.products,
})

const actionAsProps = {
  getPricesInRange,
}

export default connect(stateAsProps, actionAsProps)(GetProductsInDateRange)

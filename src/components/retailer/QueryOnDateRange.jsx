import { InputLabel, Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import CheckIcon from "@material-ui/icons/Check"
import ClearIcon from "@material-ui/icons/Clear"
import React, { Component } from "react"
import { connect } from "react-redux"
import { getProductsInRange } from "../../redux/actions/RetailerActions"

class QueryOnDateRange extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: "",
      endDate: "",
      isSubmited: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    console.log(this.state.startDate, this.state.endDate)
    this.props.getAllProducts(this.state.startDate, this.state.endDate)
    this.setState({ isSubmited: true })
    this.props.history.push("/showproducts")
  }

  render() {
    return (
      <div className="box-container">
        <div className="joint-form">
          <div className="validation-half" style={{ background: "#673ab7" }}>
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
                  <Typography
                    color="primary"
                    component="h1"
                    variant="h4"
                    style={{
                      fontFamily: "font-family: 'Open Sans', sans-serif;",
                    }}
                  >
                    Promotions for Products
                  </Typography>
                </div>
              </div>

              <TextField
                id="startDate"
                label="Start Date"
                name="startDate"
                fullWidth
                value={this.state.startDate}
                type="date"
                variant="outlined"
                margin="normal"
                autoComplete="startDate"
                required
                onChange={this.handleChange}
                autoFocus
                InputLabelProps={{ shrink: true, required: true }}
              />
              <TextField
                id="endDate"
                name="endDate"
                label="End Date"
                fullWidth
                value={this.state.endDate}
                type="date"
                variant="outlined"
                margin="normal"
                autoComplete="endDate"
                required
                onChange={this.handleChange}
                autoFocus
                InputLabelProps={{ shrink: true, required: true }}
              />
              {this.state.endDate > this.state.startDate && (
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="{classes.submit}"
                  style={{
                    marginTop: "30px",
                    marginBottom: "30px",
                  }}
                  onClick={this.handleSubmit}
                >
                  show
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
  getAllProducts: getProductsInRange,
}

export default connect(stateAsProps, actionAsProps)(QueryOnDateRange)

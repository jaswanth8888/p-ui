import { TextField, Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import CheckIcon from "@material-ui/icons/Check"
import ClearIcon from "@material-ui/icons/Clear"
import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { getPricesInRange } from "../../redux/actions/RetailerActions"

class GetProductsInDateRange extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentDate: new Date().toISOString().slice(0, 10),
      startDate: "",
      endDate: "",
    }

    this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = () => {
    const { startDate, endDate, currentDate } = this.state
    const { history, getPricesInRange: getPricesInRangeAlt } = this.props
    getPricesInRangeAlt(startDate, endDate, currentDate)
    history.push("/view/effectiveprices")
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  render() {
    const { startDate, endDate, currentDate } = this.state
    return (
      <div className="box-container">
        <div className="joint-form">
          <div className="validation-half">
            <div className="validations">
              <h3>Requirements</h3>
              {startDate.length === 0 && (
                <div>
                  <ClearIcon className="icon-style" />
                  <Typography variant="subtitle2" gutterBottom>
                    Enter a valid Start Date
                  </Typography>
                </div>
              )}
              {startDate.length !== 0 && (
                <div>
                  <CheckIcon className="icon-style" />
                  <Typography variant="subtitle2" gutterBottom>
                    Enter a valid Start Date
                  </Typography>
                </div>
              )}
              {endDate.length === 0 && (
                <div>
                  <ClearIcon className="icon-style" />
                  <Typography variant="subtitle2" gutterBottom>
                    Enter a valid End Date
                  </Typography>
                </div>
              )}
              {endDate.length !== 0 && (
                <div>
                  <CheckIcon className="icon-style" />
                  <Typography variant="subtitle2" gutterBottom>
                    Enter a valid End Date
                  </Typography>
                </div>
              )}
              {startDate <= currentDate && (
                <div>
                  <ClearIcon className="icon-style" />
                  <Typography variant="subtitle2" gutterBottom>
                    Start date has to be a future Date
                  </Typography>
                </div>
              )}
              {startDate >= currentDate && (
                <div>
                  <CheckIcon className="icon-style" />
                  <Typography variant="subtitle2" gutterBottom>
                    Start date has to be a future Date
                  </Typography>
                </div>
              )}
              {endDate <= startDate && (
                <div>
                  <ClearIcon className="icon-style" />
                  <Typography variant="subtitle2" gutterBottom>
                    End Date has to be greater than Start Date
                  </Typography>
                </div>
              )}
              {endDate > startDate && (
                <div>
                  <CheckIcon className="icon-style" />
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
              {startDate >= currentDate && endDate > startDate && (
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="{classes.submit} submit-pad"
                  onClick={this.handleSubmit}
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

GetProductsInDateRange.propTypes = {
  getPricesInRange: PropTypes.func.isRequired,
  history: PropTypes.shape.isRequired,
}

const stateAsProps = (store) => ({
  products: store.RetailerReducer.products,
})

const actionAsProps = {
  getPricesInRange,
}

export default connect(stateAsProps, actionAsProps)(GetProductsInDateRange)

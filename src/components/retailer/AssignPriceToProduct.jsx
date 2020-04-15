import { Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import React, { Component } from "react"
import { connect } from "react-redux"
import TextField from "@material-ui/core/TextField"
import PropTypes from "prop-types"
import ProductDetails from "../utils/ProductDetails"
import Message from "../utils/Message"
import {
  saveFromDate,
  saveToDate,
  saveProfitPercentage,
  getEffectivePrice,
} from "../../redux/actions/RetailerActions"

class AssignPriceToProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fromDate: "",
      toDate: "",
      profitPercentage: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {}

  handleSubmit = () => {
    const {
      saveFromDate: saveFromDateAlt,
      saveToDate: saveToDateAlt,
      saveProfitPercentage: saveProfitPercentageAlt,
      getEffectivePrice: getEffectivePriceAlt,
    } = this.props
    const { fromDate, toDate, profitPercentage } = this.state
    saveProfitPercentageAlt(profitPercentage)
    saveFromDateAlt(fromDate)
    saveToDateAlt(toDate)
    getEffectivePriceAlt(fromDate, toDate, profitPercentage)
  }

  render() {
    return (
      <div>
        <div className="box-container">
          <div className="joint-form-large">
            <ProductDetails />
            <div className="product-form-body">
              <Typography className="card-header" variant="h4">
                Assign Price To Product
              </Typography>
              <form className="{classes.form}" noValidate>
                <TextField
                  id="startDate-query"
                  label="From Date"
                  name="fromDate"
                  fullWidth
                  value={this.fromDate}
                  type="date"
                  variant="outlined"
                  margin="normal"
                  autoComplete="fromDate"
                  required
                  onChange={this.handleChange}
                  autoFocus
                  InputLabelProps={{ shrink: true, required: true }}
                />
                <TextField
                  id="startDate-query"
                  label="To Date"
                  name="toDate"
                  fullWidth
                  value={this.toDate}
                  type="date"
                  variant="outlined"
                  margin="normal"
                  autoComplete="toDate"
                  required
                  onChange={this.handleChange}
                  autoFocus
                  InputLabelProps={{ shrink: true, required: true }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="ProfitPercentage"
                  label="ProfitPercentage"
                  name="ProfitPercentage"
                  type="number"
                  onChange={this.handleChange}
                  value={this.profitPercentage}
                  autoFocus
                />

                <Button
                  fullWidth
                  type="button"
                  variant="contained"
                  color="primary"
                  className="{classes.submit} submit-pad"
                  onClick={this.handleSubmit}
                  id="assign-cluster-submit"
                >
                  Save
                </Button>
              </form>
            </div>
          </div>
          <Message />
        </div>
      </div>
    )
  }
}

AssignPriceToProduct.propTypes = {
  getEffectivePrice: PropTypes.func.isRequired,
  saveProfitPercentage: PropTypes.func.isRequired,
  saveFromDate: PropTypes.func.isRequired,
  saveToDate: PropTypes.func.isRequired,
}

const stateAsProps = () => ({})

const actionAsProps = {
  saveFromDate,
  saveToDate,
  saveProfitPercentage,
  getEffectivePrice,
}

export default connect(stateAsProps, actionAsProps)(AssignPriceToProduct)

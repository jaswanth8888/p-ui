import { Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import React, { Component } from "react"
import { connect } from "react-redux"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"
import TextField from "@material-ui/core/TextField"
import PropTypes from "prop-types"
import ProductDetails from "../utils/ProductDetails"
import {
  saveFromDate,
  saveToDate,
  saveEffectivePercentage,
  getEffectivePrice,
} from "../../redux/actions/RetailerActions"
import Message from "../utils/Message"

class AssignPriceToProduct extends Component {
  constructor(props) {
    super(props)
    const newDate = new Date()
    this.state = {
      fromDate: "",
      toDate: "",
      effectivePercentage: "",
      parameter: {},
      status: 1,
      day: newDate.getDate(),
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {}

  //   isValidDate = (e) => {
  //     // eslint-disable-next-line no-console
  //     console.log(getCurrentDate())
  //   }
  isValidDate = () => {
    const { day, fromDate, toDate } = this.state
    const dayval = fromDate.slice(8, fromDate.length)
    const dayval2 = toDate.slice(8, toDate.length)
    if (dayval < day) {
      this.setState({ status: 100 })
    } else if (dayval > dayval2) {
      this.setState({ status: 200 })
    }
    // console.log(day)
    // console.log(month)
    // console.log(fromDate)
    // console.log(dayval)
    // console.log(this.state.status)
  }

  handleChange1 = (e) => {
    this.setState({ fromDate: e.target.value })
  }

  handleChange2 = (e) => {
    this.setState({ toDate: e.target.value })
  }

  handleChange3 = (e) => {
    this.setState({ effectivePercentage: e.target.value })
  }

  handleSubmit = () => {
    const {
      saveFromDate: saveFromDateAlt,
      saveToDate: saveToDateAlt,
      saveEffectivePercentage: saveEffectivePercentageAlt,
      getEffectivePrice: getEffectivePriceAlt,
      history,
      productDetails,
    } = this.props
    const { fromDate, toDate, effectivePercentage, parameter } = this.state
    saveEffectivePercentageAlt(effectivePercentage)
    saveFromDateAlt(fromDate)
    saveToDateAlt(toDate)
    parameter.fromDate = fromDate
    parameter.toDate = toDate
    parameter.effectivePercentage = effectivePercentage
    getEffectivePriceAlt(parameter, productDetails.productName)
    history.push("/assignpricetoproduct")
    this.isValidDate()
  }

  render() {
    const { status, fromDate, toDate, effectivePercentage } = this.state
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
                  type="date"
                  variant="outlined"
                  margin="normal"
                  autoComplete="fromDate"
                  required
                  onChange={this.handleChange1}
                  autoFocus
                  InputLabelProps={{ shrink: true, required: true }}
                />
                <TextField
                  id="startDate-query"
                  label="To Date"
                  name="toDate"
                  fullWidth
                  type="date"
                  variant="outlined"
                  margin="normal"
                  autoComplete="toDate"
                  required
                  onChange={this.handleChange2}
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
                  onChange={this.handleChange3}
                  autoFocus
                />
                {fromDate.length > 0 &&
                  toDate.length > 0 &&
                  effectivePercentage > 0 && (
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
                  )}
              </form>
            </div>
          </div>

          <null>
            {status === 100 ? (
              <div>
                <Snackbar open="true" autoHideDuration={2000}>
                  <MuiAlert severity="error" elevation={6} variant="filled">
                    Enter Valid Start Date
                  </MuiAlert>
                </Snackbar>
              </div>
            ) : (
              <div />
            )}
            {status === 200 ? (
              <div>
                <Snackbar open="true" autoHideDuration={2000}>
                  <MuiAlert severity="error" elevation={6} variant="filled">
                    Enter Valid End Date
                  </MuiAlert>
                </Snackbar>
              </div>
            ) : (
              <div />
            )}
          </null>
          <Message />
        </div>
      </div>
    )
  }
}

AssignPriceToProduct.propTypes = {
  getEffectivePrice: PropTypes.func.isRequired,
  saveEffectivePercentage: PropTypes.func.isRequired,
  saveFromDate: PropTypes.func.isRequired,
  saveToDate: PropTypes.func.isRequired,
  history: PropTypes.shape.isRequired,
  productDetails: PropTypes.shape.isRequired,
}

const stateAsProps = (store) => ({
  productDetails: store.RetailerReducer.productDetails,
})

const actionAsProps = {
  saveFromDate,
  saveToDate,
  saveEffectivePercentage,
  getEffectivePrice,
}

export default connect(stateAsProps, actionAsProps)(AssignPriceToProduct)

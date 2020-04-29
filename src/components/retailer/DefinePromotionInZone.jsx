import { TextField, Typography, Button } from "@material-ui/core"
import React, { Component } from "react"
import CheckIcon from "@material-ui/icons/Check"
import ClearIcon from "@material-ui/icons/Clear"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Alert from "@material-ui/lab/Alert"
// import { spacing } from "@material-ui/system"
import { postPromotion } from "../../redux/actions/RetailerActions"
import { getPromotionAlert } from "../../redux/actions/AdminActions"
import ProductDetailsTable from "../utils/ProductDetailsTable"
import {
  startdate,
  enddate,
  datecheck,
  promotioncheck,
} from "../utils/constants"

class DefinePromotionInZone extends Component {
  constructor(props) {
    super(props)
    const { zone, getPromotionAlert } = this.props

    this.state = {
      promotionDetails: {
        appliedDate: new Date().toISOString().slice(0, 10),
        startDate: "",
        endDate: "",
        promotionPercentage: "",
        zoneName: zone,
        addedBy: "",
      },
      levelOption: "zone",
    }

    getPromotionAlert()
    this.handleChangePercentage = this.handleChangePercentage.bind(this)
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this)
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { postPromotion: postPromotionAlt, productName, history } = this.props
    const { promotionDetails, levelOption } = this.state
    postPromotionAlt(promotionDetails, productName, levelOption)
    history.push("/view/promotions/zone")
  }

  handleChangePercentage(e) {
    const percentage = e.target.value
    const { promotionDetails } = this.state
    this.setState({
      promotionDetails: {
        ...promotionDetails,
        promotionPercentage: percentage,
      },
    })
  }

  handleChangeStartDate(e) {
    const start = e.target.value
    const { promotionDetails } = this.state
    promotionDetails.startDate = start
    this.setState({
      promotionDetails: {
        ...promotionDetails,
        startDate: start,
      },
    })
  }

  handleChangeEndDate(e) {
    const end = e.target.value
    const { promotionDetails } = this.state
    promotionDetails.endDate = end
    this.setState({
      promotionDetails: {
        ...promotionDetails,
        endDate: end,
      },
    })
  }

  render() {
    const { promotionDetails } = this.state
    const { zone, assignedPrice, loggedInUser, promotionAlert } = this.props
    return (
      <div className="box-container">
        <div className="joint-form-large-table">
          <div className="store-requirement">
            <h3 className="center-h3">Requirements</h3>
            {promotionDetails.startDate.length === 0 && (
              <div className="unapproved-text">
                <ClearIcon className="icon-style" />
                <Typography variant="subtitle2" gutterBottom>
                  {startdate}
                </Typography>
              </div>
            )}
            {promotionDetails.startDate.length !== 0 && (
              <div className="approved-text">
                <CheckIcon className="icon-style" />
                <Typography variant="subtitle2" gutterBottom>
                  {startdate}
                </Typography>
              </div>
            )}
            {promotionDetails.endDate.length === 0 && (
              <div className="unapproved-text">
                <ClearIcon className="icon-style" />
                <Typography variant="subtitle2" gutterBottom>
                  {enddate}
                </Typography>
              </div>
            )}
            {promotionDetails.endDate.length !== 0 && (
              <div className="approved-text">
                <CheckIcon className="icon-style" />
                <Typography variant="subtitle2" gutterBottom>
                  {enddate}
                </Typography>
              </div>
            )}
            {promotionDetails.endDate <= promotionDetails.startDate && (
              <div className="unapproved-text">
                <ClearIcon className="icon-style" />
                <Typography variant="subtitle2" gutterBottom>
                  {datecheck}
                </Typography>
              </div>
            )}
            {promotionDetails.endDate > promotionDetails.startDate && (
              <div className="approved-text">
                <CheckIcon className="icon-style" />
                <Typography variant="subtitle2" gutterBottom>
                  {datecheck}
                </Typography>
              </div>
            )}
            {promotionDetails.promotionPercentage >= 0 && (
              <div className="unapproved-text">
                <ClearIcon className="icon-style" />
                <Typography variant="subtitle2" gutterBottom>
                  {promotioncheck}
                </Typography>
              </div>
            )}
            {promotionDetails.promotionPercentage < 0 && (
              <div className="approved-text">
                <CheckIcon className="icon-style" />
                <Typography variant="subtitle2" gutterBottom>
                  {promotioncheck}
                </Typography>
              </div>
            )}
          </div>

          <div className="form-center">
            <div className="flex-grid">
              <Typography className="card-header" variant="h4">
                Apply Percentage Promotion
              </Typography>
              <ProductDetailsTable />

              <div className="pt-10">
                <div className="pt-10">
                  {loggedInUser.userType === "admin" &&
                    promotionAlert.promotionHasBeenAppliedLast72hours === 1 ? (
                      <Alert severity="info">
                        A promotion was defined in the last 72 hours. Further
                        addition requires retailer approval
                      </Alert>
                    ) : (
                      ""
                    )}
                </div>

                <div className="pt-10">
                  {loggedInUser.userType === "admin" &&
                    promotionAlert.promotionAlreadyApplied === 1 ? (
                      <Alert severity="info"> Promotion already defined</Alert>
                    ) : (
                      ""
                    )}
                </div>
              </div>
              <Typography className="card-header" variant="h6">
                Selected Zone : {zone}
              </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                defaultValue="-1"
                required
                fullWidth="false"
                type="number"
                step="0.01"
                id="promotionPercentage"
                label="Promotion Percentage"
                name="promotionPercentage"
                autoComplete="promotionPercentage"
                onChange={this.handleChangePercentage}
                InputProps={{
                  inputProps: {
                    max: 0,
                    min: -99,
                  },
                }}
                autoFocus
              />
              <Typography className="card-header" variant="h6">
                Actual Price : {assignedPrice}
              </Typography>
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
                onChange={this.handleChangeStartDate}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="date"
                step="0.01"
                id="endDate-in-range"
                label="End Date"
                InputLabelProps={{ shrink: true, required: true }}
                name="endDate"
                autoComplete="endDate"
                onChange={this.handleChangeEndDate}
                autoFocus
              />
              {promotionDetails.endDate > promotionDetails.startDate &&
                promotionDetails.promotionPercentage < 0 && (
                  <Button
                    halfWidth
                    type="button"
                    variant="contained"
                    color="primary"
                    className="{classes.submit}"
                    onClick={this.handleSubmit}
                    style={{ marginTop: "10px" }}
                    id="apply-zone-percentage"
                  >
                    Apply Promotion to Zone
                  </Button>
                )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

DefinePromotionInZone.propTypes = {
  productName: PropTypes.string.isRequired,
  zone: PropTypes.string.isRequired,
  postPromotion: PropTypes.func.isRequired,
  history: PropTypes.shape.isRequired,
  assignedPrice: PropTypes.string.isRequired,
  loggedInUser: PropTypes.shape.isRequired,
  promotionAlert: PropTypes.shape.isRequired,
}
const stateAsProps = (store) => ({
  productDetails: store.RetailerReducer.productDetails,
  productName: store.RetailerReducer.productName,
  zone: store.RetailerReducer.zone,
  assignedPrice: store.RetailerReducer.assignedPrice,
  loggedInUser: store.RetailerReducer.loggedInUser,
  promotionAlert: store.AdminReducer.promotionAlert,
})

const actionAsProps = {
  postPromotion,
  getPromotionAlert,
}
export default connect(stateAsProps, actionAsProps)(DefinePromotionInZone)

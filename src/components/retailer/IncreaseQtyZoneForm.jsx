import { TextField, Typography, Button } from "@material-ui/core"
import React, { Component } from "react"
import CheckIcon from "@material-ui/icons/Check"
import ClearIcon from "@material-ui/icons/Clear"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Alert from "@material-ui/lab/Alert"
// import { spacing } from "@material-ui/system"
import {
  postPromotion,
  getZoneQuantity,
  updateZoneQuantity,
} from "../../redux/actions/RetailerActions"
import { getPromotionAlert } from "../../redux/actions/AdminActions"
import ProductDetailsTable from "../utils/ProductDetailsTable"
import { zonequantity } from "../utils/constants"
import convertCurrency from "../utils/ConvertCurrency"

class IncreaseQtyZoneForm extends Component {
  constructor(props) {
    super(props)
    const { zone, loggedInUser } = this.props

    this.state = {
      promotionDetails: {
        appliedDate: new Date().toISOString(),
        startDate: "",
        endDate: "",
        promotionPercentage: "",
        zoneName: zone,
        // eslint-disable-next-line prefer-template
        addedBy: loggedInUser.userName + "/" + loggedInUser.userType,
      },
      zoneQuantity: "",
      levelOption: "zone",
      checkDate: { appliedDate: new Date() },
    }

    this.handleChangeQuantity = this.handleChangeQuantity.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const {
      productName,
      zone,
      getPromotionAlert: getPromotionAlertAlt,
      getZoneQuantity: getZoneQuantityAlt,
    } = this.props
    getZoneQuantityAlt(productName, zone)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {
      productName,
      zone,
      updateZoneQuantity: updateZoneQuantityAlt,
      history,
    } = this.props
    const { zoneQuantity } = this.state
    // updateZoneQuantityAlt(productName, zone, zoneQuantity)
    history.push("/view/assigned/zones")
  }

  handleChangeQuantity(e) {
    this.setState({
      zoneQuantity: e.target.value,
    })
  }

  render() {
    const { promotionDetails, zoneQuantity } = this.state
    const {
      zone,
      assignedPrice,
      loggedInUser,
      promotionAlert,
      quantityAssignedAtZone,
      productDetails,
    } = this.props
    return (
      <div className="box-container">
        <div className="joint-form-large-table">
          <div className="store-requirement">
            <h3 className="center-h3">Requirements</h3>
            {zoneQuantity < productDetails.remainingQuantity && (
              <div className="approved-text">
                <ClearIcon className="icon-style" />
                <Typography variant="subtitle2" gutterBottom>
                  {zonequantity}
                </Typography>
              </div>
            )}
            {zoneQuantity > productDetails.remainingQuantity && (
              <div className="unapproved-text">
                <CheckIcon className="icon-style" />
                <Typography variant="subtitle2" gutterBottom>
                  {zonequantity}
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
              <Typography className="card-header" variant="h6">
                Selected Zone : {zone}
              </Typography>
              <Typography className="card-header" variant="h6">
                Actual Price :{" "}
                {sessionStorage.getItem("currency") === "USD"
                  ? `$ ${assignedPrice}`
                  : convertCurrency(
                      "USD",
                      sessionStorage.getItem("currency"),
                      assignedPrice
                    )}
              </Typography>
              <Typography className="card-header" variant="h6">
                Quantity Assigned : {quantityAssignedAtZone.quantityAssigned}
              </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                defaultValue="1"
                required
                fullWidth="false"
                type="number"
                step="0.01"
                id="zonequantity"
                label="Add Quantity"
                name="zonequantity"
                autoComplete="zonequantity"
                onChange={this.handleChangeQuantity}
                InputProps={{
                  inputProps: {
                    max: productDetails.remainingQuantity,
                    min: 1,
                  },
                }}
                autoFocus
              />
              {zoneQuantity < productDetails.remainingQuantity && (
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
                  Add Quantity to Zone
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

IncreaseQtyZoneForm.propTypes = {
  productName: PropTypes.string.isRequired,
  zone: PropTypes.string.isRequired,
  postPromotion: PropTypes.func.isRequired,
  history: PropTypes.shape.isRequired,
  assignedPrice: PropTypes.string.isRequired,
  loggedInUser: PropTypes.shape.isRequired,
  promotionAlert: PropTypes.shape.isRequired,
  getPromotionAlert: PropTypes.func.isRequired,
  getZoneQuantity: PropTypes.func.isRequired,
  quantityAssignedAtZone: PropTypes.shape.isRequired,
  productDetails: PropTypes.shape.isRequired,
  updateZoneQuantity: PropTypes.func.isRequired,
}
const stateAsProps = (store) => ({
  productDetails: store.RetailerReducer.productDetails,
  productName: store.RetailerReducer.productName,
  zone: store.RetailerReducer.zone,
  assignedPrice: store.RetailerReducer.assignedPrice,
  loggedInUser: store.RetailerReducer.loggedInUser,
  promotionAlert: store.AdminReducer.promotionAlert,
  quantityAssignedAtZone: store.RetailerReducer.quantityAssignedAtZone,
})

const actionAsProps = {
  postPromotion,
  getZoneQuantity,
  updateZoneQuantity,
}
export default connect(stateAsProps, actionAsProps)(IncreaseQtyZoneForm)

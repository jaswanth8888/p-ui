import { TextField, Typography, Button } from "@material-ui/core"
import React, { Component } from "react"
import CheckIcon from "@material-ui/icons/Check"
import ClearIcon from "@material-ui/icons/Clear"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import {
  postPromotion,
  getZoneQuantity,
} from "../../redux/actions/RetailerActions"
import { getPromotionAlert } from "../../redux/actions/AdminActions"
import ProductDetailsTable from "../utils/ProductDetailsTable"
import { promotioncheck } from "../utils/constants"
import convertCurrency from "../utils/ConvertCurrency"

class IncreaseQtyZoneForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      zoneQuantity: 0
    }

    this.handleChangeQuantity = this.handleChangeQuantity.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const {
      productName,
      zone,
      getZoneQuantity: getZoneQuantityAlt,
    } = this.props
    getZoneQuantityAlt(productName, zone)
  }

  handleSubmit = (e) => {
    // e.preventDefault()
    // const { postPromotion: postPromotionAlt, productName, history } = this.props
    // const { promotionDetails, levelOption } = this.state
    // postPromotionAlt(promotionDetails, productName, levelOption)
    // history.push("/view/promotions/zone")
  }

  handleChangeQuantity(e) {
    this.setState({
      zoneQuantity: e.target.value,
    })
  }

  render() {
    const {
      zone,
      assignedPrice,
      quantityAssignedAtZone,
      productDetails,
    } = this.props
    return (
      <div className="box-container">
        <div className="joint-form-large-table">
          <div className="store-requirement">
            <h3 className="center-h3">Requirements</h3>
          </div>

          <div className="form-center">
            <div className="flex-grid">
              <Typography className="card-header" variant="h4">
                Increase Quantity of Product in Zone
              </Typography>
              <ProductDetailsTable />
              <div className="card-subheader">
                <Typography variant="h6">Selected Zone : {zone}</Typography>
                <Typography variant="h6">
                  Actual Price :{" "}
                  {sessionStorage.getItem("currency") === "USD"
                    ? `$ ${assignedPrice}`
                    : convertCurrency(
                        "USD",
                        sessionStorage.getItem("currency"),
                        assignedPrice
                      )}
                </Typography>
                <Typography variant="h6">
                  Quantity Assigned : { quantityAssignedAtZone}
                </Typography>
              </div>
              <TextField
                variant="outlined"
                margin="normal"
                defaultValue="-1"
                required
                fullWidth="false"
                type="number"
                step="0.01"
                id="zonequantity"
                label="Zone Quantity"
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
              (
              <Button
                halfWidth
                type="button"
                variant="contained"
                color="primary"
                className="{classes.submit}"
                onClick={this.handleSubmit}
                style={{ marginTop: "10px" }}
                id="increase-quantity-zone"
              >
                Increase Quantity
              </Button>
              )
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
  assignedPrice: PropTypes.string.isRequired,
  getZoneQuantity: PropTypes.func.isRequired,
  quantityAssignedAtZone: PropTypes.string.isRequired,
  productDetails: PropTypes.shape.isRequired,
}
const stateAsProps = (store) => ({
  productDetails: store.RetailerReducer.productDetails,
  productName: store.RetailerReducer.productName,
  zone: store.RetailerReducer.zone,
  assignedPrice: store.RetailerReducer.assignedPrice,
  quantityAssignedAtZone: store.RetailerReducer.quantityAssignedAtZone,
})

const actionAsProps = {
  getZoneQuantity,
}
export default connect(stateAsProps, actionAsProps)(IncreaseQtyZoneForm)

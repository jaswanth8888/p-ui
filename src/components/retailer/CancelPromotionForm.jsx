import {
  InputLabel,
  TextField,
  Typography,
  Button,
  FormControl,
  Select,
} from "@material-ui/core"
import CheckIcon from "@material-ui/icons/Check"
import ClearIcon from "@material-ui/icons/Clear"
import React, { Component } from "react"
import { connect } from "react-redux"
import Autocomplete from "@material-ui/lab/Autocomplete"
import PropTypes from "prop-types"
import {
  getZones,
  getProductList,
  saveProductValue,
  saveZoneValue,
  getProductDetails,
} from "../../redux/actions/RetailerActions"
import {
  selectZone,
  selectProduct,
  cancelPromotionConst,
} from "../utils/constants"

class CancelPromotionForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      zone: "",
      productName: "",
    }
    this.handleChangeZone = this.handleChangeZone.bind(this)
    this.handleChangeProduct = this.handleChangeProduct.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const {
      getZones: getZonesAlt,
      getProductList: getProductListAlt,
    } = this.props
    getProductListAlt()
    getZonesAlt()
  }

  handleChangeProduct = (e, value) => {
    const {
      saveProductValue: saveProductValueAlt,
      getProductDetails: getProductDetailsAlt,
    } = this.props
    const productName = value
    this.setState({ productName })
    saveProductValueAlt(productName)
    getProductDetailsAlt(value)
  }

  handleChangeZone(e) {
    const { value } = e.target
    this.setState({ zone: value })
    const { saveZoneValue: saveZoneValueAlt } = this.props
    saveZoneValueAlt(value)
  }

  handleSubmit() {
    const { history } = this.props
    history.push("/cancel/productdetails")
  }

  render() {
    const { zones, products } = this.props
    const { productName, zone } = this.state
    return (
      <div className="box-container">
        <div className="joint-form">
          <div className="validation-half">
            <div className="validations">
              <h3 className="center-h3">Requirements</h3>
              {zone === "" && (
                <div className="typo-div">
                  <ClearIcon className="icon-style" />
                  <Typography variant="subtitle2" gutterBottom>
                    {selectZone}
                  </Typography>
                </div>
              )}
              {zone !== "" && (
                <div className="approved-text">
                  <CheckIcon className="icon-style" />
                  <Typography variant="subtitle2" gutterBottom>
                    {selectZone}
                  </Typography>
                </div>
              )}
              {productName === "" && (
                <div className="typo-div">
                  <ClearIcon className="icon-style" />
                  <Typography variant="subtitle2" gutterBottom>
                    {selectProduct}
                  </Typography>
                </div>
              )}
              {productName !== "" && (
                <div className="approved-text">
                  <CheckIcon className="icon-style" />
                  <Typography variant="subtitle2" gutterBottom>
                    {selectProduct}
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
                    className="help-block-h4"
                  >
                    {cancelPromotionConst}
                  </Typography>
                </div>
              </div>
              <FormControl variant="outlined" fullWidth>
                <Autocomplete
                  id="product-list"
                  fullWidth
                  options={products}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...params}
                      label="Product Name"
                      variant="outlined"
                    />
                  )}
                  onChange={this.handleChangeProduct}
                  name="productName"
                />
              </FormControl>
              <FormControl margin="normal" variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Enter Zone
                </InputLabel>
                <Select
                  fullWidth
                  native
                  value={zone}
                  onChange={this.handleChangeZone}
                  label="Enter Zone"
                  inputProps={{
                    name: "zone",
                    id: "zone",
                  }}
                >
                  <option aria-label="None" value="" />
                  {zones.map((zoneVal) => {
                    return <option value={zoneVal}>{zoneVal}</option>
                  })}
                </Select>
              </FormControl>
              {productName !== "" && zone !== "" && (
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="{classes.submit} submit-pad"
                  onClick={this.handleSubmit}
                  id="cluster-form-submit"
                >
                  Go
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

CancelPromotionForm.propTypes = {
  products: PropTypes.arrayOf.isRequired,
  zones: PropTypes.arrayOf.isRequired,
  getProductDetails: PropTypes.func.isRequired,
  saveProductValue: PropTypes.func.isRequired,
  getProductList: PropTypes.func.isRequired,
  getZones: PropTypes.func.isRequired,
  saveZoneValue: PropTypes.func.isRequired,
  history: PropTypes.shape.isRequired,
}
const stateAsProps = (store) => ({
  zones: store.RetailerReducer.zones,
  products: store.RetailerReducer.productList,
})
const actionAsProps = {
  getZones,
  getProductList,
  saveProductValue,
  getProductDetails,
  saveZoneValue,
}
export default connect(stateAsProps, actionAsProps)(CancelPromotionForm)

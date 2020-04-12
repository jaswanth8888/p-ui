import { InputLabel, TextField, Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
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

class WithdrawPromotionZoneForm extends Component {
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

  componentWillMount() {
    const {
      getAllZones: getAllZonesAlt,
      getProductList: getProductListAlt,
    } = this.props
    getAllZonesAlt()
    getProductListAlt()
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
    const { saveZoneValue: saveZoneValueAlt } = this.props
    this.setState({ zone: value })
    saveZoneValueAlt(value)
  }

  handleSubmit() {
    const { history } = this.props
    history.push("/withdraw/zoneproduct")
  }

  render() {
    const { zone, productName } = this.state
    const { products, zones } = this.props
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
                    Select a Zone Name
                  </Typography>
                </div>
              )}
              {zone !== "" && (
                <div className="approved-text">
                  <CheckIcon className="icon-style" />
                  <Typography variant="subtitle2" gutterBottom>
                    Select a Zone Name
                  </Typography>
                </div>
              )}
              {productName === "" && (
                <div className="typo-div">
                  <ClearIcon className="icon-style" />
                  <Typography variant="subtitle2" gutterBottom>
                    Select a Product Name
                  </Typography>
                </div>
              )}
              {productName !== "" && (
                <div className="approved-text">
                  <CheckIcon className="icon-style" />
                  <Typography variant="subtitle2" gutterBottom>
                    Select a Product Name
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
                    Withdraw Promotion Zone
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
                  Zone
                </InputLabel>
                <Select
                  ref="zone"
                  fullWidth
                  native
                  value={zone}
                  onChange={this.handleChangeZone}
                  label="Zone"
                  inputProps={{
                    name: "zone",
                    id: "zone",
                  }}
                >
                  <option aria-label="None" value="" />
                  {zones.map((zoneOption, index) => {
                    return (
                      <option value={zoneOption} key={index}>
                        {zoneOption}
                      </option>
                    )
                  })}
                </Select>
              </FormControl>
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
            </form>
          </div>
        </div>
      </div>
    )
  }
}
WithdrawPromotionZoneForm.propTypes = {
  zones: PropTypes.shape.isRequired,
  products: PropTypes.shape.isRequired,
  history: PropTypes.shape.isRequired,
  getAllZones: PropTypes.func.isRequired,
  getProductList: PropTypes.func.isRequired,
  saveProductValue: PropTypes.func.isRequired,
  getProductDetails: PropTypes.func.isRequired,
  saveZoneValue: PropTypes.func.isRequired,
}

const stateAsProps = (store) => ({
  zones: store.RetailerReducer.zones,
  products: store.RetailerReducer.productList,
})
const actionAsProps = {
  getAllZones: getZones,
  getProductList,
  saveProductValue,
  getProductDetails,
  saveZoneValue,
}
export default connect(stateAsProps, actionAsProps)(WithdrawPromotionZoneForm)

import { InputLabel, TextField, Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import CheckIcon from "@material-ui/icons/Check"
import ClearIcon from "@material-ui/icons/Clear"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React, { Component } from "react"
import Select from "@material-ui/core/Select"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import {
  getProductList,
  saveProductValue,
  getProductDetails,
  getZones,
  saveZoneValue,
} from "../../redux/actions/RetailerActions"

class ApplyPromotionInZone extends Component {
  constructor(props) {
    super(props)

    this.state = {
      productName: "",
      zone: "",
      // status: 0
    }
    this.handleChangeProduct = this.handleChangeProduct.bind(this)
    this.handleChangeZone = this.handleChangeZone.bind(this)
  }

  componentWillMount() {
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
    const { name, value } = e.target
    this.setState({ zone: value })
    const { saveZoneValue: saveZoneValueAlt } = this.props
    saveZoneValueAlt(value)
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

              {productName === "" && (
                <div style={{ display: "flex" }}>
                  <ClearIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    Select a product name
                  </Typography>
                </div>
              )}
              {productName !== "" && (
                <div style={{ display: "flex", color: "#ffc107" }}>
                  <CheckIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    Select a product name
                  </Typography>
                </div>
              )}
              {zone === "" && (
                <div style={{ display: "flex" }}>
                  <ClearIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    Select a zone name
                  </Typography>
                </div>
              )}
              {zone !== "" && (
                <div style={{ display: "flex", color: "#ffc107" }}>
                  <CheckIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    Select a zone name
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
                    Select product name and zone
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
                  {zones.map((zoneValue, index) => {
                    return (
                      <option value={zoneValue} key={index}>
                        {zoneValue}
                      </option>
                    )
                  })}
                </Select>
              </FormControl>

              {productName !== "" && zone !== "" && (
                <Link className="button-link" to="/definepromotion/zone">
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="{classes.submit} submit-pad"
                    onClick={this.handleSubmit}
                    id="apply-promotion-zone-submit"
                  >
                    Go
                  </Button>
                </Link>
              )}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

ApplyPromotionInZone.propTypes = {
  products: PropTypes.arrayOf.isRequired,
  zones: PropTypes.arrayOf.isRequired,
  getProductDetails: PropTypes.func.isRequired,
  saveProductValue: PropTypes.func.isRequired,
  getProductList: PropTypes.func.isRequired,
  getZones: PropTypes.func.isRequired,
  saveZoneValue: PropTypes.func.isRequired,
}

const stateAsProps = (store) => ({
  products: store.RetailerReducer.productList,
  zones: store.RetailerReducer.zones,
})
const actionAsProps = {
  getProductList,
  saveProductValue,
  getProductDetails,
  getZones,
  saveZoneValue,
}
export default connect(stateAsProps, actionAsProps)(ApplyPromotionInZone)

import { InputLabel, TextField, Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import CheckIcon from "@material-ui/icons/Check"
import ClearIcon from "@material-ui/icons/Clear"
import React, { Component } from "react"
import { connect } from "react-redux"
import Autocomplete from "@material-ui/lab/Autocomplete"
import {
  getZones,
  getProductList,
  saveProductValue,
  saveZoneValue,
  getProductDetails,
} from "../../redux/actions/RetailerActions"

class CancelPromotionForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      zone: "",
      productName: "",
      isSubmitted: false,
      status: 0,
    }
    this.handleChangeZone = this.handleChangeZone.bind(this)
    this.handleChangeProduct = this.handleChangeProduct.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    this.props.getAllZones()
    this.props.getProductList()
  }

  handleChangeProduct = (e, value) => {
    console.log(value)
    const productName = value
    this.setState({ productName })
    console.log(this.state.productName)
    this.props.saveProductValue(productName)
    this.props.getProductDetails(value)
  }

  handleChangeZone(e) {
    const { name, value } = e.target
    this.setState({ zone: value })
    console.log(value)
    this.props.saveZoneValue(value)
  }

  handleSubmit(e) {
    this.props.history.push("/cancel/productdetails")
  }

  render() {
    return (
      <div className="box-container">
        <div className="joint-form">
          <div className="validation-half">
            <div className="validations">
              <h3 className="center-h3">Requirements</h3>
              {this.state.zone === "" && (
                <div className="typo-div">
                  <ClearIcon className="icon-style" />
                  <Typography variant="subtitle2" gutterBottom>
                    Select a Zone Name
                  </Typography>
                </div>
              )}
              {this.state.zone !== "" && (
                <div className="approved-text">
                  <CheckIcon className="icon-style" />
                  <Typography variant="subtitle2" gutterBottom>
                    Select a Zone Name
                  </Typography>
                </div>
              )}
              {this.state.productName === "" && (
                <div className="typo-div">
                  <ClearIcon className="icon-style" />
                  <Typography variant="subtitle2" gutterBottom>
                    Select a Product Name
                  </Typography>
                </div>
              )}
              {this.state.productName !== "" && (
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
                    Cancel Promotion
                  </Typography>
                </div>
              </div>
              <FormControl variant="outlined" fullWidth>
                <Autocomplete
                  id="product-list"
                  fullWidth
                  options={this.props.products}
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
                  Enter Zone
                </InputLabel>
                <Select
                  ref="zone"
                  fullWidth
                  native
                  value={this.state.zone}
                  onChange={this.handleChangeZone}
                  label="Enter Zone"
                  inputProps={{
                    name: "zone",
                    id: "zone",
                  }}
                >
                  <option aria-label="None" value="" />
                  {this.props.zones.map((zone, index) => {
                    return (
                      <option value={zone} key={index}>
                        {zone}
                      </option>
                    )
                  })}
                </Select>
              </FormControl>
              {this.state.productName !== "" && this.state.zone !== "" && (
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
export default connect(stateAsProps, actionAsProps)(CancelPromotionForm)

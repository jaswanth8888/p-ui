import {
  InputLabel,
  TextField,
  Typography,
  Button,
  FormControl,
  InputAdornment,
  MenuItem,
} from "@material-ui/core"
import CheckIcon from "@material-ui/icons/Check"
import ClearIcon from "@material-ui/icons/Clear"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { connect } from "react-redux"
import Select from "@material-ui/core/Select"
import Message from "./Message"

import { postProduct } from "../../redux/actions/VendorActions"

class AddProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: {
        productName: "",
        companyName: "",
        productCategory: "",
        productBasePrice: "",
        initialQuantity: "",
        uom: "",
        productDescription: "",
        productGroup: "",
        abv: "",
        volume: "",
        productImagePath: "",
      },
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const { name, value } = e.target
    const { product } = this.state
    product[name] = value
    this.setState({ product })
  }

  handleSubmit() {
    const { product } = this.state
    const { productName, productBasePrice, initialQuantity } = product
    const test = this.props
    if (
      productName &&
      productBasePrice > 0 &&
      initialQuantity > 1 &&
      initialQuantity < 100
    ) {
      test.postProduct(product)
    }
  }

  render() {
    if (sessionStorage.getItem("token") != null) {
      const { product } = this.state
      const {
        productName,
        productBasePrice,
        initialQuantity,
        productCategory,
        productDescription,
        productImagePath,
        abv,
        volume,
        companyName,
        uom,
      } = product
      return (
        <div className="box-container">
          <div className="joint-form">
            <div className="validation-half">
              <div className="validations">
                <h3>Requirements</h3>
                {product.productName.length <= 0 && (
                  <div className="typo-div">
                    <ClearIcon className="icon-style" />
                    <Typography variant="subtitle2" gutterBottom>
                      Name cannot be empty
                    </Typography>
                  </div>
                )}
                {product.productName.length > 0 && (
                  <div className="approved-text">
                    <CheckIcon className="icon-style" />
                    <Typography variant="subtitle2" gutterBottom>
                      Name cannot be empty
                    </Typography>
                  </div>
                )}
                {product.productBasePrice < 1 && (
                  <div className="typo-div">
                    <ClearIcon className="icon-style" />
                    <Typography variant="subtitle2" gutterBottom>
                      Base price must be greater than 0
                    </Typography>
                  </div>
                )}
                {product.productBasePrice > 0 && (
                  <div className="approved-text">
                    <CheckIcon className="icon-style" />
                    <Typography variant="subtitle2" gutterBottom>
                      Base price must be greater than 0
                    </Typography>
                  </div>
                )}
                {product.initialQuantity < 1 && (
                  <div className="typo-div">
                    <ClearIcon className="icon-style" />
                    <Typography variant="subtitle2" gutterBottom>
                      Minimum quantity should be 1
                    </Typography>
                  </div>
                )}
                {product.initialQuantity > 0 && (
                  <div className="approved-text">
                    <CheckIcon className="icon-style" />
                    <Typography variant="subtitle2" gutterBottom>
                      Minimum quantity should be 1
                    </Typography>
                  </div>
                )}
                {product.productCategory === "ALCOHOL_PROD" &&
                  product.initialQuantity < 101 && (
                    <div className="approved-text">
                      <CheckIcon className="icon-style" />
                      <Typography variant="subtitle2" gutterBottom>
                        Maximum quantity of ALCOHOL should be 100
                      </Typography>
                    </div>
                  )}
                {product.productCategory === "ALCOHOL_PROD" &&
                  product.initialQuantity > 100 && (
                    <div className="typo-div">
                      <ClearIcon className="icon-style" />
                      <Typography variant="subtitle2" gutterBottom>
                        Maximum quantity of ALCOHOL should be 100
                      </Typography>
                    </div>
                  )}
                {product.productCategory === "ALCOHOL_PROD" && product.abv > 0 && (
                  <div className="approved-text">
                    <CheckIcon className="icon-style" />
                    <Typography variant="subtitle2" gutterBottom>
                      ABV Should be greater than 0
                    </Typography>
                  </div>
                )}
                {product.productCategory === "ALCOHOL_PROD" &&
                  product.abv <= 0 && (
                    <div className="typo-div">
                      <ClearIcon className="icon-style" />
                      <Typography variant="subtitle2" gutterBottom>
                        ABV should be greater than 0
                      </Typography>
                    </div>
                  )}
                {product.productCategory === "ALCOHOL_PROD" &&
                  product.volume > 0 && (
                    <div className="approved-text">
                      <CheckIcon className="icon-style" />
                      <Typography variant="subtitle2" gutterBottom>
                        Volume should be greater than 0
                      </Typography>
                    </div>
                  )}
                {product.productCategory === "ALCOHOL_PROD" &&
                  product.volume <= 0 && (
                    <div className="typo-div">
                      <ClearIcon className="icon-style" />
                      <Typography variant="subtitle2" gutterBottom>
                        Volume should be greater than 0
                      </Typography>
                    </div>
                  )}
                {product.productCategory === "BABY_PROD" &&
                  product.initialQuantity < 501 && (
                    <div className="approved-text">
                      <CheckIcon className="icon-style" />
                      <Typography variant="subtitle2" gutterBottom>
                        Maximum quantity of BabyProducts should be 500
                      </Typography>
                    </div>
                  )}
                {product.productCategory === "BABY_PROD" &&
                  product.initialQuantity > 500 && (
                    <div className="typo-div">
                      <ClearIcon className="icon-style" />
                      <Typography variant="subtitle2" gutterBottom>
                        Maximum quantity of BabyProducts should be 500
                      </Typography>
                    </div>
                  )}
              </div>
            </div>
            <div className="form-half" id="add-prods-form">
              <form className="{classes.form}" noValidate>
                <div>
                  <div className="help-block">
                    <Typography
                      color="primary"
                      component="h1"
                      variant="h4"
                      className="help-block-h4"
                    >
                      AddProduct
                    </Typography>
                  </div>
                </div>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="productName"
                  label="ProductName"
                  name="productName"
                  autoComplete="productName"
                  onChange={this.handleChange}
                  value={productName}
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="companyName"
                  label="companyName"
                  name="companyName"
                  autoComplete="companyName"
                  onChange={this.handleChange}
                  value={companyName}
                  autoFocus
                />
                <FormControl
                  variant="outlined"
                  fullWidth
                  className="space-margin-top"
                >
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Product Category
                  </InputLabel>
                  <Select
                    labelId="productCategory"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    required
                    name="productCategory"
                    label="productCategory"
                    onChange={this.handleChange}
                    id="select-product"
                  >
                    <MenuItem value="ALCOHOL_PROD">ALCOHOL_PROD</MenuItem>
                    <MenuItem value="BABY_PROD">BABY_PROD</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="number"
                  id="initialQuantity"
                  label="quantity"
                  name="initialQuantity"
                  autoComplete="initialQuantity"
                  onChange={this.handleChange}
                  value={initialQuantity}
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="number"
                  id="productBasePrice"
                  label="Product base price"
                  name="productBasePrice"
                  autoComplete="productBasePrice"
                  onChange={this.handleChange}
                  value={productBasePrice}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  autoFocus
                />

                {productCategory === "ALCOHOL_PROD" && (
                  <div>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      type="number"
                      id="abv"
                      label="abv"
                      name="abv"
                      autoComplete="abv"
                      onChange={this.handleChange}
                      value={abv}
                      autoFocus
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      type="number"
                      id="volume"
                      label="volume"
                      name="volume"
                      autoComplete="volume"
                      onChange={this.handleChange}
                      value={volume}
                      autoFocus
                    />
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Units Of Measuremment
                    </InputLabel>
                    <Select
                      labelId="uom"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      required
                      name="uom"
                      label="uom"
                      value={uom}
                      id="alc-prod"
                      onChange={this.handleChange}
                    >
                      <MenuItem value="Lts">LTS</MenuItem>
                      <MenuItem value="GALLONs">GALLONS</MenuItem>
                      <MenuItem value="ML">ML </MenuItem>
                    </Select>
                  </div>
                )}
                {productCategory === "BABY_PROD" && (
                  <div>
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Units Of Measuremment
                    </InputLabel>

                    <Select
                      labelId="uom"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      required
                      name="uom"
                      label="uom"
                      onChange={this.handleChange}
                      value={uom}
                      id="baby-prod"
                    >
                      <MenuItem value="KGs">KGs</MenuItem>
                      <MenuItem value="Pounds">Pounds</MenuItem>
                    </Select>
                  </div>
                )}

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="productImagePath"
                  label="Product image path"
                  name="productImagePath"
                  autoComplete="productImagePath"
                  onChange={this.handleChange}
                  value={productImagePath}
                  autoFocus
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Product description"
                  name="productDescription"
                  autoComplete="productDescription"
                  onChange={this.handleChange}
                  value={productDescription}
                  aria-label="minimum height"
                  rowsMin={3}
                  placeholder="product discription"
                />

                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="{classes.submit}"
                  onClick={this.handleSubmit}
                  id="submit-prods"
                >
                  Save
                </Button>
              </form>
              <Message />
            </div>
          </div>
        </div>
      )
    }
    return true
  }
}

AddProduct.propTypes = {
  postProduct: PropTypes.func.isRequired,
}

const actionAsProps = {
  postProduct,
}
export default connect(null, actionAsProps)(AddProduct)

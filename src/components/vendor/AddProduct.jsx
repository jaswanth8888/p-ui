import { InputLabel, TextField, Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import CheckIcon from "@material-ui/icons/Check"
import ClearIcon from "@material-ui/icons/Clear"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import MenuItem from "@material-ui/core/MenuItem"

import Select from "@material-ui/core/Select"
import InputAdornment from "@material-ui/core/InputAdornment"

import TextareaAutosize from "@material-ui/core/TextareaAutosize"

import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
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
      isSubmitted: false,
      isPosted: false,
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
    const { productName } = product
    const { productBasePrice } = product
    const { initialQuantity } = product
    const test = this.props
    this.setState({ isSubmitted: true })
    if (
      productName &&
      productBasePrice > 0 &&
      initialQuantity > 1 &&
      initialQuantity < 100
    ) {
      test.postProduct(product)
      this.setState({ isPosted: true })
    }
  }

  render() {
    if (sessionStorage.getItem("token") != null) {
      const { isPosted } = this.state
      const { product } = this.state
      const { productName } = product
      const { productBasePrice } = product
      const { initialQuantity } = product
      const { productCategory } = product
      const { productDescription } = product
      const { productImagePath } = product
      const { abv } = product
      const { volume } = product
      const { companyName } = product
      const { uom } = product
      const { isSubmitted } = this.state
      if (isPosted) {
        return <Redirect to="/vendor/home" />
      }
      return (
        <Container
          display="flex"
          justifyContent="center"
          borderRadius="borderRadius"
          marginTop="50px"
        >
          <Box
            display="flex"
            justifyContent="center"
            borderRadius="borderRadius"
          >
            <div className="validation-half">
              <div className="validations">
                {isSubmitted && (
                  <h3 style={{ textAlign: "center" }}>Requirements</h3>
                )}

                {isSubmitted && !productName && (
                  <div style={{ display: "flex", color: "#ffc107" }}>
                    <ClearIcon
                      style={{ paddingRight: "5px", marginTop: "-2px" }}
                    />
                    <Typography variant="subtitle2" gutterBottom>
                      name cannot be empty
                    </Typography>
                  </div>
                )}
                {isSubmitted && productBasePrice < 1 && (
                  <div style={{ display: "flex", color: "#ffc107" }}>
                    <CheckIcon
                      style={{ paddingRight: "5px", marginTop: "-2px" }}
                    />
                    <Typography variant="subtitle2" gutterBottom>
                      base price must be greater than 0
                    </Typography>
                  </div>
                )}
                {isSubmitted && initialQuantity < 1 && (
                  <div style={{ display: "flex", color: "#ffc107" }}>
                    <CheckIcon
                      style={{ paddingRight: "5px", marginTop: "-2px" }}
                    />
                    <Typography variant="subtitle2" gutterBottom>
                      minimum quantity should be 1
                    </Typography>
                  </div>
                )}
                {isSubmitted &&
                  productCategory === "ALCOHOL_PROD" &&
                  initialQuantity > 100 && (
                    <div style={{ display: "flex", color: "#ffc107" }}>
                      <CheckIcon
                        style={{ paddingRight: "5px", marginTop: "-2px" }}
                      />
                      <Typography variant="subtitle2" gutterBottom>
                        maximum quantity of ALCOHOL should be 100
                      </Typography>
                    </div>
                  )}
                {isSubmitted &&
                  productCategory === "BABY_PROD" &&
                  initialQuantity > 500 && (
                    <div style={{ display: "flex", color: "#ffc107" }}>
                      <CheckIcon
                        style={{ paddingRight: "5px", marginTop: "-2px" }}
                      />
                      <Typography variant="subtitle2" gutterBottom>
                        maximum quantity of BabyProducts should be 500
                      </Typography>
                    </div>
                  )}
              </div>
            </div>
            <div className="form-half">
              <form className="{classes.form}" noValidate>
                <div>
                  <div className="help-block">
                    <Typography color="primary" component="h1" variant="h4">
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
                  label="productBasePrice"
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
                  label="productImagePath"
                  name="productImagePath"
                  autoComplete="productImagePath"
                  onChange={this.handleChange}
                  value={productImagePath}
                  autoFocus
                />

                <TextareaAutosize
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="productDescription"
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
                  style={{ marginTop: "30px" }}
                  onClick={this.handleSubmit}
                  id="submit-prods"
                >
                  Save
                </Button>
              </form>
            </div>
          </Box>
        </Container>
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

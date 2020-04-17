/* eslint-disable react/no-unused-state */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Typography, Paper, Table, TextField } from "@material-ui/core"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Button from "@material-ui/core/Button"
import Alert from "@material-ui/lab/Alert"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import {
  getProductDetails,
  isPromotionApplied,
  updateProduct,
} from "../../redux/actions/RetailerActions"
import Message from "../utils/Message"

class EditItemPrice extends Component {
  constructor(props) {
    super(props)
    const { productDetails } = this.props
    this.state = {
      updatedProduct: {
        productName: productDetails.productName,
        newQuantity: 0,
        newBasePrice: productDetails.productBasePrice,
      },
    }
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
    this.handlePriceChange = this.handlePriceChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const {
      productName,
      getProductDetails: getProductDetailsAlt,
      isPromotionApplied: promotionapplied,
    } = this.props
    getProductDetailsAlt(productName)
    promotionapplied(productName)
  }

  handleQuantityChange(e) {
    const { value } = e.target
    const { updatedProduct } = this.state
    updatedProduct.newQuantity = value
    this.setState({
      updatedProduct: {
        ...updatedProduct,
        newQuantity: value,
      },
    })
  }

  handlePriceChange(e) {
    const { value } = e.target
    const { updatedProduct } = this.state
    updatedProduct.newBasePrice = value
    this.setState({
      updatedProduct: {
        ...updatedProduct,
        newBasePrice: value,
      },
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const { updatedProduct } = this.state
    const { updateProduct: updateProductAlt } = this.props
    updateProductAlt(updatedProduct, updatedProduct.productName)
  }

  render() {
    const { productDetails } = this.props
    const { isPromotion } = this.props
    const { updatedProduct } = this.state
    return (
      <div className="box-container">
        <div className="joint-form-large-table">
          <div className="form-center">
            <div className="flex-grid">
              <div className="product-name">
                <Message />
                <Typography className="card-header" variant="h5">
                  Product Name : {productDetails.productName}
                </Typography>
              </div>
              <TableContainer component={Paper}>
                <Table aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product Image</TableCell>
                      <TableCell>Product Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <tbody>
                    <TableRow>
                      <TableCell>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={productDetails.productImagePath}
                        >
                          <img
                            className="thumbnail"
                            src={productDetails.productImagePath}
                            alt="none"
                          />
                        </a>
                      </TableCell>
                      <TableCell>{productDetails.productDescription}</TableCell>
                    </TableRow>
                  </tbody>
                </Table>
              </TableContainer>
              <Typography className="card-header" variant="h6">
                Product Category: {productDetails.productCategory}
              </Typography>
              <Typography className="card-header" variant="h6">
                productBasePrice: {productDetails.productBasePrice}
              </Typography>
              {isPromotion && (
                <div>
                  <Alert
                    severity="info"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                  >
                    Sorry you cannot change the price
                  </Alert>
                </div>
              )}
              {!isPromotion && (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="number"
                  id="BasePrice"
                  label="BasePrice"
                  InputLabelProps={{ shrink: true, required: true }}
                  name="newBasePrice"
                  autoComplete="newBasePrice"
                  autoFocus
                  value={updatedProduct.newBasePrice}
                  onChange={this.handlePriceChange}
                />
              )}
              <Typography className="card-header" variant="h5">
                Units of Measurement: {productDetails.uom}
              </Typography>
              <Typography className="card-header" variant="h5">
                Quantity: {productDetails.initialQuantity}
              </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="number"
                id="newQuantity"
                label="New Quantity"
                InputLabelProps={{ shrink: true, required: true }}
                name="newQuantity"
                autoComplete="newQuantity"
                autoFocus
                value={updatedProduct.newQuantity}
                onChange={this.handleQuantityChange}
              />
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
                Update
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

EditItemPrice.propTypes = {
  getProductDetails: PropTypes.func.isRequired,
  isPromotionApplied: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
  productName: PropTypes.string.isRequired,
  productDetails: PropTypes.shape.isRequired,
  isPromotion: PropTypes.bool.isRequired,
}

const stateAsProps = (store) => ({
  productDetails: store.RetailerReducer.productDetails,
  productName: store.RetailerReducer.productName,
  isPromotion: store.RetailerReducer.isPromotion,
})
const actionsAsProps = {
  getProductDetails,
  isPromotionApplied,
  updateProduct,
}
export default connect(stateAsProps, actionsAsProps)(EditItemPrice)

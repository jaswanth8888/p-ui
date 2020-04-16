import React, { Component } from "react"
import connect from "react-redux/es/connect/connect"
import { Typography, Paper, Table } from "@material-ui/core"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import PropTypes from "prop-types"

import { getProductDetails } from "../../redux/actions/RetailerActions"

class ProductDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      effectivePriceObjAlt: {},
    }
  }

  componentDidMount() {
    const { productName, getProductDetails: getProductDetailsAlt } = this.props
    getProductDetailsAlt(productName)
    const { productDetails } = this.props
    this.state.effectivePriceObjAlt = productDetails.effectivePriceObj
  }

  render() {
    const { productDetails } = this.props
    const { effectivePriceObjAlt } = this.state
    return (
      <div className="flex-grid">
        <div className="product-name">
          <Typography className="card-header" variant="h4">
            {productDetails.productName}
          </Typography>
        </div>
        <div className="product-image">
          <img src={productDetails.productImagePath} alt="none" />
        </div>
        <div className="product-table-data">
          <TableContainer component={Paper} className="product-table">
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow className="product-details-row">
                  <TableCell className="table-text">Base</TableCell>
                  <TableCell className="table-text">Vendor</TableCell>
                </TableRow>
              </TableHead>
              <TableRow>
                <TableCell className="table-text">
                  {productDetails.productBasePrice}
                </TableCell>
                <TableCell className="table-text">
                  {productDetails.companyName}
                </TableCell>
              </TableRow>
              <TableHead>
                <TableRow className="product-details-row">
                  <TableCell className="table-text">Quantity</TableCell>
                  <TableCell className="table-text">Category</TableCell>
                </TableRow>
              </TableHead>
              <TableRow>
                <TableCell className="table-text">
                  {productDetails.remainingQuantity}
                </TableCell>
                <TableCell className="table-text">
                  {productDetails.productCategory}
                </TableCell>
              </TableRow>
              <TableHead>
                <TableRow className="product-details-row">
                  <TableCell className="table-text">Effective Price</TableCell>
                  <TableCell className="table-text">
                    {effectivePriceObjAlt.effectivePrice}
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </div>
        <div className="product-desc">
          <Typography variant="body2">
            {productDetails.productDescription}
          </Typography>
        </div>
      </div>
    )
  }
}

ProductDetails.propTypes = {
  getProductDetails: PropTypes.func.isRequired,

  productName: PropTypes.string.isRequired,
  productDetails: PropTypes.shape.isRequired,
}

const stateAsProps = (store) => ({
  productDetails: store.RetailerReducer.productDetails,
  productName: store.RetailerReducer.productName,
})
const actionsAsProps = {
  getProductDetails,
}
export default connect(stateAsProps, actionsAsProps)(ProductDetails)

import React, { Component } from "react"
import connect from "react-redux/es/connect/connect"
import { Typography, Paper, Table } from "@material-ui/core"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import PropTypes from "prop-types"
import {productDetails} from "./constants"
import { getProductDetails } from "../../redux/actions/RetailerActions"

class ProductDetailsTable extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    const { productName, getProductDetails: getProductDetailsAlt } = this.props
    getProductDetailsAlt(productName)
  }

  render() {
    const { productDetails } = this.props
    return (
      <div className="flex-grid">
        <div className="product-name">
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
        <TableContainer component={Paper}>
          <Table aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Vendor Name</TableCell>
                <TableCell>Vendor Price(Base)</TableCell>
                <TableCell>Product Price</TableCell>
                <TableCell>Initial Quantity</TableCell>
                <TableCell>Existing Quantity</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>UOM</TableCell>
                {/* {productDetails.map(
                        (tcell) => 
                        <TableCell>{ tcell }</TableCell>

                      )} */}
              </TableRow>
            </TableHead>
            <tbody>
              <TableRow>
                <TableCell>{productDetails.companyName}</TableCell>
                <TableCell>{productDetails.productBasePrice}</TableCell>
                <TableCell>{productDetails.effectivePrice}</TableCell>
                <TableCell>{productDetails.initialQuantity}</TableCell>
                <TableCell>{productDetails.remainingQuantity}</TableCell>
                <TableCell>{productDetails.productCategory}</TableCell>
                <TableCell>{productDetails.uom}</TableCell>
              </TableRow>
            </tbody>
          </Table>
        </TableContainer>
      </div>
    )
  }
}

ProductDetailsTable.propTypes = {
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
export default connect(stateAsProps, actionsAsProps)(ProductDetailsTable)

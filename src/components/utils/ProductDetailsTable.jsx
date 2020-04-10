import React, { Component } from "react"
import connect from "react-redux/es/connect/connect"
import { Typography, Paper, Table } from "@material-ui/core"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import PropTypes from "prop-types"

import { getProductDetails } from "../../redux/actions/RetailerActions"

class ProductDetailsTable extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    this.props.getProductDetails(this.props.productName)
  }

  render() {
    return (
      <div className="flex-grid">
        <div className="product-name">
          <Typography className="card-header" variant="h5">
            Product Name : {this.props.productDetails.productName}
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
                    href={this.props.productDetails.productImagePath}
                  >
                    <img
                      className="thumbnail"
                      src={this.props.productDetails.productImagePath}
                      alt="none"
                    />
                  </a>
                </TableCell>
                <TableCell>
                  {this.props.productDetails.productDescription}
                </TableCell>
              </TableRow>
            </tbody>
          </Table>
        </TableContainer>
        <br />
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
              </TableRow>
            </TableHead>
            <tbody>
              <TableRow>
                <TableCell>{this.props.productDetails.companyName}</TableCell>
                <TableCell>
                  {this.props.productDetails.productBasePrice}
                </TableCell>
                <TableCell>
                  {this.props.productDetails.effectivePrice}
                </TableCell>
                <TableCell>
                  {this.props.productDetails.initialQuantity}
                </TableCell>
                <TableCell>
                  {this.props.productDetails.remainingQuantity}
                </TableCell>
                <TableCell>
                  {this.props.productDetails.productCategory}
                </TableCell>
                <TableCell>{this.props.productDetails.uom}</TableCell>
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

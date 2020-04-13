import { Table, Typography } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import {
  getProductDetails,
  resetStatusCode,
} from "../../redux/actions/RetailerActions"
import ProductDetails from "../utils/ProductDetails"

class ViewAssignedZones extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentWillMount() {
    const { getProductDetails: getProductDetailsAlt, productName } = this.props
    getProductDetailsAlt(productName)
  }

  render() {
    const { productDetails, resetStatusCode: resetStatusCodeAlt } = this.props
    return (
      <div className="box-container-start">
        {resetStatusCodeAlt()}
        <div className="">
          <ProductDetails />
        </div>

        <TableContainer component={Paper}>
          <Table aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Zone Name</TableCell>
                <TableCell>Quantity Assigned</TableCell>
                <TableCell>Profit Percentage</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <tbody>
              {productDetails.assignProduct.map((zone) => {
                return (
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1" gutterBottom>
                        {zone.zoneName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" gutterBottom>
                        {zone.quantityAssigned}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" gutterBottom>
                        {zone.profitPercentage}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" gutterBottom>
                        {zone.price}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )
              })}
            </tbody>
          </Table>
        </TableContainer>
      </div>
    )
  }
}

ViewAssignedZones.propTypes = {
  resetStatusCode: PropTypes.func.isRequired,
  productDetails: PropTypes.shape.isRequired,
  getProductDetails: PropTypes.func.isRequired,
  productName: PropTypes.string.isRequired,
}

const stateAsProps = (store) => ({
  productDetails: store.RetailerReducer.productDetails,
  productName: store.RetailerReducer.productName,
})
const actionAsProps = {
  getProductDetails,
  resetStatusCode,
}
export default connect(stateAsProps, actionAsProps)(ViewAssignedZones)

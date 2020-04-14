import { Typography, Paper } from "@material-ui/core"
import React, { Component } from "react"
import { connect } from "react-redux"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Table from "@material-ui/core/Table"
import PropTypes from "prop-types"
import { getProductDetails } from "../../redux/actions/RetailerActions"
import ProductDetailsTable from "../utils/ProductDetailsTable"
import { viewZonePromotions } from "../utils/constants"

class ViewZonePromotions extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const { getProductDetails: getProductDetailsAlt, productName } = this.props
    getProductDetailsAlt(productName)
  }

  render() {
    const { productDetails } = this.props
    const zoneData = productDetails.assignProduct
    const tableRowElm = (zone) => {
      return zone.promotions.map((promotion) => (
        <TableRow key={promotion.promotionId}>
          <TableCell>
            <Typography variant="subtitle1" gutterBottom>
              {promotion.appliedDate.slice(0, 10)}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle1" gutterBottom>
              {promotion.promotionPercentage}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle1" gutterBottom>
              {promotion.promotionSellingPrice}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle1" gutterBottom>
              {promotion.startDate.slice(0, 10)}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle1" gutterBottom>
              {promotion.endDate.slice(0, 10)}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle1" gutterBottom>
              Zone
            </Typography>
          </TableCell>
          <TableCell>
            {promotion.cancelledDate !== null && (
              <Typography variant="subtitle1" gutterBottom>
                {promotion.cancelledDate.slice(0, 10)}
              </Typography>
            )}
          </TableCell>
        </TableRow>
      ))
    }

    return (
      <div className="box-container">
        <div className="joint-form-large-table">
          <div className="form-center">
            <div className="flex-grid">
              <ProductDetailsTable />

              <Typography className="card-header" variant="h6">
                Promotions in zone level
              </Typography>

              <TableContainer component={Paper}>
                <Table aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      {/* <TableCell>Promotion Applied Date</TableCell>
                      <TableCell>Promotion Percentage</TableCell>
                      <TableCell>Promotion Selling Price</TableCell>
                      <TableCell>Promotion From Date</TableCell>
                      <TableCell>Promotion To Date</TableCell>
                      <TableCell>Promotion Level</TableCell>
                      <TableCell>Promotion Cancelled Date</TableCell> */}
                      {viewZonePromotions.map((tcell) => (
                        <TableCell>{tcell}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <tbody>{zoneData.map((zone) => tableRowElm(zone))}</tbody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ViewZonePromotions.propTypes = {
  productName: PropTypes.string.isRequired,
  productDetails: PropTypes.shape.isRequired,
  getProductDetails: PropTypes.func.isRequired,
}

const stateAsProps = (store) => ({
  productDetails: store.RetailerReducer.productDetails,
  productName: store.RetailerReducer.productName,
})

const actionAsProps = {
  getProductDetails,
}
export default connect(stateAsProps, actionAsProps)(ViewZonePromotions)

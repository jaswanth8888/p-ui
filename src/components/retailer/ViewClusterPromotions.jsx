import { TextField, Typography, Paper } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import React, { Component } from "react"
import { connect } from "react-redux"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Table from "@material-ui/core/Table"
import { getProductDetails } from "../../redux/actions/RetailerActions"
import ProductDetailsTable from "../utils/ProductDetailsTable"

class ViewClusterPromotions extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentWillMount() {
    this.props.getProductDetails(this.props.productName)
  }

  render() {
    const zoneData = this.props.productDetails.assignProduct
    const tableRowElm = (zone) => {
      return zone.promotions.map((promotion) => (
        <TableRow key={promotion.promotionId}>
          <TableCell>
            <Typography variant="subtitle1" gutterBottom>
              {promotion.promotionPercentage}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle1" gutterBottom>
              {this.props.productDetails.effectivePrice}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle1" gutterBottom>
              {promotion.startDate}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle1" gutterBottom>
              {promotion.endDate}
            </Typography>
          </TableCell>
        </TableRow>
      ))
    }

    return (
      <div className="box-container">
        <div className="joint-form">
          <div className="form-center">
            <div className="flex-grid">
              <ProductDetailsTable />
              <br />
              <Typography className="card-header" variant="h6">
                Promotions in cluster level
              </Typography>

              <TableContainer component={Paper}>
                <Table aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Promotion Percentage</TableCell>
                      <TableCell>Actual Price</TableCell>
                      <TableCell>Promotion From Date</TableCell>
                      <TableCell>Promotion To Date</TableCell>
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

const stateAsProps = (store) => ({
  productDetails: store.RetailerReducer.productDetails,
  productName: store.RetailerReducer.productName,
})

const actionAsProps = {
  getProductDetails,
}
export default connect(stateAsProps, actionAsProps)(ViewClusterPromotions)

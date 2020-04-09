import { TextField, Typography, Paper } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import React, { Component } from "react"
import { connect } from "react-redux"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Table from "@material-ui/core/Table"
import {
  getProductDetails,
  getPromotionsIncluster,
} from "../../redux/actions/RetailerActions"
import ProductDetailsTable from "../utils/ProductDetailsTable"

class ViewClusterPromotions extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentWillMount() {
    this.props.getPromotionsIncluster(
      this.props.productName,
      this.props.zone,
      this.props.cluster
    )
  }

  render() {
    return (
      <div className="box-container">
        <div className="joint-form-large-table">
          <div className="form-center">
            <div className="flex-grid">
              <ProductDetailsTable />
              <br />
              <Typography className="card-header" variant="h6">
                Promotions in Cluster level
              </Typography>

              <TableContainer component={Paper}>
                <Table aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Promotion Applied Date</TableCell>
                      <TableCell>Promotion Percentage</TableCell>
                      <TableCell>Promotion Selling Price</TableCell>
                      <TableCell>Promotion From Date</TableCell>
                      <TableCell>Promotion To Date</TableCell>
                      <TableCell>Promotion Level</TableCell>
                      <TableCell>Promotion Cancelled Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <tbody>
                    {this.props.clusterPromotions.map((promotion) => (
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
                            Cluster
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
                    ))}
                  </tbody>
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
  zone: store.RetailerReducer.zone,
  cluster: store.RetailerReducer.cluster,
  clusterPromotions: store.RetailerReducer.clusterPromotions,
})

const actionAsProps = {
  getProductDetails,
  getPromotionsIncluster,
}
export default connect(stateAsProps, actionAsProps)(ViewClusterPromotions)

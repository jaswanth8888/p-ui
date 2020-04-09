import { Table, Typography } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import React, { Component } from "react"
import { connect } from "react-redux"

import Button from "@material-ui/core/Button"
import { getProductDetails } from "../../redux/actions/RetailerActions"
import ProductDetailsTable from "../utils/ProductDetailsTable"

class WithdrawClusterPromotion extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: new Date().toISOString().slice(0, 10),
      details: {},
      levelOption: "cluster",
    }
  }

  componentWillMount() {
    this.props.getProductDetails(this.props.productName)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.state.details = {
      zoneName: this.props.zone,
      date: this.state.date,
      clusterName: this.state.cluster,
    }
    console.log(this.state.details)
    this.props.cancelPromotion(
      this.state.details,
      this.props.productName,
      this.state.levelOption
    )
    this.props.history.push("/withdraw/clusterproduct")
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
          <TableCell
            style={{
              textAlign: "center",
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
              <Button
                type="button"
                halfWidth
                variant="contained"
                color="primary"
                className="{classes.submit}"
                onClick={(e) => {
                  if (
                    window.confirm(
                      "Are you sure you wish to withdraw the promotion?"
                    )
                  )
                    this.handleSubmit(e)
                }}
              >
                Withdraw
              </Button>
            </Typography>
          </TableCell>
        </TableRow>
      ))
    }

    return (
      <div className="box-container">
        <div className="joint-form-large-table">
          <div className="form-center">
            <div className="flex-grid">
              <br />
              <ProductDetailsTable />
              <br />
              <Typography className="card-header" variant="h5">
                Promotions
              </Typography>
              <br />
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
  products: store.RetailerReducer.products,
})
const actionAsProps = {
  getProductDetails,
}
export default connect(stateAsProps, actionAsProps)(WithdrawClusterPromotion)

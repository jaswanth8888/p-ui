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
  withdrawPromotion,
} from "../../redux/actions/RetailerActions"
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
    this.props.getPromotionsIncluster(
      this.props.productName,
      this.props.zone,
      this.props.cluster
    )
  }

  handleSubmit = (e, promoId) => {
    this.state.details = {
      zoneName: this.props.zone,
      date: this.state.date,
      clusterName: this.props.cluster,
    }
    this.props.withdrawPromotion(
      this.state.details,
      this.props.productName,
      this.state.levelOption,
      promoId
    )
    this.props.history.push("/withdraw/clusterproduct")
    document
      .getElementById("withdraw-tbody")
      .removeChild(document.getElementById(`row${promoId}`))
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
                      <TableCell>Withdraw</TableCell>
                    </TableRow>
                  </TableHead>
                  <tbody id="withdraw-tbody">
                    {this.props.clusterPromotions.map(
                      (promotion) =>
                        promotion.withDrawnDate === null && (
                          <TableRow id={`row${promotion.promotionId}`}>
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
                                {promotion.startDate.slice(0, 10)}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="subtitle1" gutterBottom>
                                {promotion.endDate.slice(0, 10)}
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
                                      // eslint-disable-next-line no-alert
                                      window.confirm(
                                        "Are you sure you wish to withdraw the promotion?"
                                      )
                                    )
                                      this.handleSubmit(
                                        e,
                                        promotion.promotionId
                                      )
                                  }}
                                >
                                  Withdraw
                                </Button>
                              </Typography>
                            </TableCell>
                          </TableRow>
                        )
                    )}
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
  withdrawPromotion,
  getPromotionsIncluster,
}
export default connect(stateAsProps, actionAsProps)(WithdrawClusterPromotion)

/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react"
import { Table, Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import { connect } from "react-redux"
import { cancelEffectivePrice } from "../../redux/actions/RetailerActions"
import {
  viewEffectiveDatesAndPrices,
  PromotionDetails,
} from "../utils/constants"

class ViewEffectiveDatesAndPrices extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div className="box-container">
        <div className="center-body">
          <form className="productform">
            <TableContainer component={Paper}>
              <Table aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    {/* <TableCell>Product Name</TableCell>
                    <TableCell>Base Price</TableCell>
                    <TableCell>Promotions</TableCell> */}
                    {viewEffectiveDatesAndPrices.map((tcell) => (
                      <TableCell>{tcell}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <tbody>
                  {/* //change reguresd */}
                  {this.props.products.map((product) => {
                    return (
                      <TableRow key={product.productId}>
                        <TableCell>
                          <Typography variant="subtitle1" gutterBottom>
                            {product.productName}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1" gutterBottom>
                            {product.productBasePrice}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1" gutterBottom>
                            <Table size="small" aria-label="a dense table">
                              <TableHead>
                                <TableRow>
                                  {/* <TableCell>Profit Percentage</TableCell>
                                  <TableCell>Zone/Cluster</TableCell>
                                  <TableCell>Effective price</TableCell>
                                  <TableCell>Start Date</TableCell>
                                  <TableCell>End Date</TableCell>
                                  <TableCell>Promotion Id</TableCell> */}
                                  {PromotionDetails.map((tcell) => (
                                    <TableCell>{tcell}</TableCell>
                                  ))}
                                </TableRow>
                              </TableHead>
                              <tbody>
                                {product.promotions.map((promotion) => {
                                  return (
                                    <TableRow key={promotion.promotionId}>
                                      <TableCell>
                                        <Typography
                                          variant="subtitle1"
                                          gutterBottom
                                        >
                                          {promotion.profitPercentage}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography
                                          variant="subtitle1"
                                          gutterBottom
                                        >
                                          {promotion.zoneCluster}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography
                                          variant="subtitle1"
                                          gutterBottom
                                        >
                                          {promotion.effectivePrice}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography
                                          variant="subtitle1"
                                          gutterBottom
                                        >
                                          {promotion.startDate}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography
                                          variant="subtitle1"
                                          gutterBottom
                                        >
                                          {promotion.endDate}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography
                                          variant="subtitle1"
                                          gutterBottom
                                        >
                                          {promotion.promotionId}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography
                                          variant="subtitle1"
                                          gutterBottom
                                        >
                                          <Button
                                            type="button"
                                            halfWidth
                                            variant="contained"
                                            color="primary"
                                            className="{classes.submit}"
                                            onClick={this.props.cancelEffectivePrice(
                                              product.productName,
                                              promotion.promotionId
                                            )}
                                          >
                                            Withdraw
                                          </Button>
                                        </Typography>
                                      </TableCell>
                                    </TableRow>
                                  )
                                })}
                              </tbody>
                            </Table>
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </tbody>
              </Table>
            </TableContainer>
          </form>
        </div>
      </div>
    )
  }
}
const stateAsProps = (store) => ({
  products: store.RetailerReducer.products,
})

const actionAsProps = {
  cancelEffectivePrice,
}
export default connect(stateAsProps, actionAsProps)(ViewEffectiveDatesAndPrices)

import {
  Table,
  Typography,
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@material-ui/core"
import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import ProductDetailsTable from "../utils/ProductDetailsTable"
import {
  getPendingPromotions,
  approvePromotions,
} from "../../redux/actions/RetailerActions"
import {
  approvePromotion,
  approvePromotionZoneCluster,
  approvePromotionTable,
} from "../utils/constants"
import Message from "../utils/Message"

class ApprovePromotions extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const {
      productName,
      getPendingPromotions: getPendingPromotionsAlt,
    } = this.props
    getPendingPromotionsAlt(productName)
  }

  handleSubmit = (e, promoId, result) => {
    const { productName, approvePromotions: approvePromotionsAlt } = this.props

    approvePromotionsAlt(promoId, productName, result)

    document
      .getElementById("withdraw-tbody")
      .removeChild(document.getElementById(`row${promoId}`))
  }

  render() {
    const { pendingPromotions } = this.props
    return (
      <div className="box-container">
        <div className="joint-form-large-table">
          <div className="form-center">
            <div className="flex-grid">
              <Typography className="card-header" variant="h4">
                {approvePromotion}
              </Typography>
              <ProductDetailsTable />
              <Typography className="card-header" variant="h5">
                {approvePromotionZoneCluster}
              </Typography>
              <TableContainer component={Paper}>
                <Table aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      {approvePromotionTable.map((tcell) => (
                        <TableCell>{tcell}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <tbody id="withdraw-tbody">
                    {pendingPromotions.map((promotion) => (
                      <TableRow id={`row${promotion.promotionId}`}>
                        <TableCell>
                          <Typography variant="subtitle1" gutterBottom>
                            {promotion.clusterPrice}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1" gutterBottom>
                            {promotion.appliedDate.slice(0, 10)}
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
                            {promotion.zoneCluster}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1" gutterBottom>
                            <div>
                              <Button
                                type="button"
                                halfWidth
                                variant="contained"
                                color="error"
                                style={{ backgroundColor: "#8bc34a" }}
                                className="{classes.submit}"
                                onClick={(e) => {
                                  if (
                                    // eslint-disable-next-line no-alert
                                    window.confirm(
                                      "Are you sure you wish to accept the promotion?"
                                    )
                                  )
                                    this.handleSubmit(
                                      e,
                                      promotion.promotionId,
                                      "APPROVED"
                                    )
                                }}
                              >
                                Accept
                              </Button>
                              <div className="pt-10">
                                <Button
                                  type="button"
                                  halfWidth
                                  variant="contained"
                                  style={{ backgroundColor: "#ef5350" }}
                                  className="pt-10 {classes.submit}"
                                  onClick={(e) => {
                                    if (
                                      // eslint-disable-next-line no-alert
                                      window.confirm(
                                        "Are you sure you wish to reject the promotion?"
                                      )
                                    )
                                      this.handleSubmit(
                                        e,
                                        promotion.promotionId,
                                        "REJECTED"
                                      )
                                  }}
                                >
                                  Reject
                                </Button>
                              </div>
                            </div>
                          </Typography>
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

ApprovePromotions.propTypes = {
  productName: PropTypes.string.isRequired,
  zone: PropTypes.string.isRequired,
  getPromotionsInzone: PropTypes.shape.isRequired,
  getPendingPromotions: PropTypes.func.isRequired,
  pendingPromotions: PropTypes.shape.isRequired,
  approvePromotions: PropTypes.func.isRequired,
}

const stateAsProps = (store) => ({
  productName: store.RetailerReducer.productName,
  pendingPromotions: store.RetailerReducer.pendingPromotions,
})
const actionAsProps = {
  getPendingPromotions,
  approvePromotions,
}
export default connect(stateAsProps, actionAsProps)(ApprovePromotions)

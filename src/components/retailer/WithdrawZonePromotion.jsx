import {
  Table,
  Typography,
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
} from "@material-ui/core"
import React, { Component } from "react"
import { connect } from "react-redux"
import Alert from "@material-ui/lab/Alert"
import CloseIcon from "@material-ui/icons/Close"
import PropTypes from "prop-types"
import ProductDetailsTable from "../utils/ProductDetailsTable"
import {
  getProductDetails,
  withdrawPromotion,
} from "../../redux/actions/RetailerActions"
import {
  withdrawZonePromotion,
  zoneLevelPromotions,
  withdrawPromotionZoneConst,
} from "../utils/constants"

class WithdrawZonePromotion extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: new Date().toISOString().slice(0, 10),
      levelOption: "zone",
    }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const { productName, getProductDetails: getProductDetailsAlt } = this.props
    getProductDetailsAlt(productName)
  }

  handleSubmit = (e, promoId) => {
    const {
      zone,
      productName,
      withdrawPromotion: withdrawPromotionAlt,
    } = this.props
    const { date, levelOption } = this.state
    const details = {
      zoneName: zone,
      date,
    }
    withdrawPromotionAlt(details, productName, levelOption, promoId)
    document
      .getElementById("withdraw-tbody")
      .removeChild(document.getElementById(`row${promoId}`))
  }

  render() {
    const { productDetails } = this.props
    const zoneData = productDetails.assignProduct
    const tableRowElm = (zone) => {
      return zone.promotions.map(
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
                  {productDetails.effectivePriceObj.effectivePrice}
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
              <TableCell>
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
                        this.handleSubmit(e, promotion.promotionId)
                    }}
                  >
                    Withdraw
                  </Button>
                </Typography>
              </TableCell>
            </TableRow>
          )
      )
    }

    return (
      <div className="box-container">
        <div className="joint-form-large-table">
          <div className="form-center">
            <div className="flex-grid">
              {productDetails.assignProduct.length <= 0 && (
                <div>
                  <Alert
                    severity="info"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                  >
                    Sorry No Promotions are applied on this Product:{" "}
                    {productDetails.productName}
                  </Alert>
                </div>
              )}
              <Typography className="card-header" variant="h4">
                {withdrawPromotionZoneConst}
              </Typography>
              <ProductDetailsTable />
              {productDetails.assignProduct.length > 0 ? (
                <>
                  <Typography className="card-header" variant="h5">
                    {zoneLevelPromotions}
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          {/* <TableCell>Promotion Percentage</TableCell>
                          <TableCell>Actual Price</TableCell>
                          <TableCell>Promotion From Date</TableCell>
                          <TableCell>Promotion To Date</TableCell>
                          <TableCell>Withdraw</TableCell> */}
                          {withdrawZonePromotion.map((tcell) => (
                            <TableCell>{tcell}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <tbody id="withdraw-tbody">
                        {zoneData.map((zone) => tableRowElm(zone))}
                      </tbody>
                    </Table>
                  </TableContainer>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

WithdrawZonePromotion.propTypes = {
  productDetails: PropTypes.shape.isRequired,
  productName: PropTypes.string.isRequired,
  zone: PropTypes.string.isRequired,

  getProductDetails: PropTypes.func.isRequired,
  withdrawPromotion: PropTypes.func.isRequired,
}

const stateAsProps = (store) => ({
  productDetails: store.RetailerReducer.productDetails,
  productName: store.RetailerReducer.productName,
  zone: store.RetailerReducer.zone,
})
const actionAsProps = {
  getProductDetails,
  withdrawPromotion,
}
export default connect(stateAsProps, actionAsProps)(WithdrawZonePromotion)

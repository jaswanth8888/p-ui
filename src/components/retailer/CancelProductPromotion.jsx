import { Table, Typography } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import React, { Component } from "react"
import { connect } from "react-redux"
// eslint-disable-next-line no-unused-vars
import Button from "@material-ui/core/Button"
import Alert from "@material-ui/lab/Alert"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import PropTypes from "prop-types"
import ProductDetailsTable from "../utils/ProductDetailsTable"
import {
  getProductDetails,
  cancelPromotion,
} from "../../redux/actions/RetailerActions"

class CancelProductPromotion extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: new Date().toISOString().slice(0, 10),
      levelOption: "zone",
      cancelStatus: 1,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const { getProductDetails: getProductDetailsAlt, productName } = this.props
    getProductDetailsAlt(productName)
  }

  handleSubmit() {
    const {
      cancelPromotion: cancelPromotionAlt,
      zone,
      productName,
    } = this.props
    const { date, levelOption } = this.state
    const details = {
      zoneName: zone,
      date,
    }
    cancelPromotionAlt(details, productName, levelOption)
    this.setState({ cancelStatus: 0 })
  }

  render() {
    const { productDetails } = this.props
    const { cancelStatus } = this.state
    const zoneData = productDetails.assignProduct
    const tableRowElm = (zone) => {
      return zone.promotions.map(
        (promotion) =>
          promotion.cancelledDate === null && (
            <TableRow key={promotion.promotionId}>
              <TableCell>
                <Typography variant="subtitle1" gutterBottom>
                  {promotion.promotionPercentage}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" gutterBottom>
                  {productDetails.effectivePrice}
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
              
              <ProductDetailsTable />
              
              {cancelStatus ? (
                <>
                  <Typography className="card-header" variant="h5">
                    Promotions
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
                  
                  <Typography variant="subtitle1" gutterBottom>
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className="{classes.submit}"
                      onClick={(e) => {
                        // eslint-disable-next-line no-alert
                        if (window.confirm("Are you sure you wish to cancel?"))
                          this.handleSubmit(e)
                      }}
                    >
                      Cancel Promotion
                    </Button>
                  </Typography>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CancelProductPromotion.propTypes = {
  zone: PropTypes.string.isRequired,
  productDetails: PropTypes.shape.isRequired,
  productName: PropTypes.string.isRequired,
  getProductDetails: PropTypes.func.isRequired,
  cancelPromotion: PropTypes.func.isRequired,
}
const stateAsProps = (store) => ({
  productDetails: store.RetailerReducer.productDetails,
  productName: store.RetailerReducer.productName,
  products: store.RetailerReducer.products,
  zone: store.RetailerReducer.zone,
})
const actionAsProps = {
  getProductDetails,
  cancelPromotion,
}
export default connect(stateAsProps, actionAsProps)(CancelProductPromotion)

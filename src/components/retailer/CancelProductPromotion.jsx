import { Table } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import React, { Component } from "react"
import { connect } from "react-redux"
// eslint-disable-next-line no-unused-vars
import { TextField, Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import {
  getProductDetails,
  cancelPromotion,
} from "../../redux/actions/RetailerActions"
import ProductDetailsTable from "../utils/ProductDetailsTable"
import Alert from "@material-ui/lab/Alert"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"

class CancelProductPromotion extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: new Date().toISOString().slice(0, 10),
      details: {},
      levelOption: "zone",
      cancelStatus: 1,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    this.props.getProductDetails(this.props.productName)
  }

  handleSubmit() {
    this.state.details = {
      zoneName: this.props.zone,
      date: this.state.date,
    }
    this.props.cancelPromotion(
      this.state.details,
      this.props.productName,
      this.state.levelOption
    )
    this.setState({ cancelStatus: 0 })
  }

  render() {
    const zoneData = this.props.productDetails.assignProduct
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
            </TableRow>
          )
      )
    }

    return (
      <div className="box-container">
        <div className="joint-form-large-table">
          <div className="form-center">
            <div className="flex-grid">
            {this.props.productDetails.assignProduct.length <= 0 && (
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
                    Sorry No Promotions are applied on this Product: {this.props.productDetails.productName}
                  </Alert>
                </div>
              )}
              <br />
              <ProductDetailsTable />
              <br />
              {this.state.cancelStatus ? (
                <>
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
                  <br />
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
              ) : (
                <></>
              )}
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
  zone: store.RetailerReducer.zone,
})
const actionAsProps = {
  getProductDetails,
  cancelPromotion,
}
export default connect(stateAsProps, actionAsProps)(CancelProductPromotion)

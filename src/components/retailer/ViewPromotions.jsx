import {
  Table,
  Typography,
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core"
import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { getPromotionsInRange } from "../../redux/actions/RetailerActions"
import {
  viewPromotions,
  promotionDetails,
  queryPromotionsForProducts,
} from "../utils/constants"

class ViewPromotions extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const {
      getPromotionsInRange: getPromotionsInRangeAlt,
      startDate,
      endDate,
      levelOption,
    } = this.props
    getPromotionsInRangeAlt(startDate, endDate, levelOption)
  }

  render() {
    const { promotions, levelOption } = this.props
    return (
      <div className="box-container">
        <div className="center-body">
<<<<<<< HEAD
          <div className="flex-grid">
            <Typography color="primary" component="h1" variant="h4">
              {queryPromotionsForProducts}
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    {/* <TableCell>Product</TableCell>
                  <TableCell>Product Details</TableCell>
                  <TableCell>Promotions</TableCell> */}
                    {viewPromotions.map((tcell) => (
                      <TableCell>{tcell}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <tbody>
                  {promotions.map((product) => {
                    return (
                      <TableRow>
                        <TableCell>
                          <Typography variant="subtitle1" gutterBottom>
                            {product.productName}
                          </Typography>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={product.image}
                          >
                            <img
                              className="thumbnail"
                              src={product.image}
                              alt="none"
                            />
                          </a>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1" gutterBottom>
                            Vendor Name : {product.vendorName}
                          </Typography>
                          <Typography variant="subtitle1" gutterBottom>
                            Base Price : {product.vendorPrice}
                          </Typography>
                          <Typography variant="subtitle1" gutterBottom>
                            Effective Price : {product.effectivePrice}
                          </Typography>
                          <Typography variant="subtitle1" gutterBottom>
                            Initial Quantity : {product.initialQty}
                          </Typography>
                          <Typography variant="subtitle1" gutterBottom>
                            Remaining Quantity : {product.remainingQty}
                          </Typography>
                          <Typography variant="subtitle1" gutterBottom>
                            Product Category : {product.category}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1" gutterBottom>
                            <Table size="small" aria-label="a dense table">
                              <TableHead>
                                <TableRow>
                                  {/* <TableCell size="small">
=======
          <TableContainer component={Paper}>
            <Table aria-label="a dense table">
              <TableHead>
                <TableRow>
                  {viewPromotions.map((tcell) => (
                    <TableCell>{tcell}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <tbody>
                {promotions.map((product) => {
                  return (
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle1" gutterBottom>
                          {product.productName}
                        </Typography>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={product.image}
                        >
                          <img
                            className="thumbnail"
                            src={product.image}
                            alt="none"
                          />
                        </a>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" gutterBottom>
                          Vendor Name : {product.vendorName}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                          Base Price : {product.vendorPrice}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                          Effective Price : {product.effectivePrice}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                          Initial Quantity : {product.initialQty}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                          Remaining Quantity : {product.remainingQty}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                          Product Category : {product.category}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" gutterBottom>
                          <Table size="small" aria-label="a dense table">
                            <TableHead>
                              <TableRow>
                                {/* <TableCell size="small">
>>>>>>> 8c81ce463433a7e96a1b65e832edd2ee51ee9f1e
                                  Promotion Percentage
                                </TableCell>
                                <TableCell>Selling Price</TableCell>
                                <TableCell>Start Date</TableCell>
                                <TableCell>End Date</TableCell>
                                <TableCell>Level Applied</TableCell> */}
                                  {promotionDetails.map((tcell) => (
                                    <TableCell>{tcell}</TableCell>
                                  ))}
                                </TableRow>
                              </TableHead>
                              <tbody>
                                {product.list.map((promotion) => {
                                  return (
                                    <TableRow key={promotion.promotionId}>
                                      <TableCell>
                                        <Typography
                                          variant="subtitle1"
                                          gutterBottom
                                        >
                                          {promotion.promotionPercentage}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography
                                          variant="subtitle1"
                                          gutterBottom
                                        >
                                          {promotion.promotionSellingPrice}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography
                                          variant="subtitle1"
                                          gutterBottom
                                        >
                                          {promotion.startDate.slice(0, 10)}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography
                                          variant="subtitle1"
                                          gutterBottom
                                        >
                                          {promotion.endDate.slice(0, 10)}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography
                                          variant="subtitle1"
                                          gutterBottom
                                        >
                                          {levelOption}
                                        </Typography>
                                        <Typography
                                          variant="subtitle1"
                                          gutterBottom
                                        >
                                          {promotion.zoneCluster}
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
          </div>
        </div>
      </div>
    )
  }
}

ViewPromotions.propTypes = {
  getPromotionsInRange: PropTypes.func.isRequired,
  promotions: PropTypes.shape.isRequired,
  levelOption: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
}

const stateAsProps = (store) => ({
  promotions: store.RetailerReducer.promotions,
  levelOption: store.RetailerReducer.levelOption,
  startDate: store.RetailerReducer.startDate,
  endDate: store.RetailerReducer.endDate,
})

const actionAsProps = {
  getPromotionsInRange,
}

export default connect(stateAsProps, actionAsProps)(ViewPromotions)

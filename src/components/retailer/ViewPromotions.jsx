import { Table, Typography } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TablePagination from "@material-ui/core/TablePagination"
import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { getPromotionsInRange } from "../../redux/actions/RetailerActions"
import { viewPromotions } from "../utils/constants"

class ViewPromotions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      rowsPerPage: 5,
    }
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

  handleChangePage = (event, newPage) => {
    this.setState({ page: +newPage })
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: +event.target.value })
  }

  render() {
    const { promotions, levelOption } = this.props
    const { page, rowsPerPage } = this.state

    return (
      <div className="box-container">
        {/* <div className="joint-form-large"> */}
        <div className="joint-form-large-table">
          <div className="form-center">
            <div className="flex-grid">
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
                    {promotions
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((product) => {
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
                                      <TableCell>
                                        Promotion Percentage
                                      </TableCell>
                                      <TableCell>Selling Price</TableCell>
                                      <TableCell>Start Date</TableCell>
                                      <TableCell>End Date</TableCell>
                                      <TableCell>Level Applied</TableCell>
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
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={promotions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </div>
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

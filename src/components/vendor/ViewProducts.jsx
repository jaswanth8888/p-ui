import {
  Table,
  Typography,
  Paper,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
} from "@material-ui/core"
import Carousel from "react-material-ui-carousel"
import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { getAllProducts } from "../../redux/actions/VendorActions"
import { viewProducts } from "../utils/constants"
import convertCurrency from "../utils/ConvertCurrency"

class ViewProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      rowsPerPage: 3,
    }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const { getAllProducts: getAllProductsAlt, loggedInUser } = this.props
    getAllProductsAlt(loggedInUser.userName)
  }

  handleChangePage = (event, newPage) => {
    this.setState({ page: +newPage })
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: +event.target.value })
  }

  render() {
    const { getProducts } = this.props
    const { page, rowsPerPage } = this.state
    return (
      <div className="box-container">
        <div className="center-body">
          <div className="flex-grid">
            <Typography color="primary" component="h1" variant="h4">
              View All Products
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    {viewProducts.map((tcell) => (
                      <TableCell>{tcell}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <tbody>
                  {getProducts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((product) => {
                      return (
                        <TableRow>
                          <TableCell>
                            <Typography variant="subtitle1" gutterBottom>
                              {product.productName}
                            </Typography>
                            <Carousel interval="3000" animation="fade">
                              {product.productImage
                                .slice(0)
                                .reverse()
                                .map((img) => (
                                  <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={img}
                                  >
                                    <img
                                      className="thumbnail-small"
                                      src={img}
                                      alt="none"
                                    />
                                  </a>
                                ))}
                            </Carousel>
                          </TableCell>
                          <TableCell>
                            <Typography variant="subtitle1" gutterBottom>
                              Base Price:
                              {sessionStorage.getItem("currency") === "USD"
                                ? `$ ${product.productBasePrice}`
                                : convertCurrency(
                                    "USD",
                                    sessionStorage.getItem("currency"),
                                    product.productBasePrice
                                  )}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                              Remaining Quantity : {product.remainingQuantity}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                              Product UOM : {product.productUOM}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                              Product Category : {product.productCategory}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </tbody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[3, 5, 10]}
              component="div"
              count={getProducts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </div>
        </div>
      </div>
    )
  }
}

ViewProducts.propTypes = {
  getAllProducts: PropTypes.func.isRequired,
  getProducts: PropTypes.shape.isRequired,
  loggedInUser: PropTypes.shape.isRequired,
}

const stateAsProps = (store) => ({
  getProducts: store.VendorReducer.getProducts,
  levelOption: store.RetailerReducer.levelOption,
  startDate: store.RetailerReducer.startDate,
  endDate: store.RetailerReducer.endDate,
  loggedInUser: store.RetailerReducer.loggedInUser,
})

const actionAsProps = {
  getAllProducts,
}

export default connect(stateAsProps, actionAsProps)(ViewProducts)

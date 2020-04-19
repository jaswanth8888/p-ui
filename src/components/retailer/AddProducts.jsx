import {
  InputLabel,
  Select,
  TextField,
  Typography,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  Table,
  TableRow,
} from "@material-ui/core"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import {
  getCategories,
  getProducts,
  postProductToStore,
} from "../../redux/actions/RetailerActions"
import { addProduct, addProductToStore } from "../utils/constants"

class AddProducts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      category: "",
      productList: [],
      object: {},
      numberBoxInputValue: [],
      quantityCheck: false,
    }
    this.handleChangeCategory = this.handleChangeCategory.bind(this)
    this.loopForm = this.loopForm.bind(this)
    this.updateInputValue = this.updateInputValue.bind(this)
    this.getAllCategories = this.getAllCategories.bind(this)
  }

  componentDidMount() {
    this.getAllCategories()
  }

  getAllCategories() {
    const { getAllCategories } = this.props
    getAllCategories()
  }

  updateInputValue(e) {
    const { numberBoxInputValue } = this.state
    const newArray = Array.from(numberBoxInputValue)
    newArray[e.target.id] = e.target.value
    this.setState({ numberBoxInputValue: newArray })
    if (e.target.value != null) this.setState({ quantityCheck: true })
  }

  handleChangeCategory(e) {
    this.setState({ category: e.target.value })
    const { getAllProducts: getAllProductsAlt } = this.props
    getAllProductsAlt(e.target.value)
  }

  loopForm() {
    const { object, productList } = this.state
    const {
      postProductToStore: postProductToStoreAlt,
      zone,
      cluster,
      store,
    } = this.props
    const tabledata = document.querySelectorAll("tr")

    tabledata.forEach((ele, ind) => {
      if (
        ind &&
        ele.childNodes[0].childNodes[0].childNodes[0].childNodes[0]
          .childNodes[0].checked
      ) {
        object.productName = ele.childNodes[1].childNodes[0].textContent
        object.quantityAssigned = parseInt(
          ele.childNodes[5].childNodes[0].childNodes[1].childNodes[0].value,
          10
        )
        productList.push(object)
      }
    })

    postProductToStoreAlt(zone, cluster, store, productList)
  }

  render() {
    const { categories, products } = this.props
    const { category, numberBoxInputValue, quantityCheck } = this.state
    return (
      <div className="box-container add-prods">
        <Typography className="card-header" variant="h4">
          {addProductToStore}
        </Typography>
        <div className="product-form-header">
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="category">Enter Category</InputLabel>
            <Select
              fullWidth
              native
              variant="outlined"
              label="Enter Category"
              value={category}
              onChange={this.handleChangeCategory}
              inputProps={{
                name: "category",
                id: "category",
              }}
            >
              <option aria-label="None" value="" />
              {categories.map((categoryVal) => {
                return <option value={categoryVal}>{categoryVal}</option>
              })}
            </Select>
          </FormControl>
        </div>
        <div className="product-form-body">
          <form className="productform">
            <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    {/* <TableCell>CheckBox</TableCell> */}
                    {/* <TableCell>Select</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Vendor Name</TableCell>
                    <TableCell>Quantity Available</TableCell>
                    <TableCell>Quantity Required</TableCell> */}
                    {addProduct.map((tcell) => (
                      <TableCell>{tcell}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <tbody>
                  {products.map((product) => {
                    return (
                      <TableRow key={product.id}>
                        <TableCell>
                          {product.remainingQuantity > 0 ? (
                            <FormControlLabel
                              // control={<input type="checkbox" id={product.id} color="primary" value={JSON.stringify(product)}
                              // />}
                              control={
                                <Checkbox
                                  id={product.id}
                                  name="checkedB"
                                  color="primary"
                                  value={JSON.stringify(product)}
                                />
                              }
                            />
                          ) : (
                            <FormControlLabel
                              // control={<input type="checkbox" id={product.id} color="primary" value={JSON.stringify(product)}
                              // />}
                              control={
                                <Checkbox
                                  id={product.id}
                                  name="checkedB"
                                  color="primary"
                                  value={JSON.stringify(product)}
                                  disabled
                                />
                              }
                            />
                          )}
                        </TableCell>
                        <TableCell>
                          {product.remainingQuantity > 0 ? (
                            <Typography variant="subtitle1" gutterBottom>
                              {product.productName}
                            </Typography>
                          ) : (
                            <Typography
                              variant="subtitle1"
                              className="disabled"
                              gutterBottom
                            >
                              {product.productName}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          {product.remainingQuantity > 0 ? (
                            <Typography variant="subtitle1" gutterBottom>
                              {product.productBasePrice}
                            </Typography>
                          ) : (
                            <Typography
                              variant="subtitle1"
                              className="disabled"
                              gutterBottom
                            >
                              {product.productBasePrice}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          {product.remainingQuantity > 0 ? (
                            <Typography variant="subtitle1" gutterBottom>
                              {product.companyName}
                            </Typography>
                          ) : (
                            <Typography
                              variant="subtitle1"
                              className="disabled"
                              gutterBottom
                            >
                              {product.companyName}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          {product.remainingQuantity > 0 ? (
                            <Typography variant="subtitle1" gutterBottom>
                              {product.remainingQuantity}
                            </Typography>
                          ) : (
                            <Typography
                              variant="subtitle1"
                              className="disabled"
                              gutterBottom
                            >
                              {product.remainingQuantity}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          {product.remainingQuantity > 0 ? (
                            <TextField
                              fullWidth
                              type="number"
                              id={product.id}
                              value={numberBoxInputValue[product.id]}
                              pattern="[0-9]*"
                              min="0"
                              max={product.remainingQuantity}
                              step="1"
                              onKeyDown={(evt) =>
                                evt.key === "." && evt.preventDefault()
                              }
                              onChange={this.updateInputValue}
                              label="Quantity"
                              variant="outlined"
                            />
                          ) : (
                            <TextField
                              fullWidth
                              type="number"
                              id={product.id}
                              value={numberBoxInputValue[product.id]}
                              pattern="[0-9]*"
                              min="0"
                              max={product.remainingQuantity}
                              step="1"
                              onKeyDown={(evt) =>
                                evt.key === "e" && evt.preventDefault()
                              }
                              onChange={this.updateInputValue}
                              label="Quantity"
                              variant="outlined"
                              disabled
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </tbody>
              </Table>
            </TableContainer>
            {quantityCheck && (
              <Link to="/addproducts" className="special-href" id="top-pad">
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="{classes.submit}"
                  onClick={this.loopForm}
                  id="add-product-submit"
                >
                  ADD PRODUCTS
                </Button>
              </Link>
            )}
          </form>
        </div>
      </div>
    )
  }
}

AddProducts.propTypes = {
  getAllCategories: PropTypes.func.isRequired,
  getAllProducts: PropTypes.func.isRequired,
  postProductToStore: PropTypes.func.isRequired,

  categories: PropTypes.shape.isRequired,
  zone: PropTypes.string.isRequired,
  cluster: PropTypes.string.isRequired,
  store: PropTypes.string.isRequired,
  products: PropTypes.shape.isRequired,
}

const stateAsProps = (store) => ({
  categories: store.RetailerReducer.categories,
  zone: store.RetailerReducer.zone,
  cluster: store.RetailerReducer.cluster,
  store: store.RetailerReducer.store,
  products: store.RetailerReducer.products,
})

const actionAsProps = {
  getAllCategories: getCategories,
  getAllProducts: getProducts,
  postProductToStore,
}

export default connect(stateAsProps, actionAsProps)(AddProducts)

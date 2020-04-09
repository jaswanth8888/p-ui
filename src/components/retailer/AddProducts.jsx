import {
  InputLabel,
  Select,
  Table,
  TextField,
  Typography,
} from "@material-ui/core"
import Button from "@material-ui/core/Button"
import Checkbox from "@material-ui/core/Checkbox"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Paper from "@material-ui/core/Paper"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import {
  getCategories,
  getProducts,
  postProductToStore,
} from "../../redux/actions/RetailerActions"

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
  }

  AddProducts.propTypes ={

  }

  componentDidMount() {
    this.props.getAllCategories()
  }

  updateInputValue(e) {
    const newArray = Array.from(this.state.numberBoxInputValue)
    newArray[e.target.id] = e.target.value
    this.setState({ numberBoxInputValue: newArray })
    if (e.target.value != null) this.setState({ quantityCheck: true })
  }

  handleChangeCategory(e) {
    this.setState({ category: e.target.value })
    this.props.getAllProducts(e.target.value)
  }

  loopForm() {
    const tabledata = document.querySelectorAll("tr")

    tabledata.forEach((ele, ind) => {
      if (
        ind &&
        ele.childNodes[0].childNodes[0].childNodes[0].childNodes[0]
          .childNodes[0].checked
      ) {
        this.state.object.productName =
          ele.childNodes[1].childNodes[0].textContent
        this.state.object.quantityAssigned = parseInt(
          ele.childNodes[5].childNodes[0].childNodes[1].childNodes[0].value
        )
        this.state.productList.push(this.state.object)
      }
    })

    this.props.postProductToStore(
      this.props.zone,
      this.props.cluster,
      this.props.store,
      this.state.productList
    )
  }

  render() {
    return (
      <div className="box-container add-prods">
        <div className="product-form-header">
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="category">Enter Category</InputLabel>
            <Select
              fullWidth
              native
              variant="outlined"
              label="Enter Category"
              value={this.state.category}
              onChange={this.handleChangeCategory}
              inputProps={{
                name: "category",
                id: "category",
              }}
            >
              <option aria-label="None" value="" />
              {this.props.categories.map((category, index) => {
                return <option value={category}>{category}</option>
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
                    <TableCell>Select</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Vendor Name</TableCell>
                    <TableCell>Quantity Available</TableCell>
                    <TableCell>Quantity Required</TableCell>
                  </TableRow>
                </TableHead>

                <tbody>
                  {this.props.products.map((product) => {
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
                              value={this.state.numberBoxInputValue[product.id]}
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
                              value={this.state.numberBoxInputValue[product.id]}
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
            {this.state.quantityCheck && (
              <Link to="/addproducts">
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

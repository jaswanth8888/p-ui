import { TextField, Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import CheckIcon from "@material-ui/icons/Check"
import ClearIcon from "@material-ui/icons/Clear"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React, { Component, Fragment } from "react"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import {
  getProductList,
  saveProductValue,
  getProductDetails,
} from "../../redux/actions/RetailerActions"
import Message from "../utils/Message"

class PriceOnDate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      productName: "",
      status: 0,
    }
    this.handleChange = this.handleChangeProduct.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getProductList()
  }

  handleChangeProduct = (e, value) => {
    console.log(value)
    const productName = value
    // this.setState({ productName });
    // console.log(this.state.productName)
    this.props.saveProductValue(productName)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({ isSubmitted: true })
  }

  render() {
    return (
      <div className="box-container">
        <div className="joint-form">
          <div className="validation-half">
            <div className="validations">
              <h3 style={{ textAlign: "center" }}>Requirements</h3>
              {this.state.productName.length <= 0 && (
                <div style={{ display: "flex" }}>
                  <ClearIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    Please select a product name
                  </Typography>
                </div>
              )}
              {this.state.productName.length > 0 && (
                <div style={{ display: "flex", color: "#ffc107" }}>
                  <CheckIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    Please select a product name
                  </Typography>
                </div>
              )}
            </div>
          </div>
          <div className="form-half">
            <form className="{classes.form}" noValidate>
              <div>
                <div className="help-block">
                  <Typography
                    color="primary"
                    component="h1"
                    variant="h4"
                    className="help-block-h4"
                  >
                    Select a Product
                  </Typography>
                </div>
              </div>
              {/* {console.log(this.props.product)} */}

              <FormControl variant="outlined" fullWidth>
                <Autocomplete
                  id="product-list"
                  fullWidth
                  options={this.props.products}
                  // value={this.state.productName}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Product Name"
                      variant="outlined"
                    />
                  )}
                  onChange={this.handleChange}
                  name="productName"
                />
              </FormControl>

              <Link to="/addpromotion" className="button-link">
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="{classes.submit} submit-pad"
                  id="add-promo-btn"
                >
                  Assign Price to product
                </Button>
              </Link>
            </form>
          </div>
        </div>
        <Message />
        <>
          {this.state.status === -1 ? (
            <div>
              <Snackbar open="true" autoHideDuration={2000}>
                <MuiAlert severity="error" elevation={6} variant="filled">
                  Product selection failed. Please match the requirements
                </MuiAlert>
              </Snackbar>
            </div>
          ) : (
            <div />
          )}
        </>
      </div>
    )
  }
}

const stateAsProps = (store) => ({
  products: store.RetailerReducer.productList,
  product: store.RetailerReducer.product,
})
const actionAsProps = {
  getProductList,
  saveProductValue,
  getProductDetails,
}
export default connect(stateAsProps, actionAsProps)(PriceOnDate)

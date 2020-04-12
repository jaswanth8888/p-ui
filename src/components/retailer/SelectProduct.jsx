import { TextField, Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import CheckIcon from "@material-ui/icons/Check"
import ClearIcon from "@material-ui/icons/Clear"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import {
  getProductList,
  saveProductValue,
  getProductDetails,
} from "../../redux/actions/RetailerActions"

class SelectProduct extends Component {
  constructor(props) {
    super(props)

    this.state = {
      productName: "",
      // status: 0
    }
    this.handleChangeProduct = this.handleChangeProduct.bind(this)
    //  this.productNameNotSelected = this.productNameNotSelected.bind(this);
  }

  productNameNotSelected() {
    console.log(this.state.productName)
    if (this.state.productName) {
      this.setState({ status: 1 })
    } else {
      this.setState({ status: -1 })
    }
  }

  componentWillMount() {
    this.props.getProductList()
  }

  handleChangeProduct = (e, value) => {
    console.log(value)
    const productName = value
    this.setState({ productName })
    console.log(this.state.productName)
    this.props.saveProductValue(productName)
    this.props.getProductDetails(value)
    // this.productNameNotSelected();
    // console.log(this.state.status);
  }

  // handleSubmit(e) {
  //     e.preventDefault();
  //     if(this.productNameNotSelected()){
  //         this.setState({ isSubmitted: true })
  //     }
  // }

  render() {
    return (
      <div className="box-container">
        <div className="joint-form">
          <div className="validation-half">
            <div className="validations">
              <h3 className="center-h3">Requirements</h3>
              {this.state.productName.length === "" && (
                <div className="typo-div">
                  <ClearIcon className="icon-style" />
                  <Typography variant="subtitle2" gutterBottom>
                    Please provide a product name
                  </Typography>
                </div>
              )}
              {this.state.productName.length > 0 && (
                <div className="approved-text">
                  <CheckIcon className="icon-style" />
                  <Typography variant="subtitle2" gutterBottom>
                    Please provide a product name
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
              <FormControl variant="outlined" fullWidth>
                <Autocomplete
                  id="product-list"
                  fullWidth
                  options={this.props.products}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Product Name"
                      variant="outlined"
                    />
                  )}
                  onChange={this.handleChangeProduct}
                  name="productName"
                />
              </FormControl>
              {this.state.productName === "" && <Link to="/selectproduct" />}

              <Link className="button-link" to="/assigntocluster">
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="{classes.submit} submit-pad"
                  id="selprods-submit"
                >
                  Assign Price and Cluster
                </Button>
              </Link>

              <Link className="button-link" to="/assigntozone">
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="{classes.submit} submit-pad"
                  onClick={this.handleSubmit}
                  id="assign-price-zone-submit"
                >
                  Assign Price and Zone
                </Button>
              </Link>
            </form>
          </div>
        </div>
        {/* <Fragment>
                    {(this.state.status === -1) ? (
                    <div>
                    <Snackbar open="true" autoHideDuration={2000}>
                        <MuiAlert severity="error" elevation={6} variant="filled">
                         Please select product name
                        </MuiAlert>
                    </Snackbar>
                    </div>) : (<div />)
                    }
                </Fragment> */}
      </div>
    )
  }
}

const stateAsProps = (store) => ({
  products: store.RetailerReducer.productList,
})
const actionAsProps = {
  getProductList,
  saveProductValue,
  getProductDetails,
}
export default connect(stateAsProps, actionAsProps)(SelectProduct)

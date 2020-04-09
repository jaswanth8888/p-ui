// new AddProduct
import { InputLabel, TextField, Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import Snackbar from "@material-ui/core/Snackbar"
import CheckIcon from "@material-ui/icons/Check"
import ClearIcon from "@material-ui/icons/Clear"
import MuiAlert from "@material-ui/lab/Alert"
import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import thunk from "redux-thunk"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import InputAdornment from "@material-ui/core/InputAdornment"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import { makeStyles } from "@material-ui/core/styles"
import TextareaAutosize from "@material-ui/core/TextareaAutosize"
import { postProduct } from "../../redux/actions/VendorActions"

class AddProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: {
        productName: "",
        companyName: "",
        productCategory: "",
        productBasePrice: "",
        initialQuantity: "",
        uom: "",
        // n:"",
        // nutritionalFacts:[]
      },
      isSubmitted: false,
      isPosted: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSet = this.handleSet.bind(this)
  }

  handleChange(e) {
    const { name, value } = e.target
    const { product } = this.state
    product[name] = value
    this.setState({ product })
  }

  handleSubmit(e) {
    // window.location.href='./home'
    /*  let value=[]
        if(this.state.product.n!=null){
          value=Array(this.state.product.n.split("/n"))
        }
        let product= this.state.product;

        product["nutritionalFacts"] =value
        this.setState({product}) */

    this.setState({ isSubmitted: true })
    if (
      this.state.product.productName &&
      this.state.product.productBasePrice > 0 &&
      this.state.product.initialQuantity > 1 &&
      this.state.product.initialQuantity < 100
    ) {
      this.props.postProduct(this.state.product)
      this.setState({ isPosted: true })
    }
    this.handleSet()
  }

  handleSet() {
    const product = {
      productName: "",
      // productCategory:"",
      productBasePrice: "",
      initialQuantity: "",
      companyName: "",
      //  uom:"",
      n: "",
    }
    this.setState({ isSubmitted: true })
    // this.setState({product})
  }

  render() {
    if (sessionStorage.getItem("token") != null) {
      if (this.state.isPosted) {
        return <Redirect to="/vendor/home" />
      }
      return (
        <div className="box-container">
          <div className="joint-form">
            <div className="validation-half">
              <div className="validations">
                <h3 style={{ textAlign: "center" }}>Requirements</h3>
                {this.state.isSubmitted && !this.state.product.productName && (
                  <div style={{ display: "flex" }}>
                    <ClearIcon
                      style={{ paddingRight: "5px", marginTop: "-2px" }}
                    />
                    <Typography variant="subtitle2" gutterBottom>
                      name can't be empty
                    </Typography>
                  </div>
                )}
                {this.state.isSubmitted &&
                  this.state.product.productBasePrice <= 0 && (
                    <div style={{ display: "flex", color: "#ffc107" }}>
                      <CheckIcon
                        style={{ paddingRight: "5px", marginTop: "-2px" }}
                      />
                      <Typography variant="subtitle2" gutterBottom>
                        base price must be greater than 0
                      </Typography>
                    </div>
                  )}
                {this.state.isSubmitted &&
                  this.state.product.initialQuantity < 1 && (
                    <div style={{ display: "flex", color: "#ffc107" }}>
                      <CheckIcon
                        style={{ paddingRight: "5px", marginTop: "-2px" }}
                      />
                      <Typography variant="subtitle2" gutterBottom>
                        >minimum quantity should be 1
                      </Typography>
                    </div>
                  )}
                {this.state.isSubmitted &&
                  this.state.product.productCategory === "ALCOHOL_PROD" &&
                  this.state.product.initialQuantity > 100 && (
                    <div style={{ display: "flex", color: "#ffc107" }}>
                      <CheckIcon
                        style={{ paddingRight: "5px", marginTop: "-2px" }}
                      />
                      <Typography variant="subtitle2" gutterBottom>
                        maximum quantity of ALCOHOL should be 100
                      </Typography>
                    </div>
                  )}
                {this.state.isSubmitted &&
                  this.state.product.productCategory === "BABY_PROD" &&
                  this.state.product.initialQuantity > 500 && (
                    <div style={{ display: "flex", color: "#ffc107" }}>
                      <CheckIcon
                        style={{ paddingRight: "5px", marginTop: "-2px" }}
                      />
                      <Typography variant="subtitle2" gutterBottom>
                        maximum quantity of BabyProducts should be 500
                      </Typography>
                    </div>
                  )}
              </div>
            </div>
            <div className="form-half">
              <form className="{classes.form}" noValidate>
                <div>
                  <div className="help-block">
                    <Typography color="primary" component="h1" variant="h4">
                      AddProduct
                    </Typography>
                  </div>
                </div>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="productName"
                  label="ProductName"
                  name="productName"
                  autoComplete="productName"
                  onChange={this.handleChange}
                  value={this.state.product.productName}
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="companyName"
                  label="companyName"
                  name="companyName"
                  autoComplete="companyName"
                  onChange={this.handleChange}
                  value={this.state.product.companyName}
                  autoFocus
                />
                <InputLabel htmlFor="outlined-age-native-simple">
                  Product Category
                </InputLabel>
                <Select
                  labelId="productCategory"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="productCategory"
                  label="productCategory"
                  onChange={this.handleChange}
                  id="select-product"
                >
                  <MenuItem value="ALCOHOL_PROD">ALCOHOL_PROD</MenuItem>
                  <MenuItem value="BABY_PROD">BABY_PROD</MenuItem>
                </Select>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="number"
                  id="initialQuantity"
                  label="quantity"
                  name="initialQuantity"
                  autoComplete="initialQuantity"
                  onChange={this.handleChange}
                  value={this.state.product.initialQuantity}
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="number"
                  id="productBasePrice"
                  label="productBasePrice"
                  name="productBasePrice"
                  autoComplete="productBasePrice"
                  onChange={this.handleChange}
                  value={this.state.product.productBasePrice}
                  autoFocus
                />
                <InputLabel htmlFor="outlined-age-native-simple">
                  Units Of Measuremment
                </InputLabel>
                {this.state.product.productCategory == "ALCOHOL_PROD" && (
                  <Select
                    labelId="uom"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="uom"
                    label="uom"
                    id="alc-prod"
                    onChange={this.handleChange}
                  >
                    <MenuItem value="Lts">LTS</MenuItem>
                    <MenuItem value="GALLONs">GALLONS</MenuItem>
                    <MenuItem value="ML">ML </MenuItem>
                  </Select>
                )}
                {this.state.product.productCategory == "BABY_PROD" && (
                  <Select
                    labelId="uom"
                    fullWidth
                    name="uom"
                    label="uom"
                    onChange={this.handleChange}
                    id="baby-prod"
                  >
                    <MenuItem value="KGs">KGs</MenuItem>
                    <MenuItem value="Pounds">Pounds</MenuItem>
                  </Select>
                )}
                {this.state.product.productCategory == "BABY_PROD" && (
                  <div>
                    {/*     <TextareaAutosize
                    name="n" 
                  placeholder="Nutritional Facts"             
                    onChange={this.handleChange}
                    value={this.state.product.n}
                  /> */}
                  </div>
                )}
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="{classes.submit}"
                  style={{ marginTop: "30px" }}
                  onClick={this.handleSubmit}
                  id="submit-prods"
                >
                  Save
                </Button>
              </form>
            </div>
          </div>
        </div>
      )
    }
  }
}
const actionAsProps = {
  postProduct,
}
export default connect(null, actionAsProps)(AddProduct)

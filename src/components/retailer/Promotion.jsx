import {
  InputLabel,
  Select,
  Table,
  TextField,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import MenuItem from "@material-ui/core/MenuItem";
import React, { Component, Fragment } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts, postPromotion } from "../../redux/actions/RetailerActions";
import ProductDetails from "../utils/ProductDetails";
import "./StoreForm.css";
import "./AddProducts.css";
import "./Table.css";
import Dummy from "./Dummy";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Promotion.css";
import Message from "../utils/Message"
class Promotion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      promotionDetails: {
        startDate: "",
        endDate: "",
        effectivePercentage: "",
      },
      productName: "",
      // isSubmit: false,
      // status: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    let promotionDetails = this.state.promotionDetails;
    promotionDetails[name] = value;
    this.setState({ promotionDetails });

  }


  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.productName);
    // console.log(this.state);

    this.props.postPromotion(this.props.productDetails.productName, this.state.promotionDetails)

  }

  render() {
    return (
      <div className="box-container store-form">
        <div className="joint-form" style={{ width: "850px" }}>
          <ProductDetails />
          <div
            className="product-form-body"
            style={{ width: "95%", margin: "40px", marginBottom: "0px" }}
          >

            <form id="productform">
              <TextField
                id="startDate"
                name="startDate"
                // label="startDate"
                // fullWidth
                value={this.state.startDate}
                type="date"
                variant="outlined"
                margin="normal"
                autoComplete="fromDate"
                required
                onChange={this.handleChange}
                autoFocus
              />

              <div>
                <TextField
                  id="endDate"
                  name="endDate"
                  // label="endDate"
                  // fullWidth
                  value={this.state.endDate}
                  type="date"
                  variant="outlined"
                  margin="normal"
                  autoComplete="startDate"
                  required
                  onChange={this.handleChange}
                  autoFocus
                />
              </div>
              <TextField
                variant="outlined"
                margin="normal"
                required
                // fullWidth
                type="number"
                step="0.01"
                id="effectivePercentage"
                label="Percentage"
                name="effectivePercentage"
                autoComplete="pricePerUnit"
                onChange={this.handleChange}
                autoFocus
              />

              <div>
                {/* <Link to="/selectproduct" style={{ textDecoration: "none" }}> */}
                <Button
                  type="button"
                  // fullWidth="50px"
                  variant="contained"
                  color="primary"
                  className="{classes.submit}"
                  style={{ marginTop: "30px" }}
                  onClick={this.handleSubmit}
                >
                  SAVE
                  </Button>
                {/* </Link> */}
              </div>
            </form>

          </div>
        </div>


      </div>
    );
  }
}

const stateAsProps = store => ({
  products: store.RetailerReducer.products,
  productDetails: store.RetailerReducer.productDetails,
  productName: store.RetailerReducer.product
});

const actionAsProps = {
  getAllProducts: getProducts,
  postPromotion: postPromotion
};

export default connect(stateAsProps, actionAsProps)(Promotion);

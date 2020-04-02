import { TextField } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getProducts,
  postPromotion
} from "../../redux/actions/RetailerActions";
import ProductDetails from "../utils/ProductDetails";
import Message from "../utils/Message";

class Promotion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      promotionDetails: {
        startDate: "",
        endDate: "",
        effectivePercentage: ""
      },
      productName: ""
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

    this.props.postPromotion(
      this.props.productDetails.productName,
      this.state.promotionDetails
    );
  }

  render() {
    return (
      <div className="box-container">
        <div className="joint-form-large">
          <ProductDetails />
          <div className="product-form-body">
            <Typography className="card-header" variant="h4">
              Create a Promotion
            </Typography>
            <form className="{classes.form}" noValidate>
              <TextField
                id="startDate"
                name="startDate"
                // label="startDate"
                fullWidth
                value={this.state.startDate}
                type="date"
                variant="outlined"
                margin="normal"
                autoComplete="fromDate"
                required
                onChange={this.handleChange}
                autoFocus
              />

              <TextField
                id="endDate"
                name="endDate"
                // label="endDate"
                fullWidth
                value={this.state.endDate}
                type="date"
                variant="outlined"
                margin="normal"
                autoComplete="startDate"
                required
                onChange={this.handleChange}
                autoFocus
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="number"
                step="0.01"
                id="effectivePercentage"
                label="Percentage"
                name="effectivePercentage"
                autoComplete="pricePerUnit"
                onChange={this.handleChange}
                autoFocus
              />

              <Button
                fullWidth
                type="button"
                variant="contained"
                color="primary"
                className="{classes.submit} submit-pad"
                onClick={this.handleSubmit}
              >
                SAVE
              </Button>
            </form>
          </div>
        </div>
        <Message />
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

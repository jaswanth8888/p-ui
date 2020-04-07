import React, { Component, Fragment } from "react";
import connect from "react-redux/es/connect/connect";
import { Grid, Typography, Paper, Table } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { getProductDetails } from "../../redux/actions/RetailerActions";

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.getProductDetails(this.props.productName);
  }

  render() {
    return (
      <div className="flex-grid">
        <div className="product-name">
          <Typography className="card-header" variant="h4">
            {this.props.productDetails.productName}
          </Typography>
        </div>
        <div className="product-image">
          <img src={this.props.productDetails.productImagePath} alt="none" />
        </div>
        <div className="product-table-data">
          <TableContainer component={Paper} className="product-table">
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow className="product-details-row">
                  <TableCell className="table-text">Base</TableCell>
                  <TableCell className="table-text">Vendor</TableCell>
                </TableRow>
              </TableHead>
              <TableRow>
                <TableCell className="table-text">
                  {this.props.productDetails.productBasePrice}
                </TableCell>
                <TableCell className="table-text">{this.props.productDetails.companyName}</TableCell>
              </TableRow>
              <TableHead>
                <TableRow className="product-details-row">
                  <TableCell className="table-text">Quantity</TableCell>
                  <TableCell className="table-text">Category</TableCell>
                </TableRow>
              </TableHead>
              <TableRow>
                <TableCell className="table-text">
                  {this.props.productDetails.remainingQuantity}
                </TableCell>
                <TableCell className="table-text">
                  {this.props.productDetails.productCategory}
                </TableCell>
              </TableRow>
            </Table>
          </TableContainer>
        </div>
        <div className="product-desc">
          <Typography variant="body2">
            {this.props.productDetails.productDescription}
          </Typography>
        </div>
      </div>
    );
  }
}

const stateAsProps = store => ({
  productDetails: store.RetailerReducer.productDetails,
  productName: store.RetailerReducer.productName
});
const actionsAsProps = {
  getProductDetails
};
export default connect(stateAsProps, actionsAsProps)(ProductDetails);

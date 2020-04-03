import React, { Component, Fragment } from "react";
import connect from "react-redux/es/connect/connect";
import { getProductDetails } from "../../redux/actions/RetailerActions";
import { Grid, Typography, Paper } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Table } from "@material-ui/core";

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
          <TableContainer component={Paper}>
            <Table aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Base Price</TableCell>
                  <TableCell>Vendor</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Category</TableCell>
                </TableRow>
              </TableHead>
              <tbody>
                <TableRow>
                  <TableCell>
                    {this.props.productDetails.productBasePrice}
                  </TableCell>
                  <TableCell>{this.props.productDetails.companyName}</TableCell>
                  <TableCell>
                    {this.props.productDetails.remainingQuantity}
                  </TableCell>
                  <TableCell>
                    {this.props.productDetails.productCategory}
                  </TableCell>
                </TableRow>
              </tbody>
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
  getProductDetails: getProductDetails
};
export default connect(stateAsProps, actionsAsProps)(ProductDetails);

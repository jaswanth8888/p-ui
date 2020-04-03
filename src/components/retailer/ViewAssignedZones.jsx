import { Table, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProductDetails, resetStatusCode } from "../../redux/actions/RetailerActions";
import ProductDetails from "../utils/ProductDetails";

class ViewAssignedZones extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentWillMount() {
        this.props.getProductDetails(this.props.productName);
    }


    render() {

        return (

            <div className="box-container-start">
                {this.props.resetStatusCode()}
                <div className="">
                    <ProductDetails></ProductDetails>
                </div>
                {console.log(this.props.productDetails)}

                <TableContainer component={Paper}>
                    <Table aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Zone Name</TableCell>
                                <TableCell>Quantity Assigned</TableCell>
                                <TableCell>Profit Percentage</TableCell>
                                <TableCell>Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <tbody>
                            {this.props.productDetails.assignProduct.map(zone => {
                                return (
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle1" gutterBottom>
                                                {zone.zoneName}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1" gutterBottom>
                                                {zone.quantityAssigned}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1" gutterBottom>
                                                {zone.profitPercentage}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1" gutterBottom>
                                                {zone.price}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </tbody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

const stateAsProps = (store) => ({
    productDetails: store.RetailerReducer.productDetails,
    productName: store.RetailerReducer.productName
});
const actionAsProps = {
    getProductDetails: getProductDetails,
    resetStatusCode: resetStatusCode

}
export default connect(stateAsProps, actionAsProps)(ViewAssignedZones);

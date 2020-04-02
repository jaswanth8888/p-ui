import { Table, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProductDetails } from "../../redux/actions/RetailerActions";
import ProductDetails from "../utils/ProductDetails";

class ViewAssignedClusters extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {

        return (

            <div className="box-container-start">
                <div className="">
                    <ProductDetails></ProductDetails>
                </div>

                {console.log(this.props.productDetails)}

                <TableContainer component={Paper}>
                    <Table aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Cluster Name</TableCell>
                                <TableCell>Quantity Assigned</TableCell>
                                <TableCell>Profit Percentage</TableCell>
                                <TableCell>Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <tbody>
                            {this.props.productDetails.assignProduct.map((zone) => {

                                if (zone.cluster !== null) {
                                    {
                                        {
                                            console.log(zone.cluster);

                                        }
                                        zone.cluster.map((clusterObject) => {
                                            { console.log(clusterObject); }
                                            return (
                                                <TableRow>
                                                    
                                                        <TableCell>
                                                            {zone.price > 0 ? (
                                                                <Typography variant="subtitle1" gutterBottom>
                                                                    {console.log(zone.zoneName)
                                                                    }
                                                                    aaaaa
                                                                    {clusterObject.clusterName}<br />
                                                                    <Typography variant="subtitle1" style={{ color: "grey" }} gutterBottom>
                                                                        {zone.zoneName}
                                                                        
                                                                    </Typography>
                                                                </Typography>
                                                            ) : (
                                                                    <Typography variant="subtitle1"
                                                                        gutterBottom
                                                                    >
                                                                        {clusterObject.clusterName}
                                                                        <Typography variant="subtitle1"
                                                                            gutterBottom>
                                                                            {zone.zoneName}

                                                                        </Typography>
                                                                    </Typography>
                                                                )}
                                                        </TableCell>

                                                        <TableCell>
                                                            <Typography variant="subtitle1" gutterBottom>
                                                                {clusterObject.quantityAssigned}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="subtitle1" gutterBottom>
                                                                {clusterObject.profitPercentage}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="subtitle1" gutterBottom>
                                                                {clusterObject.price}
                                                            </Typography>
                                                        </TableCell>
                                                    

                                                </TableRow>
                                            );
                                        })
                                    }
                                }
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
    getProductDetails: getProductDetails

}

export default connect(stateAsProps, actionAsProps)(ViewAssignedClusters);

import React, { Component } from 'react'
import {
    InputLabel,
    Select,
    Table,
    TextField,
    Typography
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./AddProducts.css";
import "./Table.css";
class ShowProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <div >
    
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="a dense table">

                                <TableHead
                                    style={{ backgroundColor: "#673ab7", color: "white" }}
                                >
                                    <TableRow>
                                        <TableCell style={{ color: "White" }}>
                                            Product Name
                    </TableCell>
                                        <TableCell style={{ color: "White" }}>
                                            Base Price
                    </TableCell>
                                        <TableCell style={{ color: "White" }}>
                                            Promotions
                    </TableCell>
                                    </TableRow>
                                </TableHead>
                                <tbody>

                                    {this.props.products.map(product => {
                                        return (

                                            <TableRow key={product.productId}>
                                                <TableCell>
                                                    <Typography variant="subtitle1" gutterBottom>
                                                        {product.productName}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle1" gutterBottom>
                                                        {product.productBasePrice}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle1" gutterBottom>
                                                        <Table size="small" aria-label="a dense table">
                                                            <TableHead
                                                                style={{ backgroundColor: "#673ab7", color: "white" }}
                                                            >
                                                                <TableRow>
                                                                    <TableCell style={{ color: "White" }}>
                                                                        Profit Percentage
                                            </TableCell>
                                                                    <TableCell style={{ color: "White" }}>
                                                                        Price
                                            </TableCell>
                                                                    <TableCell style={{ color: "White" }}>
                                                                        Effective price
                                            </TableCell>
                                                                    <TableCell style={{ color: "White" }}>
                                                                        From Date
                                            </TableCell>
                                                                    <TableCell style={{ color: "White" }}>
                                                                        TO Date
                                            </TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <tbody>

                                                                {product.promotions.map(promotion => {
                                                                    return (
                                                                        <TableRow key={promotion.promotionId}>

                                                                            <TableCell>
                                                                                <Typography variant="subtitle1" gutterBottom>
                                                                                    {promotion.profitPercentage}
                                                                                </Typography>
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <Typography variant="subtitle1" gutterBottom>
                                                                                    {promotion.price}
                                                                                </Typography>
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <Typography variant="subtitle1" gutterBottom>
                                                                                    {promotion.effectivePrice}
                                                                                </Typography>
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <Typography variant="subtitle1" gutterBottom>
                                                                                    {promotion.startDate}
                                                                                </Typography>
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <Typography variant="subtitle1" gutterBottom>
                                                                                    {promotion.endDate}
                                                                                </Typography>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    )
                                                                }
                                                                )
                                                                }
                                                            </tbody>
                                                        </Table>
                                                    </Typography>
                                                </TableCell>

                                            </TableRow>
                                        )
                                    })}

                                </tbody>


                            </Table>
                        </TableContainer>
                

            </div>
        );
    }


}
const stateAsProps = store => ({
    products: store.RetailerReducer.products
})
export default connect(stateAsProps, null)(ShowProducts);
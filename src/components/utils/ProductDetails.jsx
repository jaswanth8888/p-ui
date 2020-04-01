import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import { getProductDetails } from "../../redux/actions/RetailerActions";
import { Grid, Typography, Paper } from "@material-ui/core";



class ProductDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentDidMount() {
        this.props.getProductDetails(this.props.productName);
    }

    render() {

        return (
                <div >
                    <Grid container spacing={3} >
                        <Grid item xs={12} align="center">
                            <Typography >
                                Name : {this.props.productDetails.productName}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                        <img src= "https://bit.ly/3ay4Y03" style={{ width:'40vh'}} alt="pic" />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Typography >
                                Base Price :  {this.props.productDetails.base} 
                            </Typography>
                            <br></br>
                            <Typography >
                                Vendor :  {this.props.productDetails.vendor} 
                            </Typography>
                            <br></br>
                            </Grid>
                            <Grid>
                            <br></br>
                            <Typography >
                                Quantity : {this.props.productDetails.quantity}
                            </Typography>
                            <br></br>
                            <Typography >
                                Category :  {this.props.productDetails.category}
                            </Typography>
                            <br></br>
 
                        </Grid>
                        <Grid item xs={12} align="center" >
                            <Paper>
                            <Typography >
                                Description : {this.props.productDetails.desc}
                            </Typography>
                            <br></br>
                            </Paper>
                            </Grid>
                    </Grid>
 
                </div>
        
        )
    }
}

const stateAsProps = (store) => ({
    productDetails: store.RetailerReducer.productDetails,
    productName: store.RetailerReducer.product

});
const actionsAsProps = {
    getProductDetails: getProductDetails
};
export default connect(stateAsProps, actionsAsProps)(ProductDetails)

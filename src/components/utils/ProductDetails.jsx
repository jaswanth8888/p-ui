import React, { Component, Fragment } from 'react'
import connect from 'react-redux/es/connect/connect'
import { getProductDetails } from "../../redux/actions/RetailerActions";
import { Grid, Typography, Paper } from "@material-ui/core";
import "./ProductDetails.css"




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
            <div className="flex-grid">
                <div className="top-desc">
                    <Typography variant="h5" gutterBottom style={{ padding: "20px 0px" }}>
                        Product Name : {this.props.productDetails.productName}
                    </Typography>
                </div>
                <div className="middle-desc">
                    <div className="image-half">
                        <img src="" />
                    </div>
                    <div className="data-half">
                        <div className="data-half-upper">
                            <div className="text-space">
                                <Typography  variant="h6">
                                    Base Price :  {this.props.productDetails.productBasePrice}
                                </Typography>
                            </div>
                            <div className="text-space">
                                <Typography  variant="h6">
                                    Vendor :  {this.props.productDetails.companyName}
                                </Typography>
                            </div>

                        </div>
                        <div className="data-half-lower">
                            <div className="text-space">
                                <Typography variant="h6">
                                    Quantity : {this.props.productDetails.remainingQuantity}
                                </Typography>
                            </div>
                            <div className="text-space">
                                <Typography  variant="h6">
                                    Category :  {this.props.productDetails.productCategory}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom-desc">
                    <Typography  variant="body2" style={{ padding: "20px 0px" }}>
                        Description : {this.props.productDetails.productDescription}
                    </Typography>
                </div>
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
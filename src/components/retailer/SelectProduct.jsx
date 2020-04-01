import { InputLabel, TextField, Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getProductList, saveProductValue } from '../../redux/actions/RetailerActions';
import { Link } from 'react-router-dom';
import Message from "../utils/Message"

class SelectProduct extends Component {

    constructor(props) {
        super(props)

        this.state = {
            productName: ""
        }
        this.handleChange = this.handleChangeProduct.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }


    componentDidMount() {

        this.props.getProductList();
    }

    handleChangeProduct = (e, value) => {
        console.log(value);
        let productName = value;
        this.setState({ productName });
        //console.log(this.state.productName)
        this.props.saveProductValue(value);
    }


    handleSubmit(e) {
        e.preventDefault();
        this.setState({ isSubmitted: true })
    }

    render() {

        return (

            <div className="box-container">
                <div className="joint-form">
                    <div className="validation-half">
                        <div className="validations">
                            <h3 className="center-h3">Requirements</h3>
                            {this.state.productName.length === "" && <div className="typo-div"><ClearIcon  className = "icon-style" />
                <Typography variant="subtitle2" gutterBottom>
                  Please provide a product name
                </Typography></div>}
                {this.state.productName.length > 0 &&
                <div className="approved-text"><CheckIcon className = "icon-style"/>
                  <Typography variant="subtitle2" gutterBottom>
                    Please provide a product name
                  </Typography></div>}
                        </div>
                    </div>
                    <div className="form-half">
                        <form className="{classes.form}" noValidate >
                            <div>
                                <div className="help-block">
                                    <Typography
                                        color="primary"
                                        component="h1"
                                        variant="h4"
                                        className = "help-block-h4"
                                        >
                                        Select a Product
                                    </Typography>
                                </div>
                            </div>
                            {console.log(this.props.product)}
                            <FormControl variant="outlined" fullWidth>
                                <Autocomplete
                                    id="product-list"
                                    fullWidth
                                    options={this.props.products}
                                    getOptionLabel={(option) => option}
                                    renderInput={(params) => <TextField {...params} label="Product Name" variant="outlined" />}
                                    onChange={this.handleChangeProduct}
                                    name="productName"
                                />
                            </FormControl>
                            {( this.state.productName === "") &&
                                <Link to='/selectproduct'>
                                </Link>}

                            <Link to='/assigntocluster'>
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="{classes.submit} submit-pad"
                                >
                                    Assign Price and Cluster
                                
                                    </Button>
                            </Link>

                            <Link to='/assigntozone'>
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="{classes.submit} submit-pad"
                                    >
                                    Assign Price and Zone
                                    </Button>
                            </Link>

                        </form>
                    </div>
                </div>
        <Message/> 
            </div>
        )
    }
}

const stateAsProps = (store) => ({
    products: store.RetailerReducer.productList,
    product: store.RetailerReducer.product
});
const actionAsProps = {
    getProductList: getProductList,
    saveProductValue: saveProductValue
}
export default connect(stateAsProps, actionAsProps)(SelectProduct);

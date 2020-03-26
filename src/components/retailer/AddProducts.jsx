import { InputLabel, Select, Table } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategories, getProducts, postProductToStore } from '../../redux/actions/RetailerActions';
import './AddProducts.css';
import './Table.css';

class AddProducts extends Component {

    constructor(props) {
        super(props)

        this.state = {
            category: "",
            isSubmitted: false,
            isSelectedCategory: false,
            productList: [],
            object: {},
            numberBoxInputValue: [],
            dummyobject: [{
                productName: "baby",
                quantityAssigned: 20
            }],
            quantityCheck: false

        }
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.loopForm = this.loopForm.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
    }

    updateInputValue(e) {
        const newArray = Array.from(this.state.numberBoxInputValue);
        newArray[e.target.id] = e.target.value;
        this.setState({ numberBoxInputValue: newArray });
        if (e.target.value != null)
            this.setState({ quantityCheck: true });
    }

    componentDidMount() {
        this.props.getAllCategories();
    }

    handleChangeCategory(e) {
        if (e.target.value === "") {
            this.setState({ isSelectedCategory: false });
        }
        else {
            this.setState({ isSelectedCategory: true });
        }
        this.setState({ category: e.target.value })
        this.props.getAllProducts(e.target.value);
    }

    loopForm() {
        let productform = document.getElementById('productform');
        for (var i = 0; i < productform.elements.length; i++) {
            if (productform.elements[i].type === 'checkbox') {
                if (productform.elements[i].checked === true) {
                    let pValue = JSON.parse(productform.elements[i].value);
                    let id = pValue.id;
                    //console.log("id="+id);
                    let quantity = 40;
                    for (var j = 0; j < productform.elements.length; j++) {
                        if (productform.elements[j].type === 'number') {
                            if (productform.elements[j].id === JSON.stringify(id)) {
                                //console.log("id="+id)
                                quantity = productform.elements[j].value
                                //console.log(quantity)
                            }
                        }
                    }
                    //pValue.quantityAssigned=quantity;
                    // this.setState({ object: { productName: pValue.productName } })
                    // this.setState({ object: { quantityAssigned: quantity } })
                    this.state.object.productName=pValue.productName;
                    this.state.object.quantityAssigned=quantity;


                    //console.log(this.state.object)
                    this.state.productList.push(this.state.object);
                }
            }
        }
        this.props.postProductToStore(this.props.zone, this.props.cluster, this.props.store, this.state.productList)
    }

    render() {
        return (

            <div className="box-container" style={{ justifyContent: 'flex-start' , flexDirection : "column" }}>
                <div className="product-form-header" style={{ width: "95%", margin: "40px" , marginBottom : "0px" }}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="category">
                            Enter Category
                        </InputLabel>
                        <Select
                            ref="category"
                            fullWidth
                            native
                            variant="outlined"
                            label="Enter Category"
                            value={this.state.category}
                            onChange={this.handleChangeCategory}
                            inputProps={{
                                name: 'category',
                                id: 'category',
                            }}
                        >
                            <option aria-label="None" value=""></option>
                            {this.props.categories.map((category, index) => {
                                return <option value={category} key={index}>{category}</option>
                            })}
                        </Select>
                    </FormControl>
                </div>
                <div className="product-form-body" style={{ width: "95%", margin: "40px" , marginBottom : "0px" }}>
                    <form id="productform">
                        <TableContainer component={Paper}>
                            <Table  aria-label="a dense table">
                                <TableHead style={{ backgroundColor: "#673ab7" ,color:"white"}}>
                                    <TableRow>
                                        {/* <TableCell>CheckBox</TableCell> */}
                                        <TableCell style = {{color:"White"}}>Product Name</TableCell>
                                        <TableCell style = {{color:"White"}}>Price</TableCell>
                                        <TableCell style = {{color:"White"}}>Vendor Name</TableCell>
                                        <TableCell style = {{color:"White"}}>Quantity Available</TableCell>
                                        <TableCell style = {{color:"White"}}>Quantity Required</TableCell>
                                    </TableRow>
                                </TableHead>

                                <tbody>
                                    {this.props.products.map((product) => {
                                        return <TableRow key={product.id}>
                                            <TableCell>
                                                <FormControlLabel

                                                    control={<input type="checkbox" id={product.id} color="primary" value={JSON.stringify(product)}
                                                    />}
                                                />{product.productName}</TableCell>
                                            <TableCell>{product.productBasePrice}</TableCell>
                                            <TableCell>{product.companyName}</TableCell>
                                            <TableCell>{product.remainingQuantity}</TableCell>
                                            <TableCell>
                                                <input type="number" id={product.id} value={this.state.numberBoxInputValue[product.id]} pattern="[0-9]*" min="0" max={product.remainingQuantity} step="1" onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()} placeholder="To be less than Quantity Available" onChange={this.updateInputValue} ></input>
                                            </TableCell>
                                        </TableRow>
                                    })}
                                </tbody>
                            </Table>
                        </TableContainer>
                        {this.state.quantityCheck &&

                            <Link to="/addproductstostore" style = {{textDecoration : "none"}}>
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="{classes.submit}"
                                    onClick={this.loopForm}
                                    
                                >
                                    ADD PRODUCTS
                                        </Button>
                            </Link>
                        }
                    </form>
                </div>
            </div>

        )
    }
}

const stateAsProps = (store) => ({
    categories: store.RetailerReducer.categories,
    zone: store.RetailerReducer.zone,
    cluster: store.RetailerReducer.cluster,
    store: store.RetailerReducer.store,
    products: store.RetailerReducer.products
});

const actionAsProps = {
    getAllCategories: getCategories,
    getAllProducts: getProducts,
    postProductToStore: postProductToStore
}

export default connect(stateAsProps, actionAsProps)(AddProducts);
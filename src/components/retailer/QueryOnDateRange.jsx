import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import MuiAlert from '@material-ui/lab/Alert';

import {
    InputLabel,
    Select,
    Table,
    Typography
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { connect } from "react-redux";
import {
    getProductsInRange
} from "../../redux/actions/RetailerActions";
import ShowProducts from "./ShowProducts"
class QueryOnDateRange extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: '',
            endDate: '',
            isSubmited: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleSubmit(e) {
        console.log(this.state.startDate, this.state.endDate)
        this.props.getAllProducts(this.state.startDate, this.state.endDate);
        this.setState({ isSubmited: true })
    }

    render() {
        return (
            <div className="box-container">
                <div className="joint-form">
                    <div className="validation-half" style={{ background: "#673ab7" }}>
                        <div className="validations">
                            <h3 style={{ textAlign: "center" }}>Requirements</h3>
                            {this.state.startDate.length == 0 && <div style={{ display: "flex" }}><ClearIcon style={{ paddingRight: "5px", marginTop: "-2px" }} />
                                <Typography variant="subtitle2" gutterBottom>
                                    Enter a valid Start Date
                  </Typography></div>}
                            {this.state.startDate.length != 0 && <div style={{ display: "flex", color: "#ffc107" }}><CheckIcon style={{ paddingRight: "5px", marginTop: "-2px" }} />
                                <Typography variant="subtitle2" gutterBottom>
                                    Enter a valid Start Date
                  </Typography></div>}
                            {this.state.endDate.length == 0 && <div style={{ display: "flex" }}><ClearIcon style={{ paddingRight: "5px", marginTop: "-2px" }} />
                                <Typography variant="subtitle2" gutterBottom>
                                    Enter a valid End Date
                  </Typography></div>}
                            {this.state.endDate.length != 0 && <div style={{ display: "flex", color: "#ffc107" }}><CheckIcon style={{ paddingRight: "5px", marginTop: "-2px" }} />
                                <Typography variant="subtitle2" gutterBottom>
                                    Enter a valid End Date
                  </Typography></div>}
                            {this.state.endDate <= this.state.startDate && <div style={{ display: "flex" }}><ClearIcon style={{ paddingRight: "5px", marginTop: "-2px" }} />
                                <Typography variant="subtitle2" gutterBottom>
                                    End Date has to be greater than Start Date
                  </Typography></div>}
                            {this.state.endDate > this.state.startDate && <div style={{ display: "flex", color: "#ffc107" }}><CheckIcon style={{ paddingRight: "5px", marginTop: "-2px" }} />
                                <Typography variant="subtitle2" gutterBottom>
                                    End Date has to be greater than Start Date
                  </Typography></div>}
                        </div>
                    </div>
                    <div className="form-half">
                        <form className="{classes.form}" noValidate>
                            <div>
                                <div className="help-block">
                                    <Typography
                                        color="primary"
                                        component="h1"
                                        variant="h4"
                                        style=
                                        {{
                                            fontFamily: "font-family: 'Open Sans', sans-serif;"
                                        }}>
                                        Promotions for Products
                                    </Typography>
                                </div>
                            </div>

                            <TextField
                                id="startDate"
                                label="Start Date"
                                name="startDate"

                                fullWidth
                                value={this.state.startDate}
                                type="date"
                                variant="outlined"
                                margin="normal"
                                autoComplete="startDate"
                                required
                                onChange={this.handleChange}
                                autoFocus
                                InputLabelProps={{ shrink: true, required: true }}
                            
                            />
                            <InputLabel htmlFor="category">End Date</InputLabel>
                            <TextField
                                id="endDate"
                                name="endDate"
                                label="End Date"

                                fullWidth
                                value={this.state.endDate}
                                type="date"
                                variant="outlined"
                                margin="normal"
                                autoComplete="endDate"
                                required
                                onChange={this.handleChange}
                                autoFocus
                                InputLabelProps={{ shrink: true, required: true }}
                            />
                            {(this.state.endDate > this.state.startDate) &&
                                <Link to='/showproducts' style={{ textDecoration: "none" }}>
                                    <Button

                                        type="button"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className="{classes.submit}"
                                        style={{
                                            marginTop: "30px",
                                            marginBottom: "30px"
                                        }}
                                        onClick={this.handleSubmit}>show</Button>
                                </Link>
                            }

                        </form>
                    </div>
                </div>

            </div>
        )
    }
}
const stateAsProps = store => ({
    products: store.RetailerReducer.products
}
)
const actionAsProps = {
    getAllProducts: getProductsInRange
}

export default connect(stateAsProps, actionAsProps)(QueryOnDateRange);


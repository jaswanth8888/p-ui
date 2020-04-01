import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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
    constructor(props){
        super(props)
        this.state={
            fromDate:'',
            toDate:'',
            isSubmited:false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this)
    }
      handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
      }   
      handleSubmit(e){
          console.log(this.state.fromDate,this.state.toDate)
          this.props.getAllProducts(this.state.fromDate,this.state.toDate);
          this.setState({isSubmited:true})
      }

    render() {
        return (
            <div>
        <form >
      <TextField
        id="fromDate"
        name="fromDate"
        label="fromDate"
        fullWidth
        value={this.state.fromDate}
        type="date"
        variant="outlined"
        margin="normal"
        autoComplete="fromDate"
        required
        onChange={this.handleChange}
        autoFocus
       /*  InputLabelProps={{
          shrink: true,
        }} */
      />
      <TextField
        id="toDate"
        name="toDate"
        label="toDate"
        fullWidth
       value={this.state.toDate}
       type="date"
        variant="outlined"
        margin="normal"
        autoComplete="fromDate"
        required
        onChange={this.handleChange}
        autoFocus
       /*  InputLabelProps={{
          shrink: true,
        }} */
      />
      <Button
       type="button"
       fullWidth
       variant="contained"
       color="primary"
       className="{classes.submit}"
       style={{ marginTop: "30px",
                marginBottom:"30px"
     }}
       onClick={this.handleSubmit}>show</Button>
    </form>
   {this.state.isSubmited && this.state.toDate!=null && this.state.fromDate!=null && 
    <ShowProducts products={this.props.products}></ShowProducts> 
    }
            </div>
        )
    }
} 
const stateAsProps = store => ({
    products:store.RetailerReducer.products
}
)
const actionAsProps={
    getAllProducts:getProductsInRange
}

export default connect(stateAsProps, actionAsProps)(QueryOnDateRange);
  
 
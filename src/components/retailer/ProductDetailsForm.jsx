import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ClearIcon from '@material-ui/icons/Clear';
import { InputLabel, TextField, Typography } from "@material-ui/core";
import { Table } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from "react-redux";
import MenuItem from '@material-ui/core/MenuItem';
import CheckIcon from '@material-ui/icons/Check';


class ProductDetailsForm extends Component{
    constructor(props){
        super(props)

        this.state={
            productName:"",
            productBasePrice: "",
            productVendor: "",
            productQuantity: "",
            productImages: "" ,
            productDescription: "",
            productCategory: "",
            AssignedClusterName: "",
            AssignedClusterQuantity: "",
            AssignedClusterPrice: "",
            AssignedClusterProfitPercentage: "",
            MinimunSellingPrice:""

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        let productName = this.state.productName;
        let productBasePrice = this.state.productBasePrice;
        let productVendor = this.state.productVendor;
        let productQuantity = this.state.productQuantity;
        let productImages = this.state.productImages;
        let productDescription = this.state.productDescription;
        let productCategory = this.state.productCategory;
        let AssignedClusterName = this.state.AssignedClusterName;
        let AssignedClusterQuantity = this.state.AssignedClusterQuantity;
        let AssignedClusterPrice = this.state.AssignedClusterPrice;
        let AssignedClusterProfitPercentage = this.state.AssignedClusterProfitPercentage;
        let MinimunSellingPrice = this.state.MinimunSellingPrice;
        return <Redirect to='/ViewPage'>View</Redirect>
    }


    render() {
      return (
        <div className="box-container store-form">
  
          <div className="joint-form" style={{ width: "850px" }}>
            <Typography
              color="primary"
              component="h1"
              variant="h4"
              style=
              {{
                fontFamily: "font-family: 'Open Sans', sans-serif;",
                position: "absolute",
                top: "200px",
                left: "250px"
              }}>
              Assign Product to Cluster
                  </Typography>
          

             
           
              <form className="{classes.form}" noValidate >
                
                <FormControl style={{top: 265, alignSelf:'center'}}>
               <InputLabel id="demo-simple-select-label" style={{left:250}}>Cluster Name</InputLabel>
               <Select
             labelId="demo-simple-select-label"
             id="demo-simple-select"
             style={{width: "350px", left:250}}
             value={this.state.AssignedClusterName}
             onChange={this.handleChange}
               >
                 <MenuItem value={10}>Arizona</MenuItem>  {/*hard-coded*/}
                 <MenuItem value={20}>California</MenuItem>
                 <MenuItem value={30}>NewYork</MenuItem>


                 {/* <option aria-label="None" value="" />
                   {this.props.ZoneClusterNames.map((ZoneClusterName, index) => {
                     return <option value={ClusterName} key={index}>{ZoneClusterName}</option>
                   })} */}
                  </Select>
               </FormControl>

               

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="clusterQuantity"
                  label="ClusterQuantity"
                  name="clusterQuantity"
                  style={{top:425, width: 350, right:100}}
                  type = "number"
                  onChange={this.state.handleChange}
                 // value={this.state.AssignedClusterQuantity}
                  autoFocus
                />

                  <TextField
                   variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="clusterProfitPercentage"
                 label="ClusterProfitPercentage"
                  name="clusterProfitPercentage"
                   style={{top: 250, width:350, left:250}}
                  type = "number"
                //  onChange={this.state.handleChange}
                 // value={this.state.AssignedClusterProfitPercentage}
                  autoFocus
                />
  
              
              <Button
                type="button"
                variant="contained"
                color="primary"
                className="{classes.submit}"
                id="store-submit-btn"
                style={{ marginTop: "30px", width:30, top:500}}
                onClick={this.handleSubmit}
              >
                Save
                </Button>
      
              </form>
         
            {/* </div> */}
            <div className="store-requirement">
              <h3 style={{ textAlign: "center" }}>Requirements</h3>

              {/* {this.state.AssignedClusterPrice <= this.state.MinimunSellingPrice && <div style={{ display: "flex" }}><ClearIcon style={{ paddingRight: "5px", marginTop: "-2px" }} />
                <Typography variant="subtitle2" gutterBottom>
                  Assigned cluster price should be greater than the minimum selling price of the cluster
                </Typography></div>} */}

              {this.state.AssignedClusterQuantity >= this.state.productQuantity &&
                <div style={{ display: "flex", color: "#ffc107" }}><CheckIcon style={{ paddingRight: "5px", marginTop: "-2px" }} />
                  <Typography variant="subtitle2" gutterBottom>
                    Assigned quantity for the cluster should be less than the quantity available
                </Typography></div>}
                
            </div>
          </div>
         
  
        </div>
      )
    }
  }



export default connect(null)(ProductDetailsForm);
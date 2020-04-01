import { InputLabel, Select, TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Snackbar from '@material-ui/core/Snackbar';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import MuiAlert from '@material-ui/lab/Alert';
import { Component, default as React, Fragment } from "react";
import { connect } from "react-redux";
import { getZones, assignToZone } from "../../redux/actions/RetailerActions";
import ProductDetails from "../utils/ProductDetails";

class AssignToZone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmitted: false,
      zoneName:"",
      zoneDetails:{
      }
    };
    

    this.handleChangeZoneName = this.handleChangeZoneName.bind(this);
    this.handleChangeProfitPecentage=this.handleChangeProfitPecentage.bind(this);
    this.handleChangeQuantity=this.handleChangeQuantity.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);

  }
  componentDidMount() {
    this.props.getZones()
  }

  handleChangeZoneName(e) {
    this.setState({ zoneName:e.target.value })
  }

  handleChangeQuantity(e) {
    let dquantity=e.target.value
    this.state.zoneDetails.quantity=dquantity
  }
  handleChangeProfitPecentage(e) {
    let dpercentage=e.target.value
    this.state.zoneDetails.percentage=dpercentage
  }
  
  handleSubmit(e){
    e.preventDefault();
    this.props.assignToZone(this.state.zoneDetails,this.state.zoneName,this.props.productName)
    console.log(this.state.zoneDetails);
    console.log(this.state.zoneName);
    console.log(this.props.productName);

  }

  render() {
    return (


      <div className="box-container-start store-form">
        {/* {console.log(this.state.zoneDetails)}
    {console.log(this.state.zoneName)}
    {console.log(this.props.productName)} */}
        <div className="joint-form-assign">
        <Typography
            color="primary"
            component="h1"
            variant="h4"
            style=
            {{
              fontFamily: "font-family: 'Open Sans', sans-serif;",
              position: "absolute",
              top: "190px",
              left: "25px",
              width:"100%",
              marginLeft:"auto"
            }}>
            Assign Product to Zone
          </Typography>
          <div className="product-details">
            <ProductDetails></ProductDetails>
          </div>
          <div className="form-full-center">

            <form className="{classes.form}" noValidate style = {{width:"95%"}} >

              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-age-native-simple">Enter Zone</InputLabel>
                <Select
                  ref="zone"
                  fullWidth
                  native
                  value={this.state.zoneNam}
                  onChange={this.handleChangeZoneName}
                  label="Enter zone"
                  inputProps={{
                    name: 'zone',
                    id: 'zone',
                  }}
                >
                  <option aria-label="None" value="" />
                  {this.props.zones.map((zone, index) => {
                    return <option value={zone} key={index}>{zone}</option>
                  })}
                </Select>
              </FormControl>

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="zoneQuantity"
                label="zoneQuantity"
                name="zoneQuantity"
                type="number"
                onChange={this.handleChangeQuantity}
                value={this.state.zoneDetails.quantity}
                autoFocus
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="zoneProfitPercentage"
                label="zoneProfitPercentage"
                name="zoneProfitPercentage"
                type="number"
                onChange={this.handleChangeProfitPecentage}
                value={this.state.zoneDetails.percentage}
                autoFocus
              />
            
              <Button
                fullWidth
                type="button"
                variant="contained"
                color="primary"
                className="{classes.submit}"
                onClick={this.handleSubmit}
                style = {{marginTop : "10px"}}
              >
                Save
              </Button>
              
            </form>

          </div>
          <div className="store-requirement">
            <h3 style={{ textAlign: "center" }}>Requirements</h3>
            {this.state.zoneName.length <= 5 && <div style={{ display: "flex" }}><ClearIcon style={{ paddingRight: "5px", marginTop: "-2px" }} />
              <Typography variant="subtitle2" gutterBottom>
                Zone name has to be greater than 5 letters
              </Typography></div>}
            {this.state.zoneName.length > 5 &&
              <div style={{ display: "flex", color: "#ffc107" }}><CheckIcon style={{ paddingRight: "5px", marginTop: "-2px" }} />
                <Typography variant="subtitle2" gutterBottom>
                  Zone name has to be greater than 5 letters
              </Typography></div>}

          </div>
        </div>
        <Fragment>

          {(this.state.status === 1) ? (
            <div>
              <Snackbar open="true" autoHideDuration={2000}>
                <MuiAlert elevation={6} variant="filled">
                  Price Assigned Successfully!
            </MuiAlert>
              </Snackbar>
            </div>
          ) : (<div />)}
        </Fragment>
        <Fragment>
          {(this.state.status === -1) ? (
            <div>
              <Snackbar open="true" autoHideDuration={2000}>
                <MuiAlert severity="error" elevation={6} variant="filled">
                  Price assign failed. Please match the requirements
                </MuiAlert>
              </Snackbar>
            </div>) : (<div />)
          }
        </Fragment>

      </div>
    );
  }
}

const stateAsProps = (store)=> ({
  zones: store.RetailerReducer.zones,
  productName:store.RetailerReducer.productName
});

const actionAsProps = {
  getZones: getZones,
  assignToZone: assignToZone
};

export default connect(stateAsProps, actionAsProps)(AssignToZone);

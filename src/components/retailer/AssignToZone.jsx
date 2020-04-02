import { InputLabel, Select, TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Snackbar from '@material-ui/core/Snackbar';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import MuiAlert from '@material-ui/lab/Alert';
import { Component, default as React, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { getZones, assignToZone } from "../../redux/actions/RetailerActions";
import ProductDetails from "../utils/ProductDetails";
import ViewAssignedZones from "./ViewAssignedZones"
import Message from "../utils/Message"

class AssignToZone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmitted: false,
      zoneName: "",
      zoneDetails: {
      }
    };

    this.handleChangeZoneName = this.handleChangeZoneName.bind(this);
    this.handleChangeProfitPecentage = this.handleChangeProfitPecentage.bind(this);
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  componentDidMount() {
    this.props.getZones()
  }

  handleChangeZoneName(e) {
    this.setState({ zoneName: e.target.value })
  }

  handleChangeQuantity(e) {
    let dquantity = e.target.value
    this.state.zoneDetails.quantityAssigned = dquantity
  }
  handleChangeProfitPecentage(e) {
    let dpercentage = e.target.value
    this.state.zoneDetails.profitPercentage = dpercentage
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    this.props.assignToZone(this.state.zoneDetails, this.state.zoneName, this.props.productName)
    this.props.history.push("/view/assigned/zones")
  }

  render() {
    return (
      <Router>
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
                width: "100%",
                marginLeft: "auto"
              }}>
              Assign Product to Zone
          </Typography>
            <div className="product-details">
              <ProductDetails></ProductDetails>
            </div>
            <div className="form-full-center">

              <form className="{classes.form}" noValidate style={{ width: "95%" }} >

                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-age-native-simple">Enter Zone</InputLabel>
                  <Select
                    ref="zone"
                    fullWidth
                    native
                    //value={this.state.zoneName}
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
                  value={this.state.zoneDetails.quantityAssigned}
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
                  value={this.state.zoneDetails.profitPercentage}
                  autoFocus
                />


                  <Button
                    fullWidth
                    type="button"
                    variant="contained"
                    color="primary"
                    className="{classes.submit}"
                    onClick={this.handleSubmit}
                    style={{ marginTop: "10px" }}
                  >
                    Save
              </Button>


              </form>

            </div>
          </div>
          
          {}
          <Message />


        </div>
        <Switch>
          {/* <Route exact={true} path="/selectproduct" component={SelectProduct} />
          <Route exact={true} path="/assigntozone" component={AssignToZone} /> */}
          <Route exact path="/viewassignedzones" component={ViewAssignedZones}></Route>
        </Switch>
      </Router>
    );
  }
}

const stateAsProps = (store) => ({
  zones: store.RetailerReducer.zones,
  productName: store.RetailerReducer.productName
});

const actionAsProps = {
  getZones: getZones,
  assignToZone: assignToZone
};

export default connect(stateAsProps, actionAsProps)(AssignToZone);

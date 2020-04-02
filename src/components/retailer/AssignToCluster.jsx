import { InputLabel, Select, TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Snackbar from '@material-ui/core/Snackbar';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import MuiAlert from '@material-ui/lab/Alert';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Component, default as React, Fragment } from "react";
import { connect } from "react-redux";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getZoneClusterNames, assignToCluster } from "../../redux/actions/RetailerActions";
import ProductDetails from "../utils/ProductDetails";



class AssignToCluster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zoneclustername: "",
      zonecluster: "",
      isSubmitted: false,
      clusterName: "",
      zoneName: "",
      clusterDetails: {}
    };


    this.handleChangeCluster = this.handleChangeCluster.bind(this);
    this.handleChangeClusterName = this.handleChangeClusterName.bind(this);
    this.handleChangeProfitPecentage = this.handleChangeProfitPecentage.bind(this);
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChangeCluster(e) {
    console.log(e.target.value);
    this.setState({ zonecluster: e.target.value })
    this.props.getZoneClusterNames(e.target.value)

  }

  handleChangeClusterName(e) {

    console.log("Hi")
    console.log(e.target.value)
    //this.state.zoneclustername=e.target.value
    //this.setState({ zoneclustername: e.target.value })

    this.setState({ zoneclustername: e.target.value }, () => console.log(this.state))
    let names = String(e.target.value).split("/");
    this.setState({ zoneName: names[0] })
    this.setState({ clusterName: names[1] })
    console.log(names[1])
    console.log(names[0])

    // this.state.clusterName=names[1]
    // this.state.zoneName=names[0]
    console.log(this.state)
  }

  handleChangeQuantity(e) {
    let dquantity = e.target.value
    this.state.clusterDetails.quantityAssigned = dquantity
    console.log(this.state.quantityAssigned)
  }
  handleChangeProfitPecentage(e) {
    let dpercentage = e.target.value
    this.state.clusterDetails.profitPercentage = dpercentage
  }
  componentWillMount() {
    this.props.getZoneClusterNames()
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.clusterDetails)
    this.props.assignToCluster(this.state.clusterDetails, this.state.zoneName, this.state.clusterName, this.props.productName)
  }

  render() {
    return (
      <div className="box-container-start store-form">
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
            Assign Product to Cluster
            </Typography>
          <div className="product-details">
            <ProductDetails></ProductDetails>
          </div>
          <div className="form-full-center">
            <form className="{classes.form}" noValidate >
              {/* <FormControl variant="outlined" fullWidth> */}

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="zonecluster"
                label="ClusterName"
                name="zonecluster"
                onChange={this.handleChangeCluster}
                value={this.state.zonecluster}
                autoFocus
              />
              <FormControl variant="outlined" fullWidth>
                <Select
                  ref="cluster"
                  fullWidth
                  native
                  value={this.state.zoneclustername}
                  onChange={this.handleChangeClusterName}
                  label="Enter Cluster"

                  name='zoneclustername'
                  id='zoneclustername'
                >
                  <option aria-label="None" />
                  {this.props.zoneclusternames.map((zoneclustername, index) => {
                    return <option value={zoneclustername} key={index}>{zoneclustername}</option>
                  })}
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
                type="number"
                onChange={this.handleChangeQuantity}
                value={this.state.clusterDetails.quantityAssigned}
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
                type="number"
                onChange={this.handleChangeProfitPecentage}
                value={this.state.clusterDetails.profitPercentage}
                autoFocus
              />
              <Link to='/view/assigned/zones'>
                <Button
                  fullWidth
                  type="button"
                  variant="contained"
                  color="primary"
                  className="{classes.submit} submit-pad"
                  onClick={this.handleSubmit}
                >
                  Save
              </Button>
              </Link>
            </form>
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
        </div >
    );
  }
}

const stateAsProps = store => ({
  zoneclusternames: store.RetailerReducer.zoneclusternames,
  productName: store.RetailerReducer.productName
});

const actionAsProps = {
  getZoneClusterNames: getZoneClusterNames,
  assignToCluster: assignToCluster
};

export default connect(stateAsProps, actionAsProps)(AssignToCluster);

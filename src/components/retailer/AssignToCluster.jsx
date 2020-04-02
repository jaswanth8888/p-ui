import { Select, TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Component, default as React, Fragment } from "react";
import { connect } from "react-redux";
import {
  assignToCluster,
  getZoneClusterNames
} from "../../redux/actions/RetailerActions";
import ProductDetails from "../utils/ProductDetails";
import Message from "../utils/Message";

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
    this.handleChangeProfitPecentage = this.handleChangeProfitPecentage.bind(
      this
    );
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeCluster(e) {
    console.log(e.target.value);
    this.setState({ zonecluster: e.target.value });
    this.props.getZoneClusterNames(e.target.value);
  }

  handleChangeClusterName(e) {
    console.log("Hi");
    console.log(e.target.value);
    //this.state.zoneclustername=e.target.value
    //this.setState({ zoneclustername: e.target.value })

    this.setState({ zoneclustername: e.target.value }, () =>
      console.log(this.state)
    );
    let names = String(e.target.value).split("/");
    this.setState({ zoneName: names[0] });
    this.setState({ clusterName: names[1] });
    console.log(names[1]);
    console.log(names[0]);

    // this.state.clusterName=names[1]
    // this.state.zoneName=names[0]
    console.log(this.state);
  }

  handleChangeQuantity(e) {
    let dquantity = e.target.value;
    this.state.clusterDetails.quantityAssigned = dquantity;
    console.log(this.state.quantityAssigned);
  }
  handleChangeProfitPecentage(e) {
    let dpercentage = e.target.value;
    this.state.clusterDetails.profitPercentage = dpercentage;
  }
  componentWillMount() {
    this.props.getZoneClusterNames();
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.clusterDetails);
    this.props.assignToCluster(
      this.state.clusterDetails,
      this.state.zoneName,
      this.state.clusterName,
      this.props.productName
    );
    this.props.history.push("/view/assigned/clusters");
  };

  render() {
    return (
      <div className="box-container">
        <div className="joint-form-large">
          <ProductDetails />
          <div className="product-form-body">
            <Typography className="card-header" variant="h4">
              Assign to Cluster
            </Typography>
            <form className="{classes.form}" noValidate>
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
                  name="zoneclustername"
                  id="zoneclustername"
                >
                  <option aria-label="None" />
                  {this.props.zoneclusternames.map((zoneclustername, index) => {
                    return (
                      <option value={zoneclustername} key={index}>
                        {zoneclustername}
                      </option>
                    );
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
            </form>
          </div>
        </div>
        <Message />
      </div>
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

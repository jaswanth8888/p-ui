import {
  InputLabel,
  Select,
  Table,
  TextField,
  Typography
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { Component } from "react";
import { connect } from "react-redux";
import MenuItem from '@material-ui/core/MenuItem';
import "./AddProducts.css";
import "./Table.css";
import ProductDetails from "../utils/ProductDetails";
import CheckIcon from '@material-ui/icons/Check';
import "./StoreForm.css";
import { getZoneClusterNames } from "../../redux/actions/RetailerActions";

class AssignToCluster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zoneclustername: "",
      quantity:"",
      percentage:""
    };

    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(e) {
    console.log(this.state.zoneclustername)
    this.setState({ zoneclustername: e.target.value })
}
  componentDidMount() {
    this.props.getZoneClusterNames()
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

                  <ProductDetails></ProductDetails>
          <form className="{classes.form}" noValidate >

            <FormControl style={{ top: 265, alignSelf: 'center' }}>
              <InputLabel id="demo-simple-select-label" style={{ left: 250 }}>Cluster Name</InputLabel>
              <Select

                style={{ width: "350px", left: 250 }}
                value={this.state.zoneclustername}
                onChange={this.handleChange}
                label="Cluster"
                inputProps={{
                  name: 'cluster',
                  id: 'cluster',
                }}
              >
                <option aria-label="None" value="" />
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
              style={{ top: 425, width: 350, right: 100 }}
              type="number"
              onChange={this.handleChangeQuantity}
              value={this.state.quantity}
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
              style={{ top: 250, width: 350, left: 250 }}
              type="number"
              onChange={this.handleChangePercentage}
              value={this.state.AssignedClusterProfitPercentage}
              autoFocus
            />
            <Button
              type="button"
              variant="contained"
              color="primary"
              className="{classes.submit}"
              id="store-submit-btn"
              style={{ marginTop: "30px", width: 30, top: 500 }}
              onClick={this.handleSubmit}
            >
              Save
                </Button>
          </form>
          <div className="store-requirement">
            <h3 style={{ textAlign: "center" }}>Requirements</h3>
            {this.state.AssignedClusterQuantity >= this.state.productQuantity &&
              <div style={{ display: "flex", color: "#ffc107" }}><CheckIcon style={{ paddingRight: "5px", marginTop: "-2px" }} />
                <Typography variant="subtitle2" gutterBottom>
                  Assigned quantity for the cluster should be less than the quantity available
                </Typography></div>}

          </div>
        </div>


      </div>

    );
  }
}

const stateAsProps = store => ({
  zoneclusternames: store.RetailerReducer.zoneclusternames
});

const actionAsProps = {
  getZoneClusterNames: getZoneClusterNames
};

export default connect(stateAsProps, actionAsProps)(AssignToCluster);

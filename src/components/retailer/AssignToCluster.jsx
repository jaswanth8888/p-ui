import { InputLabel, Select, TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Snackbar from '@material-ui/core/Snackbar';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import MuiAlert from '@material-ui/lab/Alert';
import { Component, default as React, Fragment } from "react";
import { connect } from "react-redux";
import { getZoneClusterNames } from "../../redux/actions/RetailerActions";
import './AssignToCluster.css'
import ProductDetails from "../utils/ProductDetails";

class AssignToCluster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zoneclustername: "",
      quantity: "",
      percentage: ""
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
              width:"100%",
              marginLeft:"auto"
            }}>
            Assign Product to Cluster
          </Typography>
          <div className="product-details">
            <ProductDetails></ProductDetails>
          </div>
          <div className="form-full-center">

            <form className="{classes.form}" noValidate style = {{width:"95%"}} >

              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-age-native-simple">Enter Cluster</InputLabel>
                <Select
                  ref="cluster"
                  fullWidth
                  native
                  value={this.state.zoneclustername}
                  onChange={this.handleChange}
                  label="Enter Cluster"
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
                type="number"
                onChange={this.handleChangePercentage}
                value={this.state.AssignedClusterProfitPercentage}
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
            {this.state.zoneclustername.length <= 5 && <div style={{ display: "flex" }}><ClearIcon style={{ paddingRight: "5px", marginTop: "-2px" }} />
              <Typography variant="subtitle2" gutterBottom>
                Store name has to be greater than 5 letters
              </Typography></div>}
            {this.state.zoneclustername.length > 5 &&
              <div style={{ display: "flex", color: "#ffc107" }}><CheckIcon style={{ paddingRight: "5px", marginTop: "-2px" }} />
                <Typography variant="subtitle2" gutterBottom>
                  Store name has to be greater than 5 letters
              </Typography></div>}

          </div>
        </div>
        <Fragment>

          {(this.state.status === 1) ? (
            <div>
              <Snackbar open="true" autoHideDuration={2000}>
                <MuiAlert elevation={6} variant="filled">
                  Store created successfully!
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
                  Store creation failed. Please match the requirements
                </MuiAlert>
              </Snackbar>
            </div>) : (<div />)
          }
        </Fragment>

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

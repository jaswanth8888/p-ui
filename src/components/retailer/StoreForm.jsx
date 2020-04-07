import { InputLabel, Select, TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Snackbar from "@material-ui/core/Snackbar";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import MuiAlert from "@material-ui/lab/Alert";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  getClusters,
  getZones,
  postStore
} from "../../redux/actions/RetailerActions";

class StoreForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zone: "",
      cluster: "",
      isSubmitted: false,
      storeName: "",
      city: "",
      streetName: "",
      pin: "",
      status: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChangeStore = this.handleChangeStore.bind(this);
    this.handleChangeZone = this.handleChangeZone.bind(this);
  }

  componentWillMount() {
    this.props.history.push("/store");
  }

  componentDidMount() {
    this.props.getAllZones();
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  handleChangeZone(e) {
    this.setState({ zone: e.target.value });
    this.props.getAllClusters(e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { streetName } = this.state;
    const { city } = this.state;
    const { pin } = this.state;
    const address = {
      streetName,
      city,
      pin
    };
    const { storeName } = this.state;
    const store = { storeName, address };
    this.props.postStore(store, this.state.zone, this.state.cluster);
    if (this.state.storeName.length > 6) {
      this.setState({ status: 1 });
    } else {
      this.setState({ status: -1 });
    }
  }

  render() {
    return (
      <div className="box-container">
        <div className="joint-form-assign flex-column">
          <div className="store-requirement">
            <h3 className="center-h3">Requirements</h3>
            {this.state.storeName.length <= 5 && (
              <div className="typo-div">
                <ClearIcon className="icon-style" />
                <Typography variant="subtitle2" gutterBottom>
                  Store name has to be greater than 5 letters
                </Typography>
              </div>
            )}
            {this.state.storeName.length > 5 && (
              <div className="approved-text">
                <CheckIcon className="icon-style" />
                <Typography variant="subtitle2" gutterBottom>
                  Store name has to be greater than 5 letters
                </Typography>
              </div>
            )}
          </div>
          <div>
            <div className="help-block">
              <Typography
                color="primary"
                component="h1"
                variant="h4"
                className="special-store-help"
              >
                Create a Store
              </Typography>
            </div>
          </div>
          <div className="advanced-form-container">
            <div className="form-first-half">
              <form className="{classes.form}" noValidate>
                <FormControl margin="normal" variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Enter Zone
                  </InputLabel>
                  <Select
                    ref="zone"
                    fullWidth
                    native
                    value={this.state.zone}
                    onChange={this.handleChangeZone}
                    label="Enter Zone"
                    inputProps={{
                      name: "zone",
                      id: "zone"
                    }}
                  >
                    <option aria-label="None" value="" />
                    {this.props.zones.map((zone, index) => {
                      return (
                        <option value={zone} key={index}>
                          {zone}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>

                <FormControl margin="normal" variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Enter Cluster
                  </InputLabel>
                  <Select
                    ref="cluster"
                    fullWidth
                    native
                    value={this.state.cluster}
                    onChange={this.handleChange}
                    label="Enter Cluster"
                    inputProps={{
                      name: "cluster",
                      id: "cluster"
                    }}
                  >
                    <option aria-label="None" value="" />
                    {this.props.clusters.map((cluster, index) => {
                      return (
                        <option value={cluster} key={index}>
                          {cluster}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>

                <TextField
                  ref="storeName"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="storeName"
                  label="Store Name"
                  name="storeName"
                  autoComplete="storeName"
                  onChange={this.handleChange}
                  value={this.state.storeName}
                  autoFocus
                />
              </form>
            </div>
            <div className="form-second-half">
              <form className="{classes.form}" noValidate>
                <TextField
                  ref="streetName"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="streetName"
                  label="Street name"
                  autoComplete="streetName"
                  id="streetName"
                  onChange={this.handleChange}
                  value={this.state.streetName}
                />
                <TextField
                  ref="city"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="city"
                  label="City"
                  id="city"
                  onChange={this.handleChange}
                  autoComplete="city"
                  value={this.state.city}
                />
                <TextField
                  ref="pin"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="pin"
                  label="Pin-code"
                  type="number"
                  id="pin"
                  onChange={this.handleChange}
                  autoComplete="pin"
                  value={this.state.pin}
                />
              </form>
            </div>
          </div>
          <div id="store-submit-btn">
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className="{classes.submit}"
              onClick={this.handleSubmit}
              id="store-form-submit"
            >
              Save
            </Button>
          </div>
        </div>
        <>
          {this.state.status === 1 ? (
            <div>
              <Snackbar open="true" autoHideDuration={2000}>
                <MuiAlert elevation={6} variant="filled">
                  Store created successfully!
                </MuiAlert>
              </Snackbar>
            </div>
          ) : (
            <div />
          )}
        </>
        <>
          {this.state.status === -1 ? (
            <div>
              <Snackbar open="true" autoHideDuration={2000}>
                <MuiAlert severity="error" elevation={6} variant="filled">
                  Store creation failed. Please match the requirements
                </MuiAlert>
              </Snackbar>
            </div>
          ) : (
            <div />
          )}
        </>
      </div>
    );
  }
}
const stateAsProps = store => ({
  zones: store.RetailerReducer.zones,
  clusters: store.RetailerReducer.clusters
});
const actionAsProps = {
  getAllZones: getZones,
  getAllClusters: getClusters,
  postStore
};
export default connect(stateAsProps, actionAsProps)(StoreForm);

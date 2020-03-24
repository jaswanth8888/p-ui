import { Avatar, Box, Grid, InputLabel, Select, TextField, Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getClusters, getZones, postStore } from '../../redux/actions/RetailerActions';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import "./StoreForm.css"

class StoreForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      zone: "",
      cluster: "",
      isSubmitted: false,
      storeName: "",
      city: "",
      streetName: "",
      pin: ""

    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChangeStore = this.handleChangeStore.bind(this);
    this.handleChangeZone = this.handleChangeZone.bind(this);
  }

  componentDidMount() {
    this.props.getAllZones();
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({ [name]: value });

  }

  handleChangeZone(e) {
    this.setState({ zone: e.target.value })
    this.props.getAllClusters(e.target.value);

  }

  handleSubmit(e) {
    e.preventDefault();
    let streetName = this.state.streetName;
    let city = this.state.city;
    let pin = this.state.pin;
    let address = {
      streetName, city, pin
    }
    let storeName = this.state.storeName;
    let store = { storeName, address }
    this.props.postStore(store, this.state.zone, this.state.cluster);
    this.setState({ isSubmitted: true })
  }

  render() {
    if (this.state.isSubmitted && this.state.storeName && this.state.zone && this.state.cluster && this.state.streetName && this.state.city && this.state.pin) {
      return <Redirect to='/welcome' />
    }
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
              top: "210px",
              left: "30px"
            }}>
            Create Store
                </Typography>
          {/* <div className="validation-half" style={{ background: "#673ab7" }}>
            <div className="validations">

            </div>
          </div> */}
          <div className="form-first-half">
            <form className="{classes.form}" noValidate >
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-age-native-simple">Enter Zone</InputLabel>
                <Select
                  ref="zone"
                  fullWidth
                  native
                  value={this.state.zone}
                  onChange={this.handleChangeZone}
                  label="Enter Zone"
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
              <br /><br />

              <FormControl variant="outlined" fullWidth style={{ marginBottom: "10px" }}>
                <InputLabel htmlFor="outlined-age-native-simple">Enter Cluster</InputLabel>
                <Select
                  ref="cluster"
                  fullWidth
                  native
                  value={this.state.cluster}
                  onChange={this.handleChange}
                  label="Enter Cluster"
                  inputProps={{
                    name: 'cluster',
                    id: 'cluster',
                  }}
                >
                  <option aria-label="None" value="" />
                  {this.props.clusters.map((cluster, index) => {
                    return <option value={cluster} key={index}>{cluster}</option>
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
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className="{classes.submit}"
                style={{ marginTop: "30px", pointerEvents: "none", opacity: "0" }}
                onClick={this.handleSubmit}>
                Save
            </Button>
            </form>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className="{classes.submit}"
              id="store-submit-btn"
              style={{ marginTop: "30px" }}
              onClick={this.handleSubmit}
            >
              Save
              </Button>
          </div>
          <div className="form-second-half">
            <form className="{classes.form}" noValidate >
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
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className="{classes.submit}"
                style={{ marginTop: "30px", pointerEvents: "none", opacity: "0" }}
                onClick={this.handleSubmit}>
                Save
            </Button>
            </form>
          </div>
          <div className="store-requirement">
            <h3 style={{ textAlign: "center" }}>Requirements</h3>
            {this.state.storeName.length <= 5 && <div style={{ display: "flex" }}><ClearIcon style={{ paddingRight: "5px", marginTop: "-2px" }} />
              <Typography variant="subtitle2" gutterBottom>
                Store name has to be greater than 5 letters
              </Typography></div>}
            {this.state.storeName.length > 5  &&
              <div style={{ display: "flex", color: "#ffc107" }}><CheckIcon style={{ paddingRight: "5px", marginTop: "-2px" }} />
                <Typography variant="subtitle2" gutterBottom>
                Store name has to be greater than 5 letters
              </Typography></div>}
          </div>
        </div>
      </div>
    )
  }
}
const stateAsProps = (store) => ({
  zones: store.RetailerReducer.zones,
  clusters: store.RetailerReducer.clusters
});
const actionAsProps = {
  getAllZones: getZones,
  getAllClusters: getClusters,
  postStore: postStore
}
export default connect(stateAsProps, actionAsProps)(StoreForm);
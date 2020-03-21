import { Avatar, Box, Grid, InputLabel, Select, TextField, Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getClusters, getZones, postStore } from '../../redux/actions/RetailerActions';

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
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "110vh", marginTop: "-80px" }}

        >

          <Grid item xs={6} style={{
            borderRadius: "4px",
            boxShadow: "0px 10px 17px 6px rgba(0,0,0,0.24)",
            padding: "40px",
            position: "relative"
          }}>
            <Box p={1}>
              <Avatar style={{
                background: "#C60078",
                marginLeft: "10px",
                padding: "30px",
                position: "absolute",
                top: "-50px",
                left: "-50px",
                right: "0px",
                marginRight: "auto",

              }}>
                <ShoppingCartIcon color="white" style={{
                  fontSize: "48px"
                }} />
              </Avatar>
            </Box>
            <Typography component="h1" variant="h4" color="primary">
                  Zone and Cluster 
                </Typography>
            <form className="{classes.form}">
              <Typography component="div" color="error" variant="p">
                {this.state.isSubmitted && !this.state.storeName && !this.state.zone && !this.state.cluster && !this.state.streetName && !this.state.city && !this.state.pin &&
                  <div className="help-block">Sorry please enter the details in the form</div>}
                <br />
              </Typography>
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
              
              <FormControl variant="outlined" fullWidth style = {{marginBottom : "10px"}}>
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
              <hr style = {{
                margin : "10px 0px",
                borderColor : "white"
              }}></hr>
              <Grid>
                <Typography component="h1" variant="h4" color="primary">
                  Address 
                </Typography>
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
              </Grid>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: "30px" }}
                className="{classes.submit}"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </form>
          </Grid>
        </Grid>

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
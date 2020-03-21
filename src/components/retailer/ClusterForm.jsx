import React, { Component } from 'react'
import { Avatar, Box, Grid, TextField, Typography, InputLabel, NativeSelect } from "@material-ui/core";
import { getZones, postCluster } from '../../redux/actions/RetailerActions'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import StoreIcon from '@material-ui/icons/Store';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

class ClusterForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      zone: "",
      clusterName: "",
      taxRate: "",
      isSubmitted: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }


  componentDidMount() {

    this.props.getAllZones();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });

  }

  handleSubmit(e) {
    e.preventDefault();
    let cluster = { clusterName: this.state.clusterName, taxRate: this.state.taxRate }
    this.setState({ isSubmitted: true })
    if (this.state.clusterName.length > 6) {
      this.props.postCluster(cluster, this.state.zone)
    }
  }

  render() {

    if (this.state.isSubmitted && this.state.zone && this.state.clusterName) {
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
          style={{ minHeight: "110vh", marginTop: "-150px" }}
        >
          <Grid item xs={6} style={{
            borderRadius: "4px",
            boxShadow: "0px 10px 17px 6px rgba(0,0,0,0.24)",
            padding: "40px",
            position: "relative"
          }} >
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
                <StoreIcon color="white" style={{
                  fontSize: "48px"
                }} />
              </Avatar>
            </Box>
            <form className="{classes.form}">
              <Typography color="primary" component="h1" variant="h4" style={{ fontFamily: "font-family: 'Open Sans', sans-serif;" }}>
                Create a cluster
                </Typography>
              <Typography component="div" color="error" variant="p">
                {this.state.isSubmitted && !this.state.clusterName &&
                  <div className="help-block">Sorry please enter the details in the form</div>}
                {this.state.isSubmitted && this.state.clusterName && this.state.clusterName.length < 5 && <div className="help-block">Please enter minimum 6 characters</div>}
                <br />
              </Typography>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-age-native-simple">Zone</InputLabel>
                <Select
                  fullWidth
                  native
                  value={this.state.zone}
                  onChange={this.handleChange}
                  label="Zone"
                  inputProps={{
                    name: 'zone',
                    id: 'zone',
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </Select>
              </FormControl>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="clusterName"
                label="Cluster Name"
                name="clusterName"
                autoComplete="clusterName"
                onChange={this.handleChange}
                value={this.state.clusterName}
                style={{
                  marginTop: "24px"
                }}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="taxRate"
                label="Tax Rate"
                type="number"
                step="0.01"
                name="taxRate"
                autoComplete="taxRate"
                onChange={this.handleChange}
                value={this.state.taxRate}
                autoFocus
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className="{classes.submit}"
                style={{ marginTop: "30px" }}
                onClick={this.handleSubmit}
              >
                Save
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
});
const actionAsProps = {
  getAllZones: getZones,
  postCluster: postCluster
}
export default connect(stateAsProps, actionAsProps)(ClusterForm);

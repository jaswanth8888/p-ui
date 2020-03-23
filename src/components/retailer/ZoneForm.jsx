import { Avatar, Box, Grid, TextField, Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { postZone } from '../../redux/actions/RetailerActions';
// import { Alert } from 'react-alert'
import './ZoneForm.css'


class ZoneForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zoneName: "",
      liquorPricePerUnit: "",
      isSubmit: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {

    e.preventDefault();
    let zone = {
      zoneName: this.state.zoneName,
      liquorPricePerUnit: this.state.liquorPricePerUnit
    }


    if (this.state.zoneName.length > 5) {
      this.props.postZone(zone)
      this.setState({ isSubmit: true })
    }
    else {
      this.setState({ isSubmit: false })
    }

  }

  render() {

    if (this.state.isSubmit && this.state.zoneName.length > 5 && this.state.liquorPricePerUnit) {
      return <Redirect to="/welcome" />
    }
    return (
      <div className="box-container">
        <div className="joint-form">
          <div className="validation-half" style={{ background: "#673ab7" }}>
            <div className="validations">
              <h3 style={{ textAlign: "center" }}>Requirements</h3>
              {this.state.zoneName.length <= 5 && <div style={{ display: "flex" }}><ClearIcon style={{ paddingRight: "5px", marginTop: "-2px" }} />
                <Typography variant="subtitle2" gutterBottom>
                  Zone has to be greater than 5 letters
                </Typography></div>}
              {this.state.zoneName.length > 5 &&
                <div style={{ display: "flex"  ,color : "#ffc107" }}><CheckIcon style={{ paddingRight: "5px", marginTop: "-2px" }} />
                  <Typography variant="subtitle2" gutterBottom>
                    Zone has to be greater than 5 letters
                </Typography></div>}
            </div>
          </div>
          <div className="form-half">
            <form className="{classes.form}" noValidate >
              <div>
                <div className="help-block">
                  <Typography
                    color="primary"
                    component="h1"
                    variant="h4"
                    style=
                    {{
                      fontFamily: "font-family: 'Open Sans', sans-serif;"
                    }}>
                    Create a Zone
                  </Typography>
                </div>
              </div>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="zoneName"
                label="Zone Name"
                name="zoneName"
                autoComplete="zoneName"
                onChange={this.handleChange}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="number"
                step="0.01"
                id="liquorPricePerUnit"
                label="Price Per Unit"
                name="liquorPricePerUnit"
                autoComplete="pricePerUnit"
                onChange={this.handleChange}
                autoFocus
              />

              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className="{classes.submit}"
                style={{ marginTop: "30px" }}
                onClick={this.handleSubmit}>
                Save
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const actionAsProps = {
  postZone: postZone
}
export default connect(null, actionAsProps)(ZoneForm);

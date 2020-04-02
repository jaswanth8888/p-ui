import { TextField, Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import MuiAlert from '@material-ui/lab/Alert';
import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { postZone } from '../../redux/actions/RetailerActions';
import Message from "../utils/Message"



class ZoneForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zoneName: "",
      liquorPricePerUnit: "",
      isSubmit: false,
      status : 0
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
    console.log(zone);


    if (this.state.zoneName.length > 5) {
      this.props.postZone(zone)
      this.setState({ isSubmit: true ,status : 1})
    }
    else {
      this.setState({ isSubmit: false, status : -1 })
    }

  }

  render() {

    return (
      <div className="box-container">
        <div className="joint-form">
          <div className="validation-half" style={{ background: "#673ab7" }}>
            <div className="validations">
              <h3 style={{ textAlign: "center" }}>Requirements</h3>
              {this.state.zoneName.length <= 5 && <div className="typo-div"><ClearIcon className="icon-style" />
                <Typography variant="subtitle2" gutterBottom>
                  Zone has to be greater than 5 letters
                </Typography></div>}
              {this.state.zoneName.length > 5 &&
                <div className="approved-text"><CheckIcon className="icon-style" />
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
                    className="help-block-h4"
                    >
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
                className="{classes.submit} submit-pad"
                onClick={this.handleSubmit}>
                Save
              </Button>
            </form>
          </div>
        </div>
        <Fragment>
          {(this.state.status === -1) ? (
            <div>
              <Snackbar open="true" autoHideDuration={2000}>
                <MuiAlert severity="error" elevation={6} variant="filled" > 
                  Zone creation failed. Please match the requirements
                </MuiAlert>
              </Snackbar>
            </div>) : (<div />)
          }
        </Fragment>
        <Message />
      </div>
    );
  }
}

const actionAsProps = {
  postZone: postZone
}
export default connect(null, actionAsProps)(ZoneForm);

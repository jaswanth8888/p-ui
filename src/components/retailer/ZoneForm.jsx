import { Avatar, Box, Grid, TextField, Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import PublicIcon from '@material-ui/icons/Public';
import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { postZone } from '../../redux/actions/RetailerActions';
// import { Alert } from 'react-alert'

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
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh", marginTop: "-100px" }}
        >
          <Grid item xs={3} style={{
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
                <PublicIcon color="white" style={{
                  fontSize: "48px"
                }} />
              </Avatar>
            </Box>

            <form className="{classes.form}" noValidate >
              <div>
                {!this.state.zoneName && <div className="help-block">
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
                </div>}
                {/* { !this.state.liquorPricePerUnit && <div className="help-block">Please enter Price per unit</div>} */}
                {this.state.zoneName && this.state.zoneName.length < 6 && <div className="help-block">Please enter minimum 6 characters</div>}
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
          </Grid>
        </Grid>

      </div>
    );
  }
}

const actionAsProps = {
  postZone: postZone
}
export default connect(null, actionAsProps)(ZoneForm);

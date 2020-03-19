import React, { Component } from "react";
import { Grid, TextField,Typography,Box} from "@material-ui/core";
import Button from "../atoms/Button";
import PublicIcon from '@material-ui/icons/Public';
import { connect } from 'react-redux';
import { postZone } from '../../redux/actions/RetailerActions';
import { Redirect } from "react-router-dom";
// import { Alert } from 'react-alert'

class ZoneForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zoneName: "",
      liquorPricePerUnit:"",
      isSubmit:false
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
    let zone = {zoneName:this.state.zoneName,
                liquorPricePerUnit:this.state.liquorPricePerUnit
    }
    

    if(this.state.zoneName.length>5){
      this.props.postZone(zone)
      this.setState({isSubmit:true})
    }
    else{
      this.setState({isSubmit:false})
    }
    
   }

  render() {

    if(this.state.isSubmit && this.state.zoneName.length>5 && this.state.liquorPricePerUnit)
    {
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
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <Box diasplay="flex" flexDirection="row" justifyContent="center">
              <Box  p={1}>
              </Box>
              <PublicIcon/>
              <Typography component="h2" variant="h5">
                Create a Zone
              </Typography>
            </Box>
            
            <form className="{classes.form}" noValidate>
            <div>
              { !this.state.zoneName && <div className="help-block">Please enter zone name</div>}
              {/* { !this.state.liquorPricePerUnit && <div className="help-block">Please enter Price per unit</div>} */}
              {this.state.zoneName && this.state.zoneName.length<6 && <div className="help-block">Please enter minimum 6 characters</div>}
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

const actionAsProps={
  postZone : postZone
}
export default connect(null, actionAsProps)(ZoneForm);

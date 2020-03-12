import React, { Component } from 'react'
import { Grid, TextField, Typography, Select,InputLabel,NativeSelect} from "@material-ui/core";
import Button from "../atoms/Button";
import {getZones, postCluster} from '../../redux/actions/RetailerActions'
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'

class ClusterForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            zone:"",
            clusterName:"",
            taxRate:"",
            isSubmitted:false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        console.log(this.props);
        this.props.getAllZones();
    }
        
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({[name]:value});
        
    }
    
    handleSubmit(e){
        e.preventDefault();
        let cluster={clusterName:this.state.clusterName, taxRate:this.state.taxRate}
        console.log(cluster);
        this.setState({isSubmitted:true})
        if(this.state.clusterName.length>6){
            this.props.postCluster(cluster,this.state.zone)
        }
    }
    
    render() {
        if(this.state.isSubmitted && this.state.zone && this.state.clusterName){
            return <Redirect to='/welcome'/>
          }
        return (
            <div>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: "110vh"}}
            >
              <Grid item xs={6}>
                <form className="{classes.form}">
                  <Typography component="div" color="error" variant="p">
                    {this.state.isSubmitted && !this.state.clusterName &&
                    <div className="help-block">Sorry please enter the details in the form</div>}
                    {this.state.isSubmitted && this.state.clusterName && this.state.clusterName.length<5 && <div className="help-block">Please enter minimum 6 characters</div>}
                    <br/>
                  </Typography>
                <InputLabel shrink htmlFor="zone">
                  Enter Zone
                </InputLabel>
                <NativeSelect
                    ref="zone"
                    fullWidth
                    native
                    variant="outlined"
                    label="Enter Zone"
                    value={this.state.zone}
                    onChange={this.handleChange}
                    inputProps={{
                        name: 'zone',
                        id: 'zone',
                    }}
                    >
                    {this.props.zones.map((zone, index)=>{
                      return <option value={zone} key={index}>{zone}</option>
                    })}
                  </NativeSelect>
                  <br/><br/>
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
                    autoFocus
              />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="taxRate"
                    label="Tax Rate"
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
  export default connect(stateAsProps,actionAsProps)(ClusterForm);

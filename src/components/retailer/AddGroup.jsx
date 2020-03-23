import React, { Component } from 'react'
import { Grid, TextField, Avatar, Typography, Box ,Icon} from "@material-ui/core";
import Button from "../atoms/Button";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { connect } from "react-redux";
import { postGroup } from "../../redux/actions/RetailerActions.jsx";




class AddGroup extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             group:{
                 groupName:''
             },
             error:{
                 groupNameError:false,
                 groupNameErrorMsg:''
             }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        let group = this.state.group;
        console.log(group,name,value)
        group[name] = value;
        this.setState({ group });
      }


    is_validGroupName=()=>{
        let groupName=this.state.group.groupName
        let error=this.state.error
        if(groupName===''){
          error.groupNameError=true;
          error.groupNameErrorMsg='please fill Group Name'
          this.setState({error})
          return false
        }
        error.groupNameError=false;
        error.groupNameErrorMsg=''
        this.setState({error})
    
        return true
    
      }

    handleSubmit(e) {
        e.preventDefault();
        if (this.is_validGroupName()) {
          this.props.postGroup({ ...this.state.group }); // thunk action
          this.props.history.push('/welcome');

        }
      }
    
    render() {
        return (
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
                <Box p={1}>
                  <Avatar
                    className="{classes.avatar}"
                    style={{ color: "#3F51B5" }}
                  >
                    <AddCircleOutlineIcon fontSize="large"/>
                  </Avatar>
                </Box>

                <Typography component="h1" variant="h5">
                  Add group
                </Typography>
                
              </Box>
              <form className="{classes.form}" noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="groupName"
                  label="Group Name"
                  name="groupName"
                  error={this.state.error.groupNameError}
                  helperText={this.state.error.groupNameErrorMsg}
                  onChange={this.handleChange}
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
            )
    }
}

const actionAsProps={
  postGroup : postGroup
}
export default connect(null, actionAsProps)(AddGroup);

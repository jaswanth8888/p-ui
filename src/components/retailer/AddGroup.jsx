import { TextField, Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import MuiAlert from '@material-ui/lab/Alert';
import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { postGroup } from "../../redux/actions/RetailerActions.jsx";


class AddGroup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      group: {
        groupName: '',
      },
      status: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    let group = this.state.group;
    console.log(group, name, value)
    group[name] = value;
    this.setState({ group });
  }

  is_validGroupName = () => {
    if (this.state.group.groupName.length > 0) {
      this.setState({ status: 1 })    
    }
    else {
      this.setState({ status: -1 })
      return false
    }
    return true
 }

  handleSubmit(e) {
    e.preventDefault();
    if (this.is_validGroupName()) {
      this.props.postGroup({ ...this.state.group }); // thunk action
    }
  }

  render() {
    return (


      <div className="box-container">
        <div className="joint-form">
          <div className="validation-half" style={{ background: "#673ab7" }}>
            <div className="validations">
              <h3 style={{ textAlign: "center" }}>Requirements</h3>
              {this.state.group.groupName.length <= 0 && <div style={{ display: "flex" }}><ClearIcon style={{ paddingRight: "5px", marginTop: "-2px" }} />
                <Typography variant="subtitle2" gutterBottom>
                  Please provide a group name
                </Typography></div>}
              {this.state.group.groupName.length > 0 &&
                <div style={{ display: "flex", color: "#ffc107" }}><CheckIcon style={{ paddingRight: "5px", marginTop: "-2px" }} />
                  <Typography variant="subtitle2" gutterBottom>
                    Please provide a group name
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
                      fontFamily: "font-family: 'Open Sans', sans-serif;",
                      position: "relative",
                      top: "-20px"
                    }}>
                    Create a Group
                  </Typography>
                </div>
              </div>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="groupName"
                label="Group Name"
                name="groupName"
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
        <Fragment>

          {(this.state.status === 1) ? (
            <div>
              <Snackbar open="true" autoHideDuration={2000}>
                <MuiAlert elevation={6} variant="filled">
                  Group created successfully!
                </MuiAlert>
              </Snackbar>
            </div>
          ) : (<div />)}
        </Fragment>
        <Fragment>
          {(this.state.status === -1) ? (
            <div>
              <Snackbar open="true" autoHideDuration={2000}>
                <MuiAlert severity="error" elevation={6} variant="filled">
                  Group creation failed. Please match the requirements
                </MuiAlert>
              </Snackbar>
            </div>) : (<div />)
          }
        </Fragment>


      </div>
    )
  }
}

const actionAsProps = {
  postGroup: postGroup
}
export default connect(null, actionAsProps)(AddGroup);

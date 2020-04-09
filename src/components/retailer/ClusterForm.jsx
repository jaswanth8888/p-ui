import { InputLabel, TextField, Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import Snackbar from "@material-ui/core/Snackbar"
import CheckIcon from "@material-ui/icons/Check"
import ClearIcon from "@material-ui/icons/Clear"
import MuiAlert from "@material-ui/lab/Alert"
import React, { Component } from "react"
import { connect } from "react-redux"
import { getZones, postCluster } from "../../redux/actions/RetailerActions"
import Message from "../utils/Message"

class ClusterForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      zone: "",
      clusterName: "",
      taxRate: "",
      status: 0,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    this.props.history.push("/cluster")
  }

  componentDidMount() {
    this.props.getAllZones()
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit(e) {
    e.preventDefault()
    const cluster = {
      clusterName: this.state.clusterName,
      taxRate: this.state.taxRate,
    }
    this.setState({ isSubmitted: true })
    if (this.state.clusterName.length > 6) {
      this.props.postCluster(cluster, this.state.zone)
      this.setState({ status: 1 })
    } else {
      this.setState({ status: -1 })
    }
  }

  render() {
    return (
      <div className="box-container">
        <div className="joint-form">
          <div className="validation-half">
            <div className="validations">
              <h3 className="center-h3">Requirements</h3>
              {this.state.clusterName.length <= 5 && (
                <div className="typo-div">
                  <ClearIcon className="icon-style" />
                  <Typography variant="subtitle2" gutterBottom>
                    Cluster has to be greater than 5 letters
                  </Typography>
                </div>
              )}
              {this.state.clusterName.length > 5 && (
                <div className="approved-text">
                  <CheckIcon className="icon-style" />
                  <Typography variant="subtitle2" gutterBottom>
                    Cluster has to be greater than 5 letters
                  </Typography>
                </div>
              )}
            </div>
          </div>
          <div className="form-half">
            <form className="{classes.form}" noValidate>
              <div>
                <div className="help-block">
                  <Typography
                    color="primary"
                    component="h1"
                    variant="h4"
                    className="help-block-h4"
                  >
                    Create a cluster
                  </Typography>
                </div>
              </div>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Zone
                </InputLabel>
                <Select
                  fullWidth
                  native
                  value={this.state.zone}
                  onChange={this.handleChange}
                  label="Zone"
                  inputProps={{
                    name: "zone",
                    id: "zone",
                  }}
                >
                  <option aria-label="None" value="" />
                  {this.props.zones.map((zone, index) => {
                    return (
                      <option value={zone} key={index}>
                        {zone}
                      </option>
                    )
                  })}
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
                  marginTop: "24px",
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
                className="{classes.submit} submit-pad"
                onClick={this.handleSubmit}
                id="cluster-form-submit"
              >
                Save
              </Button>
            </form>
          </div>
        </div>
        <Message />

        <>
          {this.state.status === -1 ? (
            <div>
              <Snackbar open="true" autoHideDuration={2000}>
                <MuiAlert severity="error" elevation={6} variant="filled">
                  Cluster creation failed. Please match the requirements
                </MuiAlert>
              </Snackbar>
            </div>
          ) : (
            <div />
          )}
        </>
      </div>
    )
  }
}
const stateAsProps = (store) => ({
  zones: store.RetailerReducer.zones,
})
const actionAsProps = {
  getAllZones: getZones,
  postCluster,
}
export default connect(stateAsProps, actionAsProps)(ClusterForm)

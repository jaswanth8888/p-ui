import { InputLabel, TextField, Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import CheckIcon from "@material-ui/icons/Check"
import ClearIcon from "@material-ui/icons/Clear"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React, { Component, Fragment } from "react"
import Select from "@material-ui/core/Select"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import {
  getProductList,
  saveProductValue,
  getProductDetails,
  getZones,
  saveZoneValue,
  getClusters,
  saveClusterValue,
} from "../../redux/actions/RetailerActions"
import Message from "../utils/Message"

class WithdrawPromotionClusterForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      productName: "",
      zone: "",
      cluster: "",
      // status: 0
    }
    this.handleChangeProduct = this.handleChangeProduct.bind(this)
    this.handleChangeZone = this.handleChangeZone.bind(this)
    this.handleChangeCluster = this.handleChangeCluster.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    this.props.getProductList()
    this.props.getZones()
  }

  handleChangeProduct = (e, value) => {
    console.log(value)
    const productName = value
    this.setState({ productName })
    console.log(this.state.productName)
    this.props.saveProductValue(productName)
    this.props.getProductDetails(value)
  }

  handleChangeZone(e) {
    const { name, value } = e.target
    this.setState({ zone: value })
    this.props.getClusters(e.target.value)
    console.log(value)
    this.props.saveZoneValue(value)
  }

  handleChangeCluster(e) {
    const { name, value } = e.target
    this.setState({ cluster: value })
    console.log(value)
    this.props.saveClusterValue(value)
  }

  handleSubmit(e) {
    this.props.history.push("/withdraw/clusterproduct")
  }

  render() {
    return (
      <div className="box-container">
        <div className="joint-form">
          <div className="validation-half">
            <div className="validations">
              <h3 className="center-h3">Requirements</h3>

              {this.state.productName === "" && (
                <div style={{ display: "flex" }}>
                  <ClearIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    Select a product name
                  </Typography>
                </div>
              )}
              {this.state.productName !== "" && (
                <div style={{ display: "flex", color: "#ffc107" }}>
                  <CheckIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    Select a product name
                  </Typography>
                </div>
              )}
              {this.state.zone === "" && (
                <div style={{ display: "flex" }}>
                  <ClearIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    Select a zone name
                  </Typography>
                </div>
              )}
              {this.state.zone !== "" && (
                <div style={{ display: "flex", color: "#ffc107" }}>
                  <CheckIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    Select a zone name
                  </Typography>
                </div>
              )}
              {this.state.cluster === "" && (
                <div style={{ display: "flex" }}>
                  <ClearIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    Select a cluster name
                  </Typography>
                </div>
              )}
              {this.state.cluster !== "" && (
                <div style={{ display: "flex", color: "#ffc107" }}>
                  <CheckIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    Select a cluster name
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
                    Withdraw Promotion Cluster
                  </Typography>
                </div>
              </div>
              <FormControl variant="outlined" fullWidth>
                <Autocomplete
                  id="product-list"
                  fullWidth
                  options={this.props.products}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Product Name"
                      variant="outlined"
                    />
                  )}
                  onChange={this.handleChangeProduct}
                  name="productName"
                />
              </FormControl>
              <FormControl margin="normal" variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Zone
                </InputLabel>
                <Select
                  fullWidth
                  native
                  value={this.state.zone}
                  onChange={this.handleChangeZone}
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

              <FormControl margin="normal" variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Enter Cluster
                </InputLabel>
                <Select
                  ref="cluster"
                  fullWidth
                  native
                  value={this.state.cluster}
                  onChange={this.handleChangeCluster}
                  label="Enter Cluster"
                  inputProps={{
                    name: "cluster",
                    id: "cluster",
                  }}
                >
                  <option aria-label="None" value="" />
                  {this.props.clusters.map((cluster, index) => {
                    return (
                      <option value={cluster} key={index}>
                        {cluster}
                      </option>
                    )
                  })}
                </Select>
              </FormControl>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className="{classes.submit} submit-pad"
                onClick={this.handleSubmit}
                id="apply-promotion-cluster-submit"
              >
                Go
              </Button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const stateAsProps = (store) => ({
  products: store.RetailerReducer.productList,
  zones: store.RetailerReducer.zones,
  clusters: store.RetailerReducer.clusters,
})
const actionAsProps = {
  getProductList,
  saveProductValue,
  getProductDetails,
  getZones,
  getClusters,
  saveZoneValue,
  saveClusterValue,
}
export default connect(
  stateAsProps,
  actionAsProps
)(WithdrawPromotionClusterForm)

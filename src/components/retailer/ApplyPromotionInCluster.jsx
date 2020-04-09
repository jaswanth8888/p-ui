import { InputLabel, TextField, Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import CheckIcon from "@material-ui/icons/Check"
import ClearIcon from "@material-ui/icons/Clear"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import {
  getClusters,
  getProductDetails,
  getProductList,
  getZones,
  saveClusterValue,
  saveProductValue,
  saveZoneValue,
} from "../../redux/actions/RetailerActions"

class ApplyPromotionInCluster extends Component {
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
  }

  componentWillMount() {
    this.props.getProductList()
    this.props.getZones()
  }

  handleChangeProduct = (e, value) => {
    const productName = value
    this.setState({ productName })
    this.props.saveProductValue(productName)
    this.props.getProductDetails(value)
  }

  handleChangeZone(e) {
    const { name, value } = e.target
    this.setState({ zone: value })
    this.props.getClusters(e.target.value)
    this.props.saveZoneValue(value)
  }

  handleChangeCluster(e) {
    const { name, value } = e.target
    this.setState({ cluster: value })
    this.props.saveClusterValue(value)
  }

  render() {
    const { productName, zone, cluster } = this.state
    return (
      <div className="box-container">
        <div className="joint-form">
          <div className="validation-half">
            <div className="validations">
              <h3 className="center-h3">Requirements</h3>

              {productName === "" && (
                <div style={{ display: "flex" }}>
                  <ClearIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    Select a product name
                  </Typography>
                </div>
              )}
              {productName !== "" && (
                <div style={{ display: "flex", color: "#ffc107" }}>
                  <CheckIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    Select a product name
                  </Typography>
                </div>
              )}
              {zone === "" && (
                <div style={{ display: "flex" }}>
                  <ClearIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    Select a zone name
                  </Typography>
                </div>
              )}
              {zone !== "" && (
                <div style={{ display: "flex", color: "#ffc107" }}>
                  <CheckIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    Select a zone name
                  </Typography>
                </div>
              )}
              {cluster === "" && (
                <div style={{ display: "flex" }}>
                  <ClearIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    Select a cluster name
                  </Typography>
                </div>
              )}
              {cluster !== "" && (
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
                    Select product name and cluster
                  </Typography>
                </div>
              </div>
              <FormControl variant="outlined" fullWidth>
                <Autocomplete
                  id="product-list"
                  fullWidth
                  options={this.props.products}
                  getOptionLabel={(option) => option}
                  renderInput={() => (
                    <TextField label="Product Name" variant="outlined" />
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
                  value={zone}
                  onChange={this.handleChangeZone}
                  label="Zone"
                  inputProps={{
                    name: "zone",
                    id: "zone",
                  }}
                >
                  <option aria-label="None" value="" />
                  {this.props.zones.map((zone, index) => {
                    return <option value={zone}>{zone}</option>
                  })}
                </Select>
              </FormControl>

              <FormControl margin="normal" variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Enter Cluster
                </InputLabel>
                <Select
                  fullWidth
                  native
                  value={cluster}
                  onChange={this.handleChangeCluster}
                  label="Enter Cluster"
                  inputProps={{
                    name: "cluster",
                    id: "cluster",
                  }}
                >
                  <option aria-label="None" value="" />
                  {this.props.clusters.map((cluster, index) => {
                    return <option value={cluster}>{cluster}</option>
                  })}
                </Select>
              </FormControl>

              <Link className="button-link" to="/definepromotion/cluster">
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
              </Link>
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
export default connect(stateAsProps, actionAsProps)(ApplyPromotionInCluster)

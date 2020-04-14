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
import PropTypes from "prop-types"
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

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const {
      getZones: getZonesAlt,
      getProductList: getProductListAlt,
    } = this.props
    getProductListAlt()
    getZonesAlt()
  }

  handleChangeProduct = (e, value) => {
    const {
      saveProductValue: saveProductValueAlt,
      getProductDetails: getProductDetailsAlt,
    } = this.props
    const productName = value
    this.setState({ productName })
    saveProductValueAlt(productName)
    getProductDetailsAlt(productName)
  }

  handleChangeZone(e) {
    const { value } = e.target
    this.setState({ zone: value })
    const {
      saveZoneValue: saveZoneValueAlt,
      getClusters: getClustersAlt,
    } = this.props
    getClustersAlt(e.target.value)
    saveZoneValueAlt(value)
  }

  handleChangeCluster(e) {
    const { value } = e.target
    this.setState({ cluster: value })
    const { saveClusterValue: saveClusterValueAlt } = this.props
    saveClusterValueAlt(value)
  }

  render() {
    const { productName, zone, cluster } = this.state
    const { zones, clusters, products } = this.props

    return (
      <div className="box-container">
        <div className="joint-form">
          <div className="validation-half">
            <div className="validations">
              <h3 className="center-h3">Requirements</h3>

              {productName === "" && (
                <div>
                  <ClearIcon className="icon-style" />
                  <Typography variant="subtitle2" gutterBottom>
                    Select a product name
                  </Typography>
                </div>
              )}
              {productName !== "" && (
                <div>
                  <CheckIcon className="icon-style" />
                  <Typography variant="subtitle2" gutterBottom>
                    Select a product name
                  </Typography>
                </div>
              )}
              {zone === "" && (
                <div>
                  <ClearIcon className="icon-style" />
                  <Typography variant="subtitle2" gutterBottom>
                    Select a zone name
                  </Typography>
                </div>
              )}
              {zone !== "" && (
                <div>
                  <CheckIcon className="icon-style" />
                  <Typography variant="subtitle2" gutterBottom>
                    Select a zone name
                  </Typography>
                </div>
              )}
              {cluster === "" && (
                <div>
                  <ClearIcon className="icon-style" />
                  <Typography variant="subtitle2" gutterBottom>
                    Select a cluster name
                  </Typography>
                </div>
              )}
              {cluster !== "" && (
                <div>
                  <CheckIcon />
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
                  options={products}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      // eslint-disable-next-line react/jsx-props-no-spreading
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
                  value={zone}
                  onChange={this.handleChangeZone}
                  label="Zone"
                  inputProps={{
                    name: "zone",
                    id: "zone",
                  }}
                >
                  <option aria-label="None" value="" />
                  {zones.map((zoneVal) => {
                    return <option value={zoneVal}>{zoneVal}</option>
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
                  {clusters.map((clusterVal) => {
                    return <option value={clusterVal}>{clusterVal}</option>
                  })}
                </Select>
              </FormControl>

              {productName !== "" && zone !== "" && cluster !== "" && (
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
              )}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

ApplyPromotionInCluster.propTypes = {
  products: PropTypes.arrayOf.isRequired,
  zones: PropTypes.arrayOf.isRequired,
  clusters: PropTypes.arrayOf.isRequired,
  getProductDetails: PropTypes.func.isRequired,
  saveProductValue: PropTypes.func.isRequired,
  getProductList: PropTypes.func.isRequired,
  getZones: PropTypes.func.isRequired,
  getClusters: PropTypes.func.isRequired,
  saveZoneValue: PropTypes.func.isRequired,
  saveClusterValue: PropTypes.func.isRequired,
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

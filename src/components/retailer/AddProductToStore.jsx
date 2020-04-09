import { InputLabel, Select, Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import {
  getClusters,
  getStores,
  getZones,
  saveClusterValue,
  saveStoreValue,
  saveZoneValue,
} from "../../redux/actions/RetailerActions"

class AddProductToStore extends Component {
  constructor(props) {
    super(props)

    this.state = {
      zone: "",
      cluster: "",
      store: "",
      status: 0,
    }

    this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeZone = this.handleChangeZone.bind(this)
    this.handleChangeCluster = this.handleChangeCluster.bind(this)
    this.handleChangeStore = this.handleChangeStore.bind(this)
  }

  componentDidMount() {
    this.props.getAllZones()
  }

  handleSubmitHistory = () => {
    this.props.history.push("/store")
  }

  handleChangeStore(e) {
    this.setState({ store: e.target.value })
    // this.props.setState({store:this.state.store})
    this.props.saveStoreValue(e.target.value)
  }

  handleChangeCluster(e) {
    this.setState({ cluster: e.target.value })
    this.props.getAllStores(this.props.zone, e.target.value)
    this.props.saveClusterValue(e.target.value)
  }

  handleChangeZone(e) {
    this.setState({ zone: e.target.value })
    this.props.getAllClusters(e.target.value)
    this.props.saveZoneValue(e.target.value)
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  render() {
    const { zone, cluster, store, status } = this.state
    return (
      <div className="box-container">
        <div className="joint-form">
          <div className="validation-half">
            <div className="validations">
              <h3 style={{ textAlign: "center" }}>Requirements</h3>
              {/* {this.state.zoneName.length <= 5 && <div style={{ display: "flex" }}><ClearIcon style={{ paddingRight: "5px", marginTop: "-2px" }} />
                <Typography variant="subtitle2" gutterBottom>
                  Zone has to be greater than 5 letters
                </Typography></div>}
              {this.state.zoneName.length > 5 &&
                <div style={{ display: "flex", color: "#ffc107" }}><CheckIcon style={{ paddingRight: "5px", marginTop: "-2px" }} />
                  <Typography variant="subtitle2" gutterBottom>
                    Zone has to be greater than 5 letters
                </Typography></div>} */}
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
                    id="special-add-prods-help"
                  >
                    Add a Product to the Store
                  </Typography>
                </div>
              </div>
              <FormControl
                variant="outlined"
                fullWidth
                className="space-margin-top"
              >
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
              <FormControl
                variant="outlined"
                fullWidth
                className="space-margin-top"
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  Cluster
                </InputLabel>
                <Select
                  fullWidth
                  native
                  value={cluster}
                  onChange={this.handleChangeCluster}
                  label="Cluster"
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
              <FormControl
                variant="outlined"
                fullWidth
                className="space-margin-top"
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  Store
                </InputLabel>
                <Select
                  fullWidth
                  native
                  value={store}
                  onChange={this.handleChangeStore}
                  label="Store"
                  inputProps={{
                    name: "store",
                    id: "store",
                  }}
                >
                  <option aria-label="None" value="" />
                  {this.props.stores.map((store, index) => {
                    return <option value={store}>{store}</option>
                  })}
                </Select>
              </FormControl>
              {cluster !== "" && this.props.stores.length <= 0 && (
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="{classes.submit} submit-pad"
                  onClick={this.handleSubmitHistory}
                >
                  Add Store
                </Button>
              )}
              {store !== "" && zone !== "" && cluster !== "" ? (
                <Link to="/addproducts" className="special-href">
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="{classes.submit} submit-pad"
                    id="add-prods-store-submit"
                  >
                    Add Products
                  </Button>
                </Link>
              ) : (
                <Link to="/addproducts" className="special-href">
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="{classes.submit} submit-pad empty-submit"
                    id="add-prods-store-submit"
                    // onClick={this.handleSubmit}
                  >
                    Add Products
                  </Button>
                </Link>
              )}
            </form>
          </div>
        </div>
        <>
          {status === 1 ? (
            <div>
              <Snackbar open="true" autoHideDuration={2000}>
                <MuiAlert elevation={6} variant="filled">
                  Zone created successfully!
                </MuiAlert>
              </Snackbar>
            </div>
          ) : (
            <div />
          )}
        </>
        <>
          {status === -1 ? (
            <div>
              <Snackbar open="true" autoHideDuration={2000}>
                <MuiAlert severity="error" elevation={6} variant="filled">
                  Zone creation failed. Please match the requirements
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
  clusters: store.RetailerReducer.clusters,
  zone: store.RetailerReducer.zone,
  cluster: store.RetailerReducer.cluster,
  store: store.RetailerReducer.store,
  stores: store.RetailerReducer.stores,
})
const actionAsProps = {
  getAllZones: getZones,
  getAllClusters: getClusters,
  getAllStores: getStores,
  saveZoneValue,
  saveClusterValue,
  saveStoreValue,
}
export default connect(stateAsProps, actionAsProps)(AddProductToStore)

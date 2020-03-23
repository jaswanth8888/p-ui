import React, { Component } from "react";
import {
  Grid,
  TextField,
  Typography,
  Select,
  InputLabel,
  NativeSelect
} from "@material-ui/core";
import Button from "../atoms/Button";
import {
  getZones,
  getClusters,
  postStore
} from "../../redux/actions/RetailerActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { withTranslation } from "react-i18next";
class StoreForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zone: "",
      cluster: "",
      isSubmitted: false,
      storeName: "",
      city: "",
      streetName: "",
      pin: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChangeStore = this.handleChangeStore.bind(this);
    this.handleChangeZone = this.handleChangeZone.bind(this);
  }

  componentDidMount() {
    this.props.getAllZones();
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  handleChangeZone(e) {
    this.setState({ zone: e.target.value });
    this.props.getAllClusters(e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    let streetName = this.state.streetName;
    let city = this.state.city;
    let pin = this.state.pin;
    let address = {
      streetName,
      city,
      pin
    };
    let storeName = this.state.storeName;
    let store = { storeName, address };
    this.props.postStore(store, this.state.zone, this.state.cluster);
    this.setState({ isSubmitted: true });
  }

  render() {
    const { t, i18n } = this.props;
    if (
      this.state.isSubmitted &&
      this.state.storeName &&
      this.state.zone &&
      this.state.cluster &&
      this.state.streetName &&
      this.state.city &&
      this.state.pin
    ) {
      return <Redirect to="/welcome" />;
    }
    return (
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "110vh" }}
        >
          <Grid item xs={6}>
            <form className="{classes.form}">
              <Typography component="div" color="error" variant="p">
                {this.state.isSubmitted &&
                  !this.state.storeName &&
                  !this.state.zone &&
                  !this.state.cluster &&
                  !this.state.streetName &&
                  !this.state.city &&
                  !this.state.pin && (
                    <div className="help-block">
                      {t("message.emptyForm")}
                    </div>
                  )}
                <br />
              </Typography>
              <InputLabel shrink htmlFor="zone">
                {t("storeForm.enterZone")}
              </InputLabel>
              <NativeSelect
                ref="zone"
                fullWidth
                native
                variant="outlined"
                label={t("storeForm.enterZone")}
                value={this.state.zone}
                onChange={this.handleChangeZone}
                inputProps={{
                  name: "zone",
                  id: "zone"
                }}
              >
                <option value="">--{t("storeForm.selectZone")}--</option>
                {this.props.zones.map((zone, index) => {
                  return (
                    <option value={zone} key={index}>
                      {zone}
                    </option>
                  );
                })}
              </NativeSelect>
              <br />
              <br />
              <InputLabel shrink htmlFor="cluster">
                {t("storeForm.enterCluster")}
              </InputLabel>
              <Select
                ref="cluster"
                fullWidth
                native
                label={t("storeForm.enterCluster")}
                value={this.state.cluster}
                onChange={this.handleChange}
                // name="cluster"
                inputProps={{
                  name: "cluster",
                  id: "cluster"
                }}
              >
                <option value="">--{t("storeForm.selectCluster")}--</option>
                {this.props.clusters.map((cluster, index) => {
                  return (
                    <option value={cluster} key={index}>
                      {cluster}
                    </option>
                  );
                })}
              </Select>
              <TextField
                ref="storeName"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="storeName"
                label={t("storeForm.storeName")}
                name="storeName"
                autoComplete="storeName"
                onChange={this.handleChange}
                value={this.state.storeName}
                autoFocus
              />
              <Grid>
                <Typography component="h3" variant="h5">
                  {t("storeForm.address")}:
                </Typography>
                <TextField
                  ref="streetName"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="streetName"
                  label={t("storeForm.streetName")}
                  autoComplete="streetName"
                  id="streetName"
                  onChange={this.handleChange}
                  value={this.state.streetName}
                />
                <TextField
                  ref="city"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="city"
                  label={t("storeForm.city")}
                  id="city"
                  onChange={this.handleChange}
                  autoComplete="city"
                  value={this.state.city}
                />
                <TextField
                  ref="pin"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="pin"
                  label={t("storeForm.pinCode")}
                  type="number"
                  id="pin"
                  onChange={this.handleChange}
                  autoComplete="pin"
                  value={this.state.pin}
                />
              </Grid>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className="{classes.submit}"
                onClick={this.handleSubmit}
              >
                {t("storeForm.submit")}
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const stateAsProps = store => ({
  zones: store.RetailerReducer.zones,
  clusters: store.RetailerReducer.clusters
});
const actionAsProps = {
  getAllZones: getZones,
  getAllClusters: getClusters,
  postStore: postStore
};
export default connect(
  stateAsProps,
  actionAsProps
)(withTranslation()(StoreForm));

import React, { Component } from "react";
import {
  Avatar,
  Box,
  Grid,
  TextField,
  Typography,
  InputLabel,
  NativeSelect
} from "@material-ui/core";
import { getZones, postCluster } from "../../redux/actions/RetailerActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import StoreIcon from "@material-ui/icons/Store";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { withTranslation } from "react-i18next";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

class ClusterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zone: "",
      clusterName: "",
      taxRate: "",
      isSubmitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getAllZones();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let cluster = {
      clusterName: this.state.clusterName,
      taxRate: this.state.taxRate
    };
    this.setState({ isSubmitted: true });
    if (this.state.clusterName.length > 6) {
      this.props.postCluster(cluster, this.state.zone);
    }
  }

  render() {
    if (this.state.isSubmitted && this.state.zone && this.state.clusterName) {
      return <Redirect to="/welcome" />;
    }
    const { t, i18n } = this.props;
    return (
      <div className="box-container">
        <div className="joint-form">
          <div className="validation-half" style={{ background: "#673ab7" }}>
            <div className="validations">
              <h3 style={{ textAlign: "center" }}>
                {t("clusterForm.requirements")}
              </h3>
              {this.state.clusterName.length <= 5 && (
                <div style={{ display: "flex" }}>
                  <ClearIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    {t("clusterForm.lengthTooShort")}
                  </Typography>
                </div>
              )}
              {this.state.clusterName.length > 5 && (
                <div style={{ display: "flex", color: "#ffc107" }}>
                  <CheckIcon
                    style={{ paddingRight: "5px", marginTop: "-2px" }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    {t("clusterForm.lengthTooShort")}
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
                    style={{
                      fontFamily: "font-family: 'Open Sans', sans-serif;",
                      position: "relative",
                      top: "-20px"
                    }}
                  >
                    {t("welcome.createCluster")}
                  </Typography>
                </div>
              </div>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-age-native-simple">
                  {t("clusterForm.enterZone")}
                </InputLabel>
                <Select
                  fullWidth
                  native
                  value={this.state.zone}
                  onChange={this.handleChange}
                  label="Zone"
                  inputProps={{
                    name: "zone",
                    id: "zone"
                  }}
                >
                  <option aria-label="None" value="" />
                  {this.props.zones.map((zone, index) => {
                    return (
                      <option value={zone} key={index}>
                        {zone}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="clusterName"
                label={t("clusterForm.clusterName")}
                name="clusterName"
                autoComplete="clusterName"
                onChange={this.handleChange}
                value={this.state.clusterName}
                style={{
                  marginTop: "24px"
                }}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="taxRate"
                label={t("clusterForm.taxRate")}
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
                className="{classes.submit}"
                style={{ marginTop: "30px" }}
                onClick={this.handleSubmit}
              >
                {t("clusterForm.save")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const stateAsProps = store => ({
  zones: store.RetailerReducer.zones
});
const actionAsProps = {
  getAllZones: getZones,
  postCluster: postCluster
};
export default connect(
  stateAsProps,
  actionAsProps
)(withTranslation()(ClusterForm));

import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import { Grid } from "@material-ui/core";
import Button from "../atoms/Button";
import { fetchUserDetails } from "../../redux/actions/RetailerActions";
import { Link } from "react-router-dom";
import Message from "./Message.jsx";
import { withTranslation } from "react-i18next";

export class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  isAuthenticated() {
    var token = sessionStorage.getItem("token");
    return token && token.length > 10;
  }

  render() {
    // const isAlreayAuthenticated = this.isAuthenticated();
    const { t, i18n } = this.props;
    return (
      <div>
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <div className="" style={{ alignContent: "center" }}></div>
            <Message />
            <form className="{classes.form}" noValidate>
              <Link to="/zonepage">
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="{classes.submit}"
                  onClick={this.handleSubmit}
                >
                  {t("welcome.createZone")}
                </Button>
              </Link>
              <Link to="/cluster">
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="{classes.submit}"
                  onClick={this.handleSubmit}
                >
                  {t("welcome.createCluster")}
                </Button>
              </Link>
              <Link to="/store">
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="{classes.submit}"
                  onClick={this.handleSubmit}
                >
                  {t("welcome.createStore")}
                </Button>
              </Link>
              <Link to="/viewzones">
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="{classes.submit}"
                  //onClick={this.handleSubmit}
                >
                  {t("welcome.viewZones")}
                </Button>
              </Link>
              <Link to="/viewclusters">
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="{classes.submit}"
                  //onClick={this.handleSubmit}
                >
                  {t("welcome.viewClusters")}
                </Button>
              </Link>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const stateAsProps = store => ({
  loggedInUser: store.RetailerReducer.loggedInUser,
  login_status: store.RetailerReducer.login_status
});
const actionsAsProps = {
  getUserDetails: fetchUserDetails
};

// export default connect(stateAsProps,{})(Welcome)
export default connect(
  stateAsProps,
  actionsAsProps
)(withTranslation()(Welcome));
// export default connect(null,actionsAsProps)(Welcome)

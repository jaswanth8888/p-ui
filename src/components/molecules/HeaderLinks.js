/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/RetailerActions";
// react components for routing our app without refresh
import { Link, Redirect } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

import ReactFlagsSelect from "react-flags-select";

//import css module
import "react-flags-select/css/react-flags-select.css";

//OR import sass module
import "react-flags-select/scss/react-flags-select.scss";

import Button from "../atoms/Button";

import styles from "./headerLinksStyle";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const useStyles = makeStyles(styles);

function HeaderLinks(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <ReactFlagsSelect
          countries={["US", "FR", "DE"]}
          customLabels={{
            US: "EN-US",
            FR: "FR",
            DE: "DE"
          }}
          placeholder="Select Language"
          defaultCountry={sessionStorage.getItem("countryCode")}
          onSelect={countryCode => {
            i18n.changeLanguage(countryCode);
            sessionStorage.setItem("countryCode", countryCode);
          }}
        />
        <Button href="/" color="transparent" className={classes.navLink}>
          {t("header.logIn")}
        </Button>
        <Button
          color="transparent"
          className={classes.navLink}
          onClick={() => {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("reduxstate");
            window.location.href = "/";
          }}
        >
          {t("header.logOut")}
        </Button>
      </ListItem>
    </List>
  );
}

const stateAsProps = store => ({
  loggedInUser: store.RetailerReducer.loggedInUser,
  login_status: store.RetailerReducer.login_status
});
const actionsAsProps = {
  logout: logout
};

export default connect(stateAsProps, actionsAsProps)(HeaderLinks);
export { HeaderLinks };

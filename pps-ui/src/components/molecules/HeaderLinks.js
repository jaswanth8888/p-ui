/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/userActions';
// react components for routing our app without refresh
import { Link, Redirect } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

import Button from "../atoms/Button";

import styles from "./headerLinksStyle";

const useStyles = makeStyles(styles);

function HeaderLinks(props) {
  const classes = useStyles();
  // {console.log(this.props)}
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          href="/"
          color="transparent"
          className={classes.navLink}
        >
          Login
        </Button>
        <Button
          color="transparent"
          className={classes.navLink}
          onClick={() => {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("reduxstate");
            window.location.href="/"           
        }}
        >
          Logout
        </Button>
      </ListItem>
    </List>
  );
}

// const stateAsProps = (store) => ({
//   loggedInUser: store.RetailerReducer.loggedInUser
// });
// const actionsAsProps = {
//   logout: logout
// };
// export default connect(stateAsProps, actionsAsProps)(HeaderLinks);
export default HeaderLinks;

import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import clsx from "clsx";
import { default as React, Fragment } from "react";
import { useTranslation } from "react-i18next";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import AddGroup from "../retailer/AddGroup.jsx";
import ClusterForm from "../retailer/ClusterForm.jsx";
import ProductRouter from "../retailer/ProductRouter.jsx";
import StoreForm from "../retailer/StoreForm.jsx";
import ViewClusters from "../retailer/ViewClusters.jsx";
import ViewZones from "../retailer/ViewZones.jsx";
import ZoneClusterRouter from "../retailer/ZoneClusterRouter.jsx";
import QueryOnDateRouter from "../retailer/QueryOnDateRouter.jsx";
import ZoneForm from "../retailer/ZoneForm.jsx";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/RetailerActions";
import { withStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Login from "../Login";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import EffectivePriceRouter from '../retailer/EffectivePriceRouter.jsx';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ViewListIcon from "@material-ui/icons/ViewList";
import GroupIcon from "@material-ui/icons/Group";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import PublicIcon from "@material-ui/icons/Public";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import Tooltip from "@material-ui/core/Tooltip";
import ViewAssignedZones from "../retailer/ViewAssignedZones.jsx";
import ViewAssignedClusters from "../retailer/ViewAssignedClusters.jsx";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

const StyledTab = withStyles({
  root: {
    fontFamily: "'Open Sans Condensed', sans-serif",
    fontSize: "18px"
  }
})(Tab);

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

function FullNavbar(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open
              })}
            >
              <MenuIcon />
            </IconButton>
            <StyledTab
              label={t("header.home")}
              {...a11yProps(0)}
              component={Link}
              to="/group"
            />

            <Link to="/" style={{ marginLeft: "auto", color: "white" }}>
              <StyledTab
                label={t("header.logOut")}
                {...a11yProps(2)}
                onClick={() => {
                  sessionStorage.removeItem("token");
                  sessionStorage.removeItem("reduxstate");
                  props.logout();
                }}
              ></StyledTab>
            </Link>
          </Toolbar>
        </AppBar>
        {sessionStorage.getItem("token") &&
        sessionStorage.getItem("token").length > 10 ? (
          <Fragment>
            <Drawer
              variant="permanent"
              className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open
              })}
              classes={{
                paper: clsx({
                  [classes.drawerOpen]: open,
                  [classes.drawerClose]: !open
                })
              }}
            >
              <div className={classes.toolbar}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "rtl" ? (
                    <ChevronRightIcon />
                  ) : (
                    <ChevronLeftIcon />
                  )}
                </IconButton>
              </div>
              <Divider />
              <List>
                <Link to="/products/assign">
                  <Tooltip
                    title="Add Products to Clusters or Zones"
                    placement="right"
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <LocalBarIcon />
                      </ListItemIcon>
                      <ListItemText
                        className="list-item-text"
                        primary={t("welcome.assignProductToClusterZone")}
                      />
                    </ListItem>
                  </Tooltip>
                </Link>

                <Link to="/products/store">
                  <Tooltip
                    title="Add Products to Store"
                    placement="right"
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <LocalBarIcon />
                      </ListItemIcon>
                      <ListItemText
                        className="list-item-text"
                        primary={t("welcome.addProducttoStore")}
                      />
                    </ListItem>
                  </Tooltip>
                </Link>

                <Divider />
                <Link to="/group">
                  <Tooltip
                    title="Create a Group"
                    placement="right"
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <GroupIcon />
                      </ListItemIcon>
                      <ListItemText
                        className="list-item-text"
                        primary={t("welcome.addGroup")}
                      />
                    </ListItem>
                  </Tooltip>
                </Link>
                <Link to="/zone">
                  <Tooltip
                    title="Create a Zone"
                    placement="right"
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <PublicIcon />
                      </ListItemIcon>
                      <ListItemText
                        className="list-item-text"
                        primary={t("welcome.createZone")}
                      />
                    </ListItem>
                  </Tooltip>
                </Link>
                <Link to="/cluster">
                  <Tooltip
                    title="Create a Cluster"
                    placement="right"
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <PublicIcon />
                      </ListItemIcon>
                      <ListItemText
                        className="list-item-text"
                        primary={t("welcome.createCluster")}
                      />
                    </ListItem>
                  </Tooltip>
                </Link>
                <Link to="/store">
                  <Tooltip
                    title="Create a Store"
                    placement="right"
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <ShoppingCartIcon />
                      </ListItemIcon>
                      <ListItemText
                        className="list-item-text"
                        primary={t("welcome.createStore")}
                      />
                    </ListItem>
                  </Tooltip>
                </Link>
                <Divider />
                <Link to="/view/zones">
                  <Tooltip
                    title="View Zones"
                    placement="right"
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <ViewListIcon />
                      </ListItemIcon>
                      <ListItemText
                        className="list-item-text"
                        primary={t("welcome.viewZones")}
                      />
                    </ListItem>
                  </Tooltip>
                </Link>
                <Link to="/view/clusters">
                  <Tooltip
                    title="View Clusters"
                    placement="right"
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <ViewListIcon />
                      </ListItemIcon>
                      <ListItemText
                        className="list-item-text"
                        primary={t("welcome.viewClusters")}
                      />
                    </ListItem>
                  </Tooltip>
                </Link>
                <Link to="/view/products/daterange">
                  <Tooltip
                    title="Cancel Effective Price Range"
                    placement="right"
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <ViewListIcon />
                      </ListItemIcon>
                      <ListItemText
                        className="list-item-text"
                        primary={"Cancel Effective Price"}
                      />
                    </ListItem>
                  </Tooltip>
                </Link>
                <Link to="queryondaterange">
                  <Tooltip
                    title="Query on Date Range"
                    placement="right"
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <ViewListIcon />
                      </ListItemIcon>
                      <ListItemText
                        className="list-item-text"
                        primary={"Query on Date Range"}
                      />
                    </ListItem>
                  </Tooltip>
                </Link>
              </List>
              {/* <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
            </Drawer>
          </Fragment>
        ) : (
          <Fragment />
        )}
        <Switch>
          <Route exact={true} path="/" component={Login} />
          <Route
            exact
            path="/group"
            render={props => <AddGroup {...props} />}
          />
          <Route
            exact
            path="/products/store"
            render={props => <ProductRouter {...props} />}
          />
          <Route exact path="/zone" render={props => <ZoneForm {...props} />} />
          <Route
            exact
            path="/cluster"
            render={props => <ClusterForm {...props} />}
          />
          <Route
            exact
            path="/store"
            render={props => <StoreForm {...props} />}
          />
          <Route
            exact
            path="/view/zones"
            render={props => <ViewZones {...props} />}
          />
          <Route
            exact
            path="/view/clusters"
            render={props => <ViewClusters {...props} />}
          />
          <Route
            exact
            path="/products/assign"
            render={props => <ZoneClusterRouter {...props} />}
          />
          <Route
            exact
            path="/view/products/daterange"
            render={props => <EffectivePriceRouter {...props} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

const stateAsProps = store => ({
  loggedInUser: store.RetailerReducer.loggedInUser,
  login_status: store.RetailerReducer.login_status
});
const actionsAsProps = {
  logout: logout
};
export default connect(stateAsProps, actionsAsProps)(FullNavbar);

import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import LocationCityIcon from "@material-ui/icons/LocationCity";
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
import { connect } from "react-redux";

import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ViewListIcon from "@material-ui/icons/ViewList";
import GroupIcon from "@material-ui/icons/Group";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import PublicIcon from "@material-ui/icons/Public";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import Tooltip from "@material-ui/core/Tooltip";
import DateRangeIcon from "@material-ui/icons/DateRange";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import StoreIcon from "@material-ui/icons/Store";
import EventBusyIcon from "@material-ui/icons/EventBusy";
import ReactFlagsSelect from "react-flags-select";
import i18n from "../../i18n";
import "react-flags-select/css/react-flags-select.css";
import "react-flags-select/scss/react-flags-select.scss";
import ViewAssignedClusters from "../retailer/ViewAssignedClusters.jsx";
import ViewAssignedZones from "../retailer/ViewAssignedZones.jsx";
import EffectivePriceRouter from "../retailer/EffectivePriceRouter.jsx";
import { logout } from "../../redux/actions/RetailerActions";
import ZoneForm from "../retailer/ZoneForm.jsx";
import QueryOnDateRouter from "../retailer/QueryOnDateRouter.jsx";
import PromotionRouter from "../retailer/PromotionRouter.jsx";
import ZoneClusterRouter from "../retailer/ZoneClusterRouter.jsx";
import ViewZones from "../retailer/ViewZones.jsx";
import ViewClusters from "../retailer/ViewClusters.jsx";
import StoreForm from "../retailer/StoreForm.jsx";
import ProductRouter from "../retailer/ProductRouter.jsx";
import ClusterForm from "../retailer/ClusterForm.jsx";
import AddGroup from "../retailer/AddGroup.jsx";
import Login from "../Login";
import Hidden from "@material-ui/core/Hidden";

const drawerWidth = 250;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
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

function FullNavbar(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { container } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <Link to="/selectproduct">
          <Tooltip title="Assign Price to Zone/Cluster" placement="right">
            <ListItem button>
              <ListItemIcon>
                <AddShoppingCartIcon />
              </ListItemIcon>
              <ListItemText
                className="list-item-text"
                primary={t("welcome.assignProductToClusterZone")}
              />
            </ListItem>
          </Tooltip>
        </Link>

        <Link to="/products/store">
          <Tooltip title="Add Products to Store" placement="right">
            <ListItem button>
              <ListItemIcon>
                <AddShoppingCartIcon />
              </ListItemIcon>
              <ListItemText
                className="list-item-text"
                primary={t("welcome.addProducttoStore")}
              />
            </ListItem>
          </Tooltip>
        </Link>

        <Link to="/selectproductname">
          <Tooltip title="Price on Date" placement="right">
            <ListItem button>
              <ListItemIcon>
                <AttachMoneyIcon />
              </ListItemIcon>
              <ListItemText
                className="list-item-text"
                primary="Price on Date"
              />
            </ListItem>
          </Tooltip>
        </Link>

        <Divider />
        <Link to="/group">
          <Tooltip title="Create a Group" placement="right">
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
          <Tooltip title="Create a Zone" placement="right">
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
          <Tooltip title="Create a Cluster" placement="right">
            <ListItem button>
              <ListItemIcon>
                <LocationCityIcon />
              </ListItemIcon>
              <ListItemText
                className="list-item-text"
                primary={t("welcome.createCluster")}
              />
            </ListItem>
          </Tooltip>
        </Link>
        <Link to="/store">
          <Tooltip title="Create a Store" placement="right">
            <ListItem button>
              <ListItemIcon>
                <StoreIcon />
              </ListItemIcon>
              <ListItemText
                className="list-item-text"
                primary={t("welcome.createStore")}
              />
            </ListItem>
          </Tooltip>
        </Link>
        <Divider />
        <Link to="/view/products/daterange">
          <Tooltip title="Cancel Effective Price Range" placement="right">
            <ListItem button>
              <ListItemIcon>
                <EventBusyIcon />
              </ListItemIcon>
              <ListItemText
                className="list-item-text"
                primary="Cancel Effective Price"
              />
            </ListItem>
          </Tooltip>
        </Link>
        <Link to="/queryondaterange">
          <Tooltip title="Query on Date Range" placement="right">
            <ListItem button>
              <ListItemIcon>
                <DateRangeIcon />
              </ListItemIcon>
              <ListItemText
                className="list-item-text"
                primary="Query on Date Range"
              />
            </ListItem>
          </Tooltip>
        </Link>
        <Divider />
        <Link to="/view/zones">
          <Tooltip title="View Zones" placement="right">
            <ListItem button>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText
                className="list-item-text"
                primary={t("welcome.viewZones")}
              />
            </ListItem>
          </Tooltip>
        </Link>
        <Link to="/view/clusters">
          <Tooltip title="View Clusters" placement="right">
            <ListItem button>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText
                className="list-item-text"
                primary={t("welcome.viewClusters")}
              />
            </ListItem>
          </Tooltip>
        </Link>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
          style={{
            width: "100%",
            zIndex: 1400,
          }}
        >
          <Toolbar>
            {sessionStorage.getItem("token") &&
            sessionStorage.getItem("token").length > 10 ? (
              <>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerToggle}
                  edge="start"
                  className={clsx(classes.menuButton, {
                    [classes.hide]: open
                  })}
                >
                  <MenuIcon />
                </IconButton>
                <StyledTab
                  label={t("header.home")}
                  component={Link}
                  id="app-header"
                  to="/group"
                />
                <div className="right-nav-btn">
                  <ReactFlagsSelect
                    countries={["US", "FR", "DE"]}
                    customLabels={{
                      US: "EN-US",
                      FR: "FR",
                      DE: "DE"
                    }}
                    className="right-nav-btn"
                    placeholder="Select Language"
                    defaultCountry={sessionStorage.getItem("countryCode")}
                    onSelect={countryCode => {
                      i18n.changeLanguage(countryCode);
                      sessionStorage.setItem("countryCode", countryCode);
                    }}
                  />
                  <Link to="/" style={{ color: "white" }}>
                    <StyledTab
                      label={t("header.logOut")}
                      onClick={() => {
                        sessionStorage.removeItem("token");
                        props.logout();
                      }}
                    />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <StyledTab label={t("header.home")} component={Link} />
                <ReactFlagsSelect
                  countries={["US", "FR", "DE"]}
                  customLabels={{
                    US: "EN-US",
                    FR: "FR",
                    DE: "DE"
                  }}
                  className="right-nav-btn"
                  placeholder="Select Language"
                  defaultCountry={sessionStorage.getItem("countryCode")}
                  onSelect={countryCode => {
                    i18n.changeLanguage(countryCode);
                    sessionStorage.setItem("countryCode", countryCode);
                  }}
                />
              </>
            )}
          </Toolbar>
        </AppBar>
        {sessionStorage.getItem("token") && (
          <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === "rtl" ? "right" : "left"}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper
                }}
                ModalProps={{
                  keepMounted: true // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper
                }}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
        )}
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/group" component={AddGroup} />
          <Route
            exact
            path={["/products/store", "/addproductstostore", "/addproducts"]}
            component={ProductRouter}
          />
          <Route exact path="/zone" component={ZoneForm} />
          <Route exact path="/cluster" component={ClusterForm} />
          <Route exact path="/store" component={StoreForm} />
          <Route exact path="/view/zones" component={ViewZones} />
          <Route exact path="/view/clusters" component={ViewClusters} />
          <Route
            exact
            path={[
              "/selectproduct",
              "/assigntocluster",
              "/assigntozone",
              "/view/assigned/zones",
              "/view/assigned/clusters"
            ]}
            component={ZoneClusterRouter}
          />
          <Route
            exact
            path="/view/products/daterange"
            component={EffectivePriceRouter}
          />
          <Route
            exact
            path={["/queryondaterange", "/showproducts"]}
            component={QueryOnDateRouter}
          />
          <Route
            exact
            path={["/selectproductname", "/addpromotion"]}
            component={PromotionRouter}
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
  logout
};
export default connect(stateAsProps, actionsAsProps)(FullNavbar);

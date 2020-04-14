import AppBar from "@material-ui/core/AppBar"
import CssBaseline from "@material-ui/core/CssBaseline"
import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
import Hidden from "@material-ui/core/Hidden"
import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles"
import Tab from "@material-ui/core/Tab"
import Toolbar from "@material-ui/core/Toolbar"
import Tooltip from "@material-ui/core/Tooltip"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"
import DateRangeIcon from "@material-ui/icons/DateRange"
import EventBusyIcon from "@material-ui/icons/EventBusy"
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted"
import GroupIcon from "@material-ui/icons/Group"
import LocationCityIcon from "@material-ui/icons/LocationCity"
import MenuIcon from "@material-ui/icons/Menu"
import PublicIcon from "@material-ui/icons/Public"
import StoreIcon from "@material-ui/icons/Store"
import clsx from "clsx"
import React from "react"
import ReactFlagsSelect from "react-flags-select"
import "react-flags-select/css/react-flags-select.css"
import "react-flags-select/scss/react-flags-select.scss"
import { useTranslation } from "react-i18next"
import { connect } from "react-redux"
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom"
import { logout } from "../../redux/actions/RetailerActions"
import Login from "../Login"
import AddGroup from "../retailer/AddGroup"
import CancelPromotionRouter from "../retailer/CancelPromotionRouter"
import ClusterForm from "../retailer/ClusterForm"
import ClusterPromotionRouter from "../retailer/ClusterPromotionRouter"
import EffectivePriceRouter from "../retailer/EffectivePriceRouter"
import ProductRouter from "../retailer/ProductRouter"
import QueryOnDateRouter from "../retailer/QueryOnDateRouter"
import StoreForm from "../retailer/StoreForm"
import ViewClusters from "../retailer/ViewClusters"
import ViewZones from "../retailer/ViewZones"
import WithdrawPromotionClusterRouter from "../retailer/WithdrawPromotionClusterRouter"
import WithdrawPromotionZoneRouter from "../retailer/WithdrawPromotionZoneRouter"
import ZoneClusterRouter from "../retailer/ZoneClusterRouter"
import ZoneForm from "../retailer/ZoneForm"
import ZonePromotionRouter from "../retailer/ZonePromotionRouter"

const drawerWidth = 250
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

const StyledTab = withStyles({
  root: {
    color: "white",
    fontFamily: "Oswald, sans-serif",
    fontSize: "18px",
  },
})(Tab)

function FullNavbar(props) {
  const classes = useStyles()
  const { t, i18n } = useTranslation()
  const theme = useTheme()
  const [open] = React.useState(false)
  const { container } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <Link to="/applypromotion/zone">
          <Tooltip title="Apply Promotion in Zone Level" placement="right">
            <ListItem button>
              <ListItemIcon>
                <AddShoppingCartIcon />
              </ListItemIcon>
              <ListItemText
                className="list-item-text"
                primary={t("welcome.applyPromotionInZoneLevel")}
              />
            </ListItem>
          </Tooltip>
        </Link>

        <Link to="/applypromotion/cluster">
          <Tooltip title="Apply Promotion in Cluster Level" placement="right">
            <ListItem button>
              <ListItemIcon>
                <AddShoppingCartIcon />
              </ListItemIcon>
              <ListItemText
                className="list-item-text"
                primary={t("welcome.applyPromotionInClusterLevel")}
              />
            </ListItem>
          </Tooltip>
        </Link>

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

        {/* <Link to="/selectproductname">
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
        </Link> */}

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
        <Link to="/cancel/promotion">
          <Tooltip title="Cancel Percentage Promotion" placement="right">
            <ListItem button>
              <ListItemIcon>
                <EventBusyIcon />
              </ListItemIcon>
              <ListItemText
                className="list-item-text"
                primary="Cancel Percentage Promotion"
              />
            </ListItem>
          </Tooltip>
        </Link>
        <Link to="/withdraw/zonepromotion">
          <Tooltip title="Withdraw Percentage Promotion Zone" placement="right">
            <ListItem button>
              <ListItemIcon>
                <EventBusyIcon />
              </ListItemIcon>
              <ListItemText
                className="list-item-text"
                primary="Withdraw Percentage Promotion Zone"
              />
            </ListItem>
          </Tooltip>
        </Link>
        <Link to="/withdraw/clusterpromotion">
          <Tooltip
            title="Withdraw Percentage Promotion Cluster"
            placement="right"
          >
            <ListItem button>
              <ListItemIcon>
                <EventBusyIcon />
              </ListItemIcon>
              <ListItemText
                className="list-item-text"
                primary="Withdraw Percentage Promotion Cluster"
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
  )

  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          style={{
            width: "100%",
            zIndex: 1400,
          }}
        >
          <Toolbar>
            {sessionStorage.getItem("token") &&
            sessionStorage.getItem("token").length > 10 ? (
              <null>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerToggle}
                  edge="start"
                  className={clsx(classes.menuButton, {
                    [classes.hide]: open,
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
                      US: " ",
                      FR: " ",
                      DE: " ",
                    }}
                    className="right-nav-btn"
                    placeholder="Select Language"
                    defaultCountry={sessionStorage.getItem("countryCode")}
                    onSelect={(countryCode) => {
                      i18n.changeLanguage(countryCode)
                      sessionStorage.setItem("countryCode", countryCode)
                    }}
                  />
                  <Link to="/" id="logout-btn">
                    <StyledTab
                      label={t("header.logOut")}
                      onClick={() => {
                        sessionStorage.removeItem("token")
                        props.logout()
                      }}
                    />
                  </Link>
                </div>
              </null>
            ) : (
              <null>
                <StyledTab label={t("header.home")} component={Link} />
                <ReactFlagsSelect
                  countries={["US", "FR", "DE"]}
                  customLabels={{
                    US: " ",
                    FR: " ",
                    DE: " ",
                  }}
                  className="right-nav-btn"
                  placeholder="Select Language"
                  defaultCountry={sessionStorage.getItem("countryCode")}
                  onSelect={(countryCode) => {
                    i18n.changeLanguage(countryCode)
                    sessionStorage.setItem("countryCode", countryCode)
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
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
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
            path={["/products/store", "/addproducts"]}
            component={ProductRouter}
          />
          <Route exact path="/zone" component={ZoneForm} />
          <Route exact path="/cluster" component={ClusterForm} />
          <Route exact path="/store" component={StoreForm} />
          <Route exact path="/view/zones" component={ViewZones} />
          <Route exact path="/view/clusters" component={ViewClusters} />
          <Route
            exact
            path="/cancel/promotion"
            component={CancelPromotionRouter}
          />
          <Route
            exact
            path="/withdraw/zonepromotion"
            component={WithdrawPromotionZoneRouter}
          />
          <Route
            exact
            path="/withdraw/clusterpromotion"
            component={WithdrawPromotionClusterRouter}
          />
          <Route
            exact
            path={[
              "/selectproduct",
              "/assigntocluster",
              "/assigntozone",
              "/view/assigned/zones",
              "/view/assigned/clusters",
            ]}
            component={ZoneClusterRouter}
          />
          <Route
            exact
            path={["/view/effectiveprices", "/view/products/daterange"]}
            component={EffectivePriceRouter}
          />
          <Route
            exact
            path={["/queryondaterange", "/showproducts"]}
            component={QueryOnDateRouter}
          />
          {/* <Route
            exact
            path={["/selectproductname", "/addpromotion"]}
            component={PromotionRouter}
          /> */}
          <Route
            exact
            path="/applypromotion/zone"
            component={ZonePromotionRouter}
          />
          <Route
            exact
            path="/applypromotion/cluster"
            component={ClusterPromotionRouter}
          />
        </Switch>
      </Router>
    </div>
  )
}

const stateAsProps = (store) => ({
  loggedInUser: store.RetailerReducer.loggedInUser,
  login_status: store.RetailerReducer.login_status,
})
const actionsAsProps = {
  logout,
}
export default connect(stateAsProps, actionsAsProps)(FullNavbar)

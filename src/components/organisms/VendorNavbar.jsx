import AppBar from "@material-ui/core/AppBar"
import CssBaseline from "@material-ui/core/CssBaseline"
import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
import Hidden from "@material-ui/core/Hidden"
import Button from "@material-ui/core/Button"
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
import LocalOfferIcon from "@material-ui/icons/LocalOffer"
import clsx from "clsx"
import React from "react"
import ReactFlagsSelect from "react-flags-select"
import "react-flags-select/css/react-flags-select.css"
import "react-flags-select/scss/react-flags-select.scss"
import { useTranslation } from "react-i18next"
import { connect } from "react-redux"
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom"
import PropTypes from "prop-types"
import { logout } from "../../redux/actions/RetailerActions"
import Login from "../Login"
import AddGroup from "../retailer/AddGroup"
import CancelPromotionRouter from "../retailer/CancelPromotionRouter"
import ClusterForm from "../retailer/ClusterForm"
import ClusterPromotionRouter from "../retailer/ClusterPromotionRouter"
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
import PriceOnDate from "../retailer/PriceOnDate"
import AssignPriceToProduct from "../retailer/AssignPriceToProduct"
import CancelNotEffectivePriceChange from "../retailer/CancelNotEffectivePriceChange"
import CancelEffectivePriceChange from "../retailer/CancelEffectivePriceChange"
import AddProduct from "../vendor/AddProduct"
import EditItemPrice from "../vendor/EditItemPrice"
import SelectProduct from "../vendor/SelectProduct"
import VendorLogin from "../vendor/VendorLogin"
import { Registration } from "../vendor/Registration"

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

function VendorNavbar(props) {
  const classes = useStyles()
  const { t, i18n } = useTranslation()
  const theme = useTheme()
  const [open] = React.useState(false)
  const { container } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const Vendordrawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <Link to="/vendor/addproduct">
          <Tooltip title="Add a Product" placement="right">
            <ListItem button>
              <ListItemIcon>
                <AddShoppingCartIcon />
              </ListItemIcon>
              <ListItemText
                className="list-item-text"
                primary="Add a Product"
              />
            </ListItem>
          </Tooltip>
        </Link>
        <Link to="/vendor/updateprice">
          <Tooltip title="Update the price of a Product" placement="right">
            <ListItem button>
              <ListItemIcon>
                <AddShoppingCartIcon />
              </ListItemIcon>
              <ListItemText
                className="list-item-text"
                primary="Update the price of a Product"
              />
            </ListItem>
          </Tooltip>
        </Link>
        <Link to="/vendor/editproduct">
          <Tooltip title="Edit the Price of a Product" placement="right">
            <ListItem button>
              <ListItemIcon>
                <AddShoppingCartIcon />
              </ListItemIcon>
              <ListItemText
                className="list-item-text"
                primary="Edit the Price of a Product"
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
            {!sessionStorage.getItem("token") && (
              <>
                <Link className="button-link" to="/vendor">
                  <Button
                    color="default"
                    className="{classes.link}"
                    id="reg-vendor"
                  >
                    Login As Vendor
                  </Button>
                </Link>
              </>
            )}
            {sessionStorage.getItem("token") &&
            sessionStorage.getItem("token").length > 10 ? (
              <>
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
                  to="/vendor/editproduct"
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
                        sessionStorage.removeItem("loginType")
                        props.logout()
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
                {Vendordrawer}
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
                {Vendordrawer}
              </Drawer>
            </Hidden>
          </nav>
        )}
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/vendor" component={VendorLogin} />
          <Route exact path="/vendor/reg" component={Registration} />
          <Route exact path="/vendor/addproduct" component={AddProduct} />
          <Route exact path="/vendor/updateprice" component={SelectProduct} />
          <Route exact path="/vendor/editproduct" component={EditItemPrice} />
        </Switch>
      </Router>
    </div>
  )
}
VendorNavbar.propTypes = {
  logout: PropTypes.func.isRequired,
  container: PropTypes.shape.isRequired,
}

const stateAsProps = (store) => ({
  loggedInUser: store.RetailerReducer.loggedInUser,
  loginStatus: store.RetailerReducer.loginStatus,
})
const actionsAsProps = {
  logout,
}
export default connect(stateAsProps, actionsAsProps)(VendorNavbar)

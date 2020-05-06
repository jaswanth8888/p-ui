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
import PersonAddIcon from "@material-ui/icons/PersonAdd"
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
import Dashboard from "../utils/Dashboard"
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
import Registration from "../vendor/Registration"
import CreateAdmin from "../retailer/CreateAdmin"
import AdminLogin from "../admin/AdminLogin"
import SellCancelProductFixedPriceRouter from "../retailer/SellCancelProductFixedPriceRouter"
import ApprovePromotionsRouter from "../retailer/ApprovePromotionsRouter"
import IncreaseQtyZone from "../retailer/IncreaseQtyZone"
import IncreaseQtyCluster from "../retailer/IncreaseQtyCluster"

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
  const { container, loggedInUser } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const Retailerdrawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <Link to="/dashboard">
          <Tooltip title="Dashboard" placement="right">
            <ListItem button id="dashboard-btn">
              <ListItemIcon>
                <DateRangeIcon />
              </ListItemIcon>
              <ListItemText
                className="list-item-text"
                primary={t("welcome.dashboard")}
              />
            </ListItem>
          </Tooltip>
        </Link>
        {loggedInUser.userType === "Retailer" && (
          <Link to="/admin">
            <Tooltip title="Create Admin" placement="right">
              <ListItem button id="create-admin-btn">
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText
                  className="list-item-text"
                  primary={t("welcome.createAdmin")}
                />
              </ListItem>
            </Tooltip>
          </Link>
        )}

        {loggedInUser.userType === "Retailer" && (
          <Link to="/approvepromotion">
            <Tooltip title="Approve Promotion" placement="right">
              <ListItem button id="approve-promotion-btn">
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText
                  className="list-item-text"
                  primary={t("welcome.approvePromotions")}
                />
              </ListItem>
            </Tooltip>
          </Link>
        )}
        <Link to="/updateqty/zone">
          <Tooltip title="Update the price of a Product" placement="right">
            <ListItem buttonid="update-price-product-btn">
              <ListItemIcon>
                <AddShoppingCartIcon />
              </ListItemIcon>
              <ListItemText
                className="list-item-text"
                primary="Increase qty at Zone Level"
              />
            </ListItem>
          </Tooltip>
        </Link>
        <Link to="/updateqty/cluster">
          <Tooltip title="Update the price of a Product" placement="right">
            <ListItem buttonid="update-price-product-btn">
              <ListItemIcon>
                <AddShoppingCartIcon />
              </ListItemIcon>
              <ListItemText
                className="list-item-text"
                primary="Increase qty at Cluster Level"
              />
            </ListItem>
          </Tooltip>
        </Link>

        <Link to="/applypromotion/zone">
          <Tooltip title="Apply Promotion in Zone Level" placement="right">
            <ListItem button id="apply-promotion-zone-btn">
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
            <ListItem button id="apply-promotion-cluster-btn">
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
            <ListItem button id="assign-price-zone-cluster-btn">
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
            <ListItem button id="add-product-store-btn">
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
        <Divider />
        <Link to="/group">
          <Tooltip title="Create a Group" placement="right">
            <ListItem button id="create-group-btn">
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
            <ListItem button id="create-zone-btn">
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
            <ListItem button id="create-cluster-btn">
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
            <ListItem button id="create-store-btn">
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
        <Link to="/priceondate">
          <Tooltip title="Price on date" placement="right">
            <ListItem button id="price-on-date-btn">
              <ListItemIcon>
                <LocalOfferIcon />
              </ListItemIcon>
              <ListItemText
                className="list-item-text"
                primary={t("welcome.priceOnDate")}
              />
            </ListItem>
          </Tooltip>
        </Link>
        <Divider />
        <Link to="/cancel/promotion">
          <Tooltip title="Cancel Percentage Promotion" placement="right">
            <ListItem button id="cancel-promotion-btn">
              <ListItemIcon>
                <EventBusyIcon />
              </ListItemIcon>
              <ListItemText
                className="list-item-text"
                primary={t("welcome.cancelPromotionPercentage")}
              />
            </ListItem>
          </Tooltip>
        </Link>
        <Link to="/withdraw/zonepromotion">
          <Tooltip title="Withdraw Percentage Promotion Zone" placement="right">
            <ListItem button id="withdraw-zone-promotion-btn">
              <ListItemIcon>
                <EventBusyIcon />
              </ListItemIcon>
              <ListItemText
                className="list-item-text"
                primary={t("welcome.withdrawPercentagePromotionZone")}
              />
            </ListItem>
          </Tooltip>
        </Link>
        <Link to="/withdraw/clusterpromotion">
          <Tooltip
            title="Withdraw Percentage Promotion Cluster"
            placement="right"
          >
            <ListItem button id="withdraw-cluster-promotion-btn">
              <ListItemIcon>
                <EventBusyIcon />
              </ListItemIcon>
              <ListItemText
                className="list-item-text"
                primary={t("welcome.withdrawPercentagePromotionCluster")}
              />
            </ListItem>
          </Tooltip>
        </Link>
        <Link to="/product/pricechange/cancelnoteffective">
          <Tooltip title="Cancel Not Effective Price Change" placement="right">
            <ListItem button id="cancel-not-effective-price-btn">
              <ListItemIcon>
                <EventBusyIcon />
              </ListItemIcon>
              <ListItemText
                className="list-item-text"
                primary={t("welcome.cancelNotEffectivePriceChange")}
              />
            </ListItem>
          </Tooltip>
        </Link>
        <Link to="/product/pricechange/canceleffective">
          <Tooltip title="Cancel Effective Price Change" placement="right">
            <ListItem button id="cancel-effective-price-btn">
              <ListItemIcon>
                <EventBusyIcon />
              </ListItemIcon>
              <ListItemText
                className="list-item-text"
                primary={t("welcome.cancelEffectivePriceChange")}
              />
            </ListItem>
          </Tooltip>
        </Link>
        <Link to="/sellcancel/fixedprice">
          <Tooltip
            title="Sell/ Cancel Product at Fixed Price"
            placement="right"
          >
            <ListItem button id="sell-cancel-fixed-price-btn">
              <ListItemIcon>
                <EventBusyIcon />
              </ListItemIcon>
              <ListItemText
                className="list-item-text"
                primary={t("welcome.sellCancelProductFixedPrice")}
              />
            </ListItem>
          </Tooltip>
        </Link>
        <Divider />
        <Link to="/queryondaterange">
          <Tooltip title="Query on Date Range" placement="right">
            <ListItem button id="query-on-date-btn">
              <ListItemIcon>
                <DateRangeIcon />
              </ListItemIcon>
              <ListItemText
                className="list-item-text"
                primary={t("welcome.queryPromotionsOnDateRange")}
              />
            </ListItem>
          </Tooltip>
        </Link>
        <Divider />
        <Link to="/view/zones">
          <Tooltip title="View Zones" placement="right">
            <ListItem button id="view-zones-btn">
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
            <ListItem button id="view-clusters-btn">
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

  const Vendordrawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <Link to="/vendor/addproduct">
          <Tooltip title="Add a Product" placement="right">
            <ListItem button id="add-product-btn">
              <ListItemIcon>
                <AddShoppingCartIcon />
              </ListItemIcon>
              <ListItemText
                className="list-item-text"
                primary={t("vendorWelcome.addProduct")}
              />
            </ListItem>
          </Tooltip>
        </Link>
        <Link to="/vendor/updateprice">
          <Tooltip title="Update the price of a Product" placement="right">
            <ListItem buttonid="update-price-product-btn">
              <ListItemIcon>
                <AddShoppingCartIcon />
              </ListItemIcon>
              <ListItemText
                className="list-item-text"
                primary={t("vendorWelcome.updatePriceOfProduct")}
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
            <StyledTab
              label={t("header.home")}
              component={Link}
              id="app-header"
              to="/"
            />
            {sessionStorage.getItem("token") ? (
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
                      if (countryCode === "FR" || countryCode === "DE") {
                        sessionStorage.setItem("currency", "EUR")
                      } else {
                        sessionStorage.setItem("currency", "USD")
                      }
                    }}
                  />
                  &emsp;
                  <StyledTab
                    id="admin-login-name"
                    label={`${t("welcomeMain")} ${loggedInUser.userName}`}
                  />
                  <Link to="/" id="logout-btn">
                    <StyledTab
                      label={t("header.logOut")}
                      onClick={() => {
                        sessionStorage.removeItem("token")
                        sessionStorage.removeItem("userType")
                        // sessionStorage.removeItem()
                        props.logout()
                      }}
                    />
                  </Link>
                </div>
              </>
            ) : (
              <div className="right-nav-btn">
                {loggedInUser.token === "" && (
                  <>
                    <Link className="button-link" to="/vendor">
                      <StyledTab
                        color="default"
                        className="{classes.link}"
                        id="reg-vendor"
                        label={t("loginAsVendor")}
                      />
                    </Link>
                    <Link className="button-link" to="/admin/login">
                      <StyledTab
                        color="default"
                        className="{classes.link}"
                        id="admin-login"
                        label={t("loginAsAdmin")}
                      />
                    </Link>
                  </>
                )}
                <ReactFlagsSelect
                  countries={["US", "FR", "DE"]}
                  customLabels={{
                    US: " ",
                    FR: " ",
                    DE: " ",
                  }}
                  id="flag-select"
                  placeholder="Select Language"
                  defaultCountry={sessionStorage.getItem("countryCode")}
                  onSelect={(countryCode) => {
                    i18n.changeLanguage(countryCode, () => {
                      sessionStorage.setItem("countryCode", countryCode)
                      if (countryCode === "FR" || countryCode === "DE") {
                        sessionStorage.setItem("currency", "EUR")
                      } else {
                        sessionStorage.setItem("currency", "USD")
                      }
                    })
                  }}
                />
              </div>
            )}
          </Toolbar>
        </AppBar>
        {loggedInUser.token !== "" && (
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
                {loggedInUser.userType === "vendor"
                  ? Vendordrawer
                  : Retailerdrawer}
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
                {loggedInUser.userType === "vendor"
                  ? Vendordrawer
                  : Retailerdrawer}
              </Drawer>
            </Hidden>
          </nav>
        )}
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/group" component={AddGroup} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route
            exact
            path={["/products/store", "/addproducts"]}
            component={ProductRouter}
          />
          <Route
            exact
            path="/approvepromotion"
            component={ApprovePromotionsRouter}
          />
          <Route exact path="/zone" component={ZoneForm} />
          <Route exact path="/cluster" component={ClusterForm} />
          <Route exact path="/store" component={StoreForm} />
          <Route exact path="/view/zones" component={ViewZones} />
          <Route exact path="/view/clusters" component={ViewClusters} />
          <Route
            exact
            path="/product/pricechange/cancelnoteffective"
            component={CancelNotEffectivePriceChange}
          />
          <Route
            exact
            path="/product/pricechange/canceleffective"
            component={CancelEffectivePriceChange}
          />
          <Route
            exact
            path={["/sellcancel/fixedprice", "/sellcancel/fixedprice/product"]}
            component={SellCancelProductFixedPriceRouter}
          />

          <Route
            exact
            path={["/cancel/promotion", "/cancel/productdetails"]}
            component={CancelPromotionRouter}
          />
          <Route
            exact
            path={["/withdraw/zonepromotion", "/withdraw/zoneproduct"]}
            component={WithdrawPromotionZoneRouter}
          />
          <Route
            exact
            path={["/withdraw/clusterpromotion", "/withdraw/clusterproduct"]}
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
              "/editprice",
            ]}
            component={ZoneClusterRouter}
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
            path={[
              "/applypromotion/zone",
              "/definepromotion/zone",
              "/view/promotions/zone",
            ]}
            component={ZonePromotionRouter}
          />
          <Route
            exact
            path={[
              "/applypromotion/cluster",
              "/definepromotion/cluster",
              "/view/promotions/cluster",
            ]}
            component={ClusterPromotionRouter}
          />
          <Route exact path="/priceondate" component={PriceOnDate} />
          <Route
            exact
            path="/assignpricetoproduct"
            component={AssignPriceToProduct}
          />

          <Route exact path="/vendor" component={VendorLogin} />
          <Route exact path="/vendor/reg" component={Registration} />
          <Route exact path="/vendor/addproduct" component={AddProduct} />
          <Route exact path="/vendor/updateprice" component={SelectProduct} />
          <Route exact path="/updateqty/zone" component={IncreaseQtyZone} />
          <Route
            exact
            path="/updateqty/cluster"
            component={IncreaseQtyCluster}
          />
          <Route exact path="/vendor/editproduct" component={EditItemPrice} />
          <Route exact path="/admin" component={CreateAdmin} />
          <Route exact path="/admin/login" component={AdminLogin} />
        </Switch>
      </Router>
    </div>
  )
}
FullNavbar.propTypes = {
  logout: PropTypes.func.isRequired,
  container: PropTypes.shape.isRequired,
  loggedInUser: PropTypes.shape.isRequired,
}

const stateAsProps = (store) => ({
  loggedInUser: store.RetailerReducer.loggedInUser,
  loginStatus: store.RetailerReducer.loginStatus,
})
const actionsAsProps = {
  logout,
}
export default connect(stateAsProps, actionsAsProps)(FullNavbar)

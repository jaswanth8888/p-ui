import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import PrivateRoute from "../utils/privateRoute";
import AddGroup from "../retailer/AddGroup.jsx";
import ClusterForm from "../retailer/ClusterForm.jsx";
import ProductRouter from "../retailer/ProductRouter.jsx";
import StoreForm from "../retailer/StoreForm.jsx";
import ViewClusters from "../retailer/ViewClusters.jsx";
import ViewZones from "../retailer/ViewZones.jsx";
import ZoneForm from "../retailer/ZoneForm.jsx";
import ZoneClusterRouter from "../retailer/ZoneClusterRouter.jsx";
import AssignToZoneRouter from "../retailer/AssignToZoneRouter.jsx";
import ViewAssignedZones from "../retailer/ViewAssignedZones.jsx";
import ViewAssignedClusters from "../retailer/ViewAssignedClusters.jsx";
import SelectProduct from "../retailer/SelectProduct.jsx";
import { createBrowserHistory } from "history";

const drawerWidth = 240;
const history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function SubNavbar() {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  return (
    <div className={classes.root}>
      <Router history={history}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar} />
          <Divider />
          <List>

            <Link to="/group">
              <ListItem button>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText className="list-item-text" primary={t("welcome.addGroup")} />
              </ListItem>
            </Link>
            <Link to="/products/store">
              <ListItem button>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText className="list-item-text" primary={t("welcome.addProducttoStore")} />
              </ListItem>
            </Link>
            <Link to="/zone">
              <ListItem button >
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText className="list-item-text" primary={t("welcome.createZone")} />
              </ListItem>
            </Link>
            <Link to="/cluster">
              <ListItem button >
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText className="list-item-text" primary={t("welcome.createCluster")} />
              </ListItem>
            </Link>
            <Link to="/store">
              <ListItem button >
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText className="list-item-text" primary={t("welcome.createStore")} />
              </ListItem>
            </Link>
            <Link to="/view/zones">
              <ListItem button>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText className="list-item-text" primary={t("welcome.viewZones")} />
              </ListItem>
            </Link>
            <Link to="/view/clusters">
              <ListItem button>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText className="list-item-text" primary={t("welcome.viewClusters")} />
              </ListItem>
            </Link>
            <Link  to="/products/assign">
              <ListItem button>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText className="list-item-text" primary={t("welcome.assignProductToClusterZone")} />
              </ListItem>
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

        <Switch>
          <Route exact path="/group" render={props => <AddGroup {...props} />} />
          <Route exact path="/products/store"  render={props => <ProductRouter {...props} />} />
          <Route exact path="/zone"  render={props => <ZoneForm {...props} />} />
          <Route exact path="/cluster" render={props => <ClusterForm {...props} />} />
          <Route exact path="/store" render={props => <StoreForm {...props} />} />
          <Route exact path="/view/zones"  render={props => <ViewZones {...props} />} />
          <Route exact path="/view/clusters" render={props => <ViewClusters {...props} />} />
          <Route exact path="/products/assign" render={props => <ZoneClusterRouter {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

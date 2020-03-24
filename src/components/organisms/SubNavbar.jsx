import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import PrivateRoute from "../utils/privateRoute";
import Welcome from "../retailer/Welcome.jsx";
import ClusterForm from "../retailer/ClusterForm.jsx";
import StoreForm from "../retailer/StoreForm.jsx";
import ViewClusters from "../retailer/ViewClusters.jsx";
import ViewZones from "../retailer/ViewZones.jsx";
import ZoneForm from "../retailer/ZoneForm.jsx";
import { useTranslation } from "react-i18next";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 224
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { t, i18n } = useTranslation();
  return (
    <div
      className={classes.root}
      style={{
        height: "100%",
        position: "relative",
        zIndex: "100",
        height: "100vh"
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label={t("welcome.createZone")} />
        <Tab label={t("welcome.createCluster")} />
        <Tab label={t("welcome.createStore")} />
        <Tab label={t("welcome.viewZones")} />
        <Tab label={t("welcome.viewClusters")} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ZoneForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ClusterForm />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <StoreForm />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ViewZones />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ViewClusters />
      </TabPanel>
      {/* <Switch>

                <PrivateRoute exact={true} path="/zonepage" component={ZoneForm} />
                <PrivateRoute exact={true} path="/cluster" component={ClusterForm} />
                <PrivateRoute exact={true} path="/store" component={StoreForm} />
                <PrivateRoute exact={true} path="/viewzones" component={ViewZones} />
                <PrivateRoute exact={true} path="/viewclusters" component={ViewClusters} />
            </Switch> */}
    </div>
  );
}

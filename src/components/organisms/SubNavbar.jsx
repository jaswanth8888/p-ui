import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React from "react";
import AddGroup from "../retailer/AddGroup.jsx";
import ClusterForm from "../retailer/ClusterForm.jsx";
import ProductRouter from "../retailer/ProductRouter.jsx";
import StoreForm from "../retailer/StoreForm.jsx";
import ViewClusters from "../retailer/ViewClusters.jsx";
import ViewZones from "../retailer/ViewZones.jsx";
import ZoneForm from "../retailer/ZoneForm.jsx";
import QueryOnDateRange from "../retailer/QueryOnDateRange.jsx"
import { useTranslation } from "react-i18next";
import QueryOnDateRouter from "../retailer/QueryOnDateRouter.jsx";

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

        <Tab label={t("welcome.addGroup")} />
        <Tab label={t("welcome.addProducttoStore")} />
        <Tab label={t("welcome.createZone")} />
        <Tab label={t("welcome.createCluster")} />
        <Tab label={t("welcome.createStore")} />
        <Tab label={t("welcome.viewZones")} />
        <Tab label={t("welcome.viewClusters")} />
        <Tab label={t("welcome.queryOnDateRange")} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <AddGroup />
      </TabPanel>
      <TabPanel value={value} index={1} to="/addproductstostore">
        <ProductRouter/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ZoneForm />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ClusterForm />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <StoreForm />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <ViewZones />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <ViewClusters />
      </TabPanel>
      <TabPanel value={value} index={7} to ="/queryondaterange">
        <QueryOnDateRouter/>
      </TabPanel>
    </div>
  );
}

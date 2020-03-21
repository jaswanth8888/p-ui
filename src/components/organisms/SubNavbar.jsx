import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';
import { BrowserRouter as Router, Link, Switch } from 'react-router-dom';
import ClusterForm from '../retailer/ClusterForm.jsx';
import StoreForm from '../retailer/StoreForm.jsx';
import ViewClusters from '../retailer/ViewClusters.jsx';
import ViewZones from '../retailer/ViewZones.jsx';
import ZoneForm from '../retailer/ZoneForm';
import PrivateRoute from '../utils/privateRoute';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

export default function SubNavbar() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Router>
            <Paper className={classes.root}>
                <Tabs
                    fullwidth
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab  component={Link} label="Create Zone" to="/zonepage"  />
                    <Tab  component={Link} label="Create Cluster" to="/cluster"  />
                    <Tab  component={Link} label="Create Store" to="/store"  />
                    <Tab  component={Link} label="View Zones" to="/viewzones"  />
                    <Tab  component={Link} label="View Clusters" to="/viewclusters"  />

                </Tabs>
            </Paper>
            <Switch>
                
                <PrivateRoute exact={true} path="/zonepage" component={ZoneForm} />
                <PrivateRoute exact={true} path="/cluster" component={ClusterForm} />
                <PrivateRoute exact={true} path="/store" component={StoreForm}/>  
                <PrivateRoute exact={true} path="/viewzones" component={ViewZones} />
                <PrivateRoute exact={true} path="/viewclusters" component={ViewClusters} />
                {/* <Route path="*" >404 Not Found</Route>  // need to create component for 4040 */}
            </Switch>
        </Router>
    );
}

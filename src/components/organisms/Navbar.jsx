import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { logout } from '../../redux/actions/RetailerActions';
import Welcome from '../retailer/Welcome.jsx';
import PrivateRoute from '../utils/privateRoute';
import Login from '../Login';



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
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

function Navbar() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Router >
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="Home" {...a11yProps(0)} component={Link} to="/welcome" />
                        <Tab label="Item Two" {...a11yProps(1)} />
                        <Tab label="Logout" {...a11yProps(2)} component={Link} to="/"
                            onClick={() => {
                                sessionStorage.removeItem("token");
                                sessionStorage.removeItem("reduxstate");
                                window.location.href = "/"
                            }}
                        />

                    </Tabs>
                </AppBar>
            </div>
            <Switch>
                <Route exact={true} path="/" component={Login} />
                <PrivateRoute exact path="/welcome" component={Welcome} />
            </Switch>

        </Router>
    );
}

const stateAsProps = (store) => ({
    loggedInUser: store.RetailerReducer.loggedInUser,
    login_status: store.RetailerReducer.login_status
});
const actionsAsProps = {
    logout: logout
};
export default connect(stateAsProps, actionsAsProps)(Navbar);

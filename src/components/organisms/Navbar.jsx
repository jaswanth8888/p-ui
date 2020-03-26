import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { logout } from '../../redux/actions/RetailerActions';
import Login from '../Login';
import Welcome from '../retailer/Welcome.jsx';
import PrivateRoute from '../utils/privateRoute';



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

const StyledTab = withStyles({
    root: {
        fontFamily : "'Open Sans Condensed', sans-serif",
        fontSize : "18px"
    },
})(Tab);

function Navbar(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Router >
            <div>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <StyledTab label="Home" {...a11yProps(0)} component={Link} to="/welcome" />
                        <StyledTab style = {{marginLeft : "auto"}} label="Logout" {...a11yProps(2)} 
                            onClick={() => {
                                sessionStorage.removeItem("token");
                                sessionStorage.removeItem("reduxstate");
                                props.logout();
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

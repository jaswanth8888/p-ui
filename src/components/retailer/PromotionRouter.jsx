import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '../utils/privateRoute';
import PriceOnDate from "./PriceOnDate";
import Promotion from "./Promotion";

export default class PromotionRouter extends Component {
    
    render() {
        return (

            <Router>
                <Redirect to='/selectproduct'/>
                <Switch>
                    <PrivateRoute exact={true} path="/selectproduct" component={PriceOnDate} />
                    <PrivateRoute exact={true} path="/addpromotion" component={Promotion} />
                </Switch>
            </Router>

        )
    }
}

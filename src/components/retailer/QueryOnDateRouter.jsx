import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '../utils/privateRoute';
import  QueryOnDateRange from './QueryOnDateRange';
import ShowProducts from './ShowProducts';

export default class QueryOnDateRouter extends Component {
    
    render() {
        return (
            <Router>
                <Redirect to='/queryondaterange'/>
                <Switch>
                    <PrivateRoute exact={true} path="/queryondaterange" component={QueryOnDateRange} />
                    <PrivateRoute exact={true} path="/showproducts" component={ShowProducts} />
                </Switch>
            </Router>
        )
    }
}
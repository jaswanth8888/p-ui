import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '../utils/privateRoute';
import SelectProduct from './SelectProduct';
import AssignToZone from './AssignToZone';
import AssignToCluster from './AssignToCluster';

export default class ProductRouter extends Component {
    
    render() {
        return (
            <div>
                <Router>
                    <Redirect to='/selectproduct'/>
                    <Switch>
                        <PrivateRoute exact={true} path="/selectproduct" component={SelectProduct} />
                        <PrivateRoute exact={true} path="/assigntocluster" component={AssignToCluster} />
                        <PrivateRoute exact={true} path="/assigntozone" component={AssignToZone} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

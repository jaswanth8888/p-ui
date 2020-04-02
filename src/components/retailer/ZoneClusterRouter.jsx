import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '../utils/privateRoute';
import SelectProduct from './SelectProduct';
import AssignToZone from './AssignToZone';
import AssignToCluster from './AssignToCluster';
import ViewAssignedZones from './ViewAssignedZones';

export default class ZoneClusterRouter extends Component {
    
    componentWillMount(){
        this.props.history.push("/products/assign")
    }

    render() {
        return (

            <Router>
                <Redirect to='/selectproduct'/>
                <Switch>
                    <PrivateRoute exact={true} path="/selectproduct" component={SelectProduct} />
                    <PrivateRoute exact={true} path="/assigntocluster" component={AssignToCluster} />
                    <PrivateRoute exact={true} path="/assigntozone" component={AssignToZone} />
                    <PrivateRoute exact={true} path="/view/assigned/zones" component={ViewAssignedZones} />
                </Switch>
            </Router>

        )
    }
}

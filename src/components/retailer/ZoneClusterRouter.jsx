import React, { Component } from "react"
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom"
import PrivateRoute from "../utils/privateRoute"
import SelectProduct from "./SelectProduct"
import AssignToZone from "./AssignToZone"
import AssignToCluster from "./AssignToCluster"
import ViewAssignedZones from "./ViewAssignedZones"
import ViewAssignedClusters from "./ViewAssignedClusters"

export default class ZoneClusterRouter extends Component {
  componentWillMount() {
    this.props.history.push("/products/assign")
  }

  render() {
    return (
      <Router>
        <Redirect to="/selectproduct" />
        <Switch>
          <PrivateRoute exact path="/selectproduct" component={SelectProduct} />
          <PrivateRoute
            exact
            path="/assigntocluster"
            component={AssignToCluster}
          />
          <PrivateRoute exact path="/assigntozone" component={AssignToZone} />
          <PrivateRoute
            exact
            path="/view/assigned/zones"
            component={ViewAssignedZones}
          />
          <PrivateRoute
            exact
            path="/view/assigned/clusters"
            component={ViewAssignedClusters}
          />
        </Switch>
      </Router>
    )
  }
}

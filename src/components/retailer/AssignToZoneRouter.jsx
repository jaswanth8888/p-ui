import React, { Component } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import PrivateRoute from "../utils/privateRoute"
import SelectProduct from "./SelectProduct"
import AssignToZone from "./AssignToZone"
import AssignToCluster from "./AssignToCluster"
import ViewAssignedZones from "./ViewAssignedZones"

export default class AssignToZoneRouter extends Component {
  render() {
    return (
      <Router>
        <Redirect to="/selectproduct" />
        <Switch>
          <Route exact path="/selectproduct" component={SelectProduct} />
          <Route exact path="/assigntozone" component={AssignToZone} />

          <Route
            exact
            path="/viewassignedzones"
            component={ViewAssignedZones}
          />
        </Switch>
      </Router>
    )
  }
}

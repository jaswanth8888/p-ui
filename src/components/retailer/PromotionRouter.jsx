import React, { Component } from "react"
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom"
import PrivateRoute from "../utils/privateRoute"
import PriceOnDate from "./PriceOnDate"
import Promotion from "./Promotion"

export default class PromotionRouter extends Component {
  render() {
    return (
      <Router>
        <Redirect to="/selectproductname" />
        <Switch>
          <PrivateRoute
            exact
            path="/selectproductname"
            component={PriceOnDate}
          />
          <PrivateRoute exact path="/addpromotion" component={Promotion} />
        </Switch>
      </Router>
    )
  }
}
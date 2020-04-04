import React, { Component } from "react"
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom"
import PrivateRoute from "../utils/privateRoute"
import GetProductsInDateRange from "./GetProductsInDateRange"
import ViewEffectiveDatesAndPrices from "./ViewEffectiveDatesAndPrices"

export default class EffectivePriceRouter extends Component {
  componentWillMount() {
    this.props.history.push("/view/products/daterange")
  }

  render() {
    return (
      <Router>
        <Redirect to="/view/products/daterange" />
        <Switch>
          <PrivateRoute
            exact
            path="/view/products/daterange"
            component={GetProductsInDateRange}
          />
          <PrivateRoute
            exact
            path="/view/effectiveprices"
            component={ViewEffectiveDatesAndPrices}
          />
        </Switch>
      </Router>
    )
  }
}

import React from "react"
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom"
import PrivateRoute from "../utils/privateRoute"
import GetProductsInDateRange from "./GetProductsInDateRange"
import ViewEffectiveDatesAndPrices from "./ViewEffectiveDatesAndPrices"

const EffectivePriceRouter = () => {
  return (
    <Router>
      <Switch>
        {/* <Redirect to="/view/products/daterange" /> */}
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

export default EffectivePriceRouter
import React from "react"
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom"
import PrivateRoute from "../utils/privateRoute"
import QueryOnDateRange from "./QueryOnDateRange"
import ShowProducts from "./ShowProducts"

const QueryOnDateRouter = () => {
  return (
    <Router>
      <Redirect to="/queryondaterange" />
      <Switch>
        <PrivateRoute
          exact
          path="/queryondaterange"
          component={QueryOnDateRange}
        />
        <PrivateRoute exact path="/showproducts" component={ShowProducts} />
      </Switch>
    </Router>
  )
}
export default QueryOnDateRouter

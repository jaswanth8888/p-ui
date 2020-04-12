import React from "react"
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom"
import PrivateRoute from "../utils/privateRoute"
import PriceOnDate from "./PriceOnDate"
import Promotion from "./Promotion"

const PromotionRouter = () => {
  return (
    <Router>
      <Redirect to="/selectproductname" />
      <Switch>
        <PrivateRoute exact path="/selectproductname" component={PriceOnDate} />
        <PrivateRoute exact path="/addpromotion" component={Promotion} />
      </Switch>
    </Router>
  )
}

export default PromotionRouter

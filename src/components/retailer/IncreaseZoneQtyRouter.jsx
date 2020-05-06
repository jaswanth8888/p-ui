import React from "react"
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom"
import PrivateRoute from "../utils/privateRoute"
import ViewZonePromotions from "./ViewZonePromotions"
import IncreaseQtyZone from "./IncreaseQtyZone"
import IncreaseQtyZoneForm from "./IncreaseQtyZoneForm"

const IncreaseZoneQtyRouter = () => {
  return (
    <Router>
      <Redirect to="/updateqty/zone" />
      <Switch>
        <PrivateRoute
          exact
          path="/updateqty/zone"
          component={IncreaseQtyZone}
        />
        <PrivateRoute
          exact
          path="/updateqty/zoneform"
          component={IncreaseQtyZoneForm}
        />
        <PrivateRoute
          exact
          path="/view/promotions/zone"
          component={ViewZonePromotions}
        />
      </Switch>
    </Router>
  )
}
export default IncreaseZoneQtyRouter

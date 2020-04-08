import React from "react"
import { BrowserRouter as Router, Switch } from "react-router-dom"
import PrivateRoute from "../utils/privateRoute"
import ApplyPromotionInZone from "./ApplyPromotionInZone"
import DefinePromotionInZone from "./DefinePromotionInZone"
import ViewZonePromotions from "./ViewZonePromotions"

const ZonePromotionRouter = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute
          exact
          path="/applypromotion/zone"
          component={ApplyPromotionInZone}
        />
        <PrivateRoute
          exact
          path="/definepromotion/zone"
          component={DefinePromotionInZone}
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
export default ZonePromotionRouter

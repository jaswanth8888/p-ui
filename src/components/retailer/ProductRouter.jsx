import React from "react"
import { BrowserRouter as Router, Switch } from "react-router-dom"
import PrivateRoute from "../utils/privateRoute"
import AddProducts from "./AddProducts"
import AddProductToStore from "./AddProductToStore"

const ProductRouter = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute
          exact
          path="/products/store"
          component={AddProductToStore}
        />
        <PrivateRoute exact path="/addproducts" component={AddProducts} />
      </Switch>
    </Router>
  )
}

export default ProductRouter

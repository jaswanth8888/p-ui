import React from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "../utils/privateRoute";
import AddProducts from "./AddProducts";
import AddProductToStore from "./AddProductToStore";

const ProductRouter = () => {
  return (
    <Router>
      <Redirect to="/addproductstostore" />
      <Switch>
        <PrivateRoute
          exact
          path="/addproductstostore"
          component={AddProductToStore}
        />
        <PrivateRoute exact path="/addproducts" component={AddProducts} />
      </Switch>
    </Router>
  );
};

export default ProductRouter;

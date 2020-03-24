import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn =
    sessionStorage.getItem("token") &&
    sessionStorage.getItem("token").length > 10;
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;


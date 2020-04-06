/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react"
import { Provider } from "react-redux"
import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import FullNavbar from "./components/organisms/FullNavbar"
import rootReducer from "./redux/reducers/rootReducer"
import VendorLogin from "./components/vendor/VendorLogin"
// eslint-disable-next-line import/no-named-as-default
import Registration from "./components/vendor/Registration"
import Home from "./components/vendor/Home"
import Addproduct from "./components/vendor/AddProduct"
import PrivateRoute from "./components/utils/privateRoute"

let state = window.sessionStorage.reduxstate
if (state) {
  state = JSON.parse(state)
}
let store = null
if (state) {
  store = createStore
  store = createStore(
    rootReducer,
    state,
    composeWithDevTools(applyMiddleware(thunk))
  )
} else {
  store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
}
// the callback to subscribe is executed everytime the state changes
// in the store
store.subscribe(() => {
  window.sessionStorage.reduxstate = JSON.stringify(store.getState())
})
export default class App extends Component {
  render() {
    const retailerRoutes = [
      "/group",
      "/products/store",
      "/zone",
      "/cluster",
      "/store",
      "/view/zones",
      "/view/clusters",
      "/products/assign",
      "/view/products/daterange",
      "/selectproductname",
      "/addproductstostore",
      "/addproducts",
      "/selectproduct",
      "/assigntocluster",
      "/assigntozone",
      "/view/assigned/zones",
      "/view/assigned/clusters",
      "/view/products/daterange",
      "/view/effectiveprices",
      "/queryondaterange",
      "/showproducts",
      "/selectproductname",
      "/addpromotion",
    ]
    return (
      <Provider store={store}>
        <div>
          <Router>
            <Switch>
              <Route exact path="/" component={FullNavbar} />
              {retailerRoutes.map((route) => {
                return <PrivateRoute component={FullNavbar} path={route} />
              })}
              <Route exact path="/vendor" component={VendorLogin} />
              <Route exact path="/vendor/reg" component={Registration} />
              <Route exact path="/vendor/home" component={Home} />
              <Route exact path="/vendor/addproduct" component={Addproduct} />
            </Switch>
          </Router>
        </div>
      </Provider>
    )
  }
}
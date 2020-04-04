import React, { Component } from "react"
import { Provider } from "react-redux"
import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import FullNavbar from "./components/organisms/FullNavbar"
import rootReducer from "./redux/reducers/rootReducer"
import VendorLogin from "./components/vendor/VendorLogin"
import Registration from "./components/vendor/Registration"
import Home from "./components/vendor/Home.jsx"
import Addproduct from "./components/vendor/AddProduct.jsx"

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
    return (
      <Provider store={store}>
        <div>
          <Router>
            <Switch>
              <Route exact path="/" component={FullNavbar} />
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

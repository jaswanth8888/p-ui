import React, { Component } from "react";
import Header from "./components/organisms/header/Header.js";
import HeaderLinks from "./components/molecules/HeaderLinks";
import Login from "./components/Login.jsx";
import rootReducer from "./redux/reducers/rootReducer.js";
import connect from 'react-redux/es/connect/connect'
  import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  HashRouter as Router,
  Route,
  Switch,
  BrowserRouter,
  Redirect
} from "react-router-dom";
import Welcome from "./components/retailer/Welcome.jsx";


let state = window.sessionStorage.reduxstate;
if (state) {
  state = JSON.parse(state);
}
let loggedIn= sessionStorage.getItem('token') && sessionStorage.getItem('token').length >10;
let store = null;
if (state) {
  store = createStore;
  store = createStore(
    rootReducer,
    state,
    composeWithDevTools(applyMiddleware(thunk))
  );
} else {
  store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
}


store.subscribe(() => {
  window.sessionStorage["reduxstate"] = JSON.stringify(store.getState());
});

class App extends Component {
  isAuthenticated () {
    var token = sessionStorage.getItem("token");
    return token && token.length > 10;
  }
  render() {    
    console.log(store.getState());
    
    
    const isLoggedIn=sessionStorage.getItem("token") &&sessionStorage.getItem("token").length>10
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact={true} path="/">  
    <Login /> 
            </Route>
            
    <Route path="/welcome" exact={true} >{isLoggedIn ? <Welcome />: <Redirect to="/"/>}</Route>        
          </Switch>
        </BrowserRouter>

        <div>
          <Header
            absolute
            brand="Retail Application"
            rightLinks={<HeaderLinks />}
            // {...rest}
          />
        </div>
      </Provider>
    );
  }
}

export default App;
import React, { Component } from 'react'
import Header from './components/organisms/header/Header.js'
import HeaderLinks from './components/molecules/HeaderLinks'
import Login from './components/Login.jsx'
import rootReducer from './redux/reducers/rootReducer.js';
import { createStore, applyMiddleware } from'redux';
import { Provider } from'react-redux';
import { composeWithDevTools} from'redux-devtools-extension';
import thunk from 'redux-thunk';
import { HashRouter as Route, Switch, BrowserRouter } from 'react-router-dom';
import Welcome from './components/retailer/Welcome.jsx';
import StoreForm from './components/retailer/StoreForm.jsx';
import ZoneForm from './components/retailer/ZoneForm';
import ClusterForm from './components/retailer/ClusterForm.jsx';


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
                <BrowserRouter >
                  <Switch>
                    <Route exact={true} path="/" component={Login} />
                    <Route exact={true} path="/welcome" component={Welcome} />               
                    <Route exact={true} path="/store" component={StoreForm} />               
                    <Route exact={true} path="/zonepage" component={ZoneForm} />               
                    <Route exact={true} path="/cluster" component={ClusterForm} />               
                  </Switch>
                </BrowserRouter>
                {/* <Router>
                    <div className="container">
                        <Route exact={true} path="/"
                            component={Login} />
                        <Route exact path="/welcome" component={Welcome}/>
                    </div>
                </Router>  */}
                <div>
                    <Header
                    absolute
                    brand="Retail Application"
                    rightLinks={<HeaderLinks/>}
                    // {...rest}
                  />
                </div>
      </Provider>
    );
  }
}

export default App;
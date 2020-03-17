import React, { Component } from 'react'
import Header from './components/organisms/header/Header'
import HeaderLinks from './components/molecules/HeaderLinks'
import Login from './components/Login.jsx'
import rootReducer from './redux/reducers/rootReducer';
import { createStore, applyMiddleware } from'redux';
import { Provider } from'react-redux';
import { composeWithDevTools} from'redux-devtools-extension';
import thunk from 'redux-thunk';
import { HashRouter as Router,Route, Switch, BrowserRouter,Redirect } from 'react-router-dom';
import Welcome from './components/retailer/Welcome.jsx';
import StoreForm from './components/retailer/StoreForm.jsx';
import ZoneForm from './components/retailer/ZoneForm';
import ClusterForm from './components/retailer/ClusterForm.jsx';
import ViewZones from './components/retailer/ViewZones.jsx';
import ViewClusters from './components/retailer/ViewClusters.jsx';


let state = window.sessionStorage.reduxstate;
if (state) {
    state = JSON.parse(state);
}

 
let store = null;
if (state) { 
    store = createStore
    store = createStore(rootReducer, state,
        composeWithDevTools(applyMiddleware(thunk)));
}
else {
    store = createStore(rootReducer,
        composeWithDevTools(applyMiddleware(thunk)));
}

// the callback to subscribe is executed everytime the state changes
// in the store
store.subscribe(() => {
    window.sessionStorage['reduxstate'] = JSON.stringify(store.getState());
});

export default class App extends Component {
  render() {
    const isLoggedIn=sessionStorage.getItem("token") &&sessionStorage.getItem("token").length>10
    
    return (
    
      <Provider store={store}>
                <BrowserRouter >
                  <Switch>
                    <Route exact={true} path="/" component={Login} />
                    <Route exact={true} path="/welcome">{isLoggedIn?<Welcome/>:<Redirect to="/"/>}</Route>               
                    <Route exact={true} path="/store">{isLoggedIn?<StoreForm/>:<Redirect to="/"/>}</Route>               
                    <Route exact={true} path="/zonepage">{isLoggedIn?<ZoneForm/>:<Redirect to="/"/>}</Route>               
                    <Route exact={true} path="/cluster">{isLoggedIn?<ClusterForm/>:<Redirect to="/"/>}</Route>  
                    <Route exact={true} path="/viewzones">{isLoggedIn?<ViewZones/>:<Redirect to="/"/>}</Route>               
                    <Route exact={true} path="/viewclusters">{isLoggedIn?<ViewClusters/>:<Redirect to="/"/>}</Route>               
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
    )
  }
}

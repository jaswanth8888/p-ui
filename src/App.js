import React, { Component } from 'react'
import Header from './components/organisms/header/Header'
import HeaderLinks from './components/molecules/HeaderLinks'
import Login from './components/Login.jsx'
import rootReducer from './redux/reducers/rootReducer';
import { createStore, applyMiddleware } from'redux';
import { Provider } from'react-redux';
import { composeWithDevTools} from'redux-devtools-extension';
import thunk from 'redux-thunk';
import { BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import Welcome from './components/retailer/Welcome.jsx';
import StoreForm from './components/retailer/StoreForm.jsx';
import ZoneForm from './components/retailer/ZoneForm';
import ClusterForm from './components/retailer/ClusterForm.jsx';
import ViewZones from './components/retailer/ViewZones.jsx';
import ViewClusters from './components/retailer/ViewClusters.jsx';
import PrivateRoute from './components/utils/privateRoute'
import AddGroup from './components/retailer/AddGroup';


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
    return (
      <Provider store={store}>
                <Router >
                  <Switch>
                    <Route exact={true} path="/" component={Login} />
                    <PrivateRoute exact path="/welcome" component={Welcome}/>               
                    <PrivateRoute exact={true} path="/store" component={StoreForm}/>               
                    <PrivateRoute exact={true} path="/zonepage" component={ZoneForm}/>               
                    <PrivateRoute exact={true} path="/cluster" component={ClusterForm} />
                    <PrivateRoute exact={true} path="/viewzones" component={ViewZones}/>
                    <PrivateRoute exact={true} path="/viewclusters" component={ViewClusters} />
                    <PrivateRoute exact={true} path="/add-group" component={AddGroup} />
                    {/* <Route path="*" >404 Not Found</Route>  // need to create component for 4040 */}
                  </Switch>
                </Router>
                <div>
                    <Header
                    absolute
                    brand="Retail Application"
                    rightLinks={<HeaderLinks/>}
                  />
                </div>
      </Provider>
    )
  }
}

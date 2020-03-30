import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import Navbar from './components/organisms/Navbar';
import rootReducer from './redux/reducers/rootReducer';
import VendorLogin from './components/vendor/VendorLogin';
import Registration from './components/vendor/Registration'
import Home from './components/vendor/Home';
import Addproduct from './components/vendor/AddProduct';
import { BrowserRouter as Router,Route, Switch} from 'react-router-dom';


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


export default class App1 extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router >
                  <Switch>
                    <Route exact={true} path="/" component={VendorLogin} />
                    <Route exact={true} path="/" component={Registration} />
                    <Route exact path="/home" component={Home}/>               
                    <Route exact={true} path="/addproduct" component={Addproduct}/>  
                    </Switch>
                </Router>
      </Provider>
    )
  }
}

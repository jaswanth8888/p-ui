import React, { Component } from 'react'
import Header from './components/organisms/header/Header.js'
import HeaderLinks from './components/molecules/HeaderLinks'
import Login from './components/Login.jsx'
import rootReducer from './redux/reducers/rootReducer.js';
import { createStore, applyMiddleware } from'redux';
import { Provider } from'react-redux';
import { composeWithDevTools} from'redux-devtools-extension';
import thunk from 'redux-thunk';
import { HashRouter as Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import Welcome from './components/retailer/Welcome.jsx';


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

// export const store = createStore(rootReducer,applyMiddleware(thunk));
// console.log(store)
export default class App extends Component {
  render() {
    return (
    
      <Provider store={store}>
                <BrowserRouter >
                  <Switch>
                    <Route exact={true} path="/" component={Login} />
                    <Route exact={true} path="/welcome" component={Welcome} />               
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

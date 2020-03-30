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
import Button from '@material-ui/core/Button';

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
  constructor(props){
    super(props)
    this.state={
        isvendor:false
    }
    this.changeTOVendor = this.changeTOVendor.bind(this);
    this.changeTORetailer = this.changeTORetailer.bind(this);
}
changeTOVendor(e) {
    let isvendor=true
    this.setState({isvendor})
}
changeTORetailer(e){
    let isvendor=false
    this.setState({isvendor})
}
  render() {
    return (
      <Provider store={store}>

        {this.state.isvendor===false &&
        <div>
          <Button
                        onClick={this.changeTOVendor} 
                        >vendorlogin</Button>
                        <Button>Vendor Register</Button>
        <Navbar />
        </div>}
        {this.state.isvendor===true && 
        <div>
          <Button
                        onClick={this.changeTORetailer}>
                            Retailer Login</Button>
        <Router >
                  <Switch>
                    <Route exact={true} path="/" component={VendorLogin} />
                    <Route exact={true} path="/" component={Registration} />
                    <Route exact path="/home" component={Home}/>               
                    <Route exact={true} path="/addproduct" component={Addproduct}/>  
                    </Switch>
                </Router>
          </div>
  }
      </Provider>
    )
  }
}

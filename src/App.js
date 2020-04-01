import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Navbar from './components/organisms/Navbar';
import VendorLogin from './components/vendor/VendorLogin';
import Registration from './components/vendor/Registration'
import Home from './components/vendor/Home';
import Addproduct from './components/vendor/AddProduct';
import { BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import store from './redux/store'

// the callback to subscribe is executed everytime the state changes
// in the store
store.subscribe(() => {
    window.sessionStorage['reduxstate'] = JSON.stringify(store.getState());
});
 export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div>
          <Router >
                    <Switch>
                      <Route exact={true} path="/" component={Navbar} />
                      <Route exact={true} path="/vendor" component={VendorLogin} />
                      <Route exact={true} path="/vendor/reg" component={Registration} />  
                      <Route exact path="/vendor/home" component={Home}/> 
                      <Route exact={true} path="/vendor/addproduct" component={Addproduct}/>  
                      </Switch>
                  </Router>
        </div>
         
      </Provider>
    )
  }
}

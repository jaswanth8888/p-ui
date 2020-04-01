import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '../utils/privateRoute';
import AddProducts from './AddProducts';
import AddProductToStore from './AddProductToStore';

export default class ProductRouter extends Component {

    componentWillMount() {
        this.props.history.push("/products/store")
    }

    render() {
        return (
            <div>
                <Router>
                    <Redirect to='/addproductstostore' />
                    <Switch>
                        <PrivateRoute exact={true} path="/addproductstostore" component={AddProductToStore} />
                        <PrivateRoute exact={true} path="/addproducts" component={AddProducts} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

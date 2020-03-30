import React, { Component } from 'react'
import App from "./App";
import App1 from "./App1"
import Button from '@material-ui/core/Button';

export default class App2 extends Component {
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
            <div>
                    {!this.state.isvendor && 
                    <div>
                        <Button
                        onClick={this.changeTOVendor} 
                        >vendorlogin</Button>
                        <Button>Vendor Register</Button>
                        <App></App>
                    </div>
                    }
                    {this.state.isvendor && 
                    <div>
                        <Button
                        onClick={this.changeTORetailer}>
                            Retailer Login</Button>
                    <App1></App1>
                    </div>}
            </div>
        )
    }
}

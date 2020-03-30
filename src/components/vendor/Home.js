import React, { Component } from 'react'

import {vendorlogout} from '../../redux/actions/VendorActions'
import connect from 'react-redux/es/connect/connect'
import Button from '@material-ui/core/Button';

 class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            isLogout:false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
       
    }
    handleSubmit(e){
        console.log("home")
        window.location.href='./addproduct'
      }
      handleLogout(e){
        sessionStorage.setItem("token",null)
        window.location.href='./'
      }
    render() {
     if(sessionStorage.getItem("token")!=null){
        return (
            <div>
                <Button
                type="button"
                variant="contained"
                color="primary"
                className="{classes.submit}"
                style={{ marginTop: "30px",
                          maeginleft:"70px"}}
                onClick={this.handleSubmit}>
               addproduct
              </Button>
            <Button
                type="button"
                variant="contained"
                color="primary"
                className="{classes.submit}"
                style={{ marginTop: "30px" ,
                marginLeft: "1000px"}}
                onClick={this.handleLogout}>
               logout
              </Button>
            </div>
        )
       }
       else{ window.location.href='./'}
    }   
}
const actionsAsProps = {
    vendorlogout:vendorlogout
};
export default connect(null,actionsAsProps)(Home)
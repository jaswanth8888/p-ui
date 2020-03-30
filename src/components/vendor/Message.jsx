/* import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import {messageSetNull} from '../../redux/actions/VendorActions'
import {  Grid, TextField,Avatar, Typography} from "@material-ui/core";
class Message extends Component {
    constructor(props) {
        super(props)
        this.state = {  
        }
    }
    componentDidMount(){
        setTimeout(()=>{
            this.props.messageSetNull()
        },5000)
    }
    render() {
        return (
            <div>
                {this.props.msg}
            </div>
        )
    }
}
const stateAsProps = (state) => ({
    msg: state.msg
});
const actionsAsProps = {
    messageSetNull: messageSetNull
};
export default connect(stateAsProps,actionsAsProps)(Message)
  */
import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import {messageSetNull} from '../../redux/actions/RetailerActions'
import { /* Grid, TextField,Avatar, */Typography} from "@material-ui/core";
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
                <Typography component="div" color="primary" variant="h6">
                {this.props.msg}
              </Typography>
            </div>
        )
    }
}

const stateAsProps = (store) => ({
    msg: store.RetailerReducer.msg
});
const actionsAsProps = {
    messageSetNull: messageSetNull
};
export default connect(stateAsProps,actionsAsProps)(Message)

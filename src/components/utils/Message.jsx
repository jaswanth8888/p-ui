import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import {messageSetNull} from '../../redux/actions/RetailerActions.js'
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';


class Message extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }

    closeAlert=()=>{
            this.props.messageSetNull()
    }

    render() {
        return (
            <>
                {this.props.msg!=='' ?
              (<Snackbar open="true" onClose={this.closeAlert} autoHideDuration={6000}
              anchorOrigin={{ vertical:'top', horizontal:'right' }}
               >
                <MuiAlert severity={this.props.msgSeverity} elevation={6} variant="filled" onClose={this.closeAlert} >
                  {this.props.msg}
                </MuiAlert>
              </Snackbar>): ''
    }
            </>
        )
    }
}

const stateAsProps = (store) => ({
    msg: store.RetailerReducer.msg,
    msgSeverity: store.RetailerReducer.msgSeverity
});
const actionsAsProps = {
    messageSetNull: messageSetNull
};
export default connect(stateAsProps,actionsAsProps)(Message)

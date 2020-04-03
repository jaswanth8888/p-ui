
import {VTOKEN,VENDOR_LOGIN_USER,VENDOR_LOGIN_FAILURE,VENDOR_LOGOUT, WELCOME_USER,VENDORFAILURE,RETAILER_BASE_URL, MESSAGE_SET_NULL,CREATE_PRODUCT}from "../actions/types";
import {registerconstants} from "../actions/registrationtypes"
const initialState = {
    loggedInUser: null,
    msg:"",
    msgSeverity: '',
    login_status:{
        success:false
    },
    register_status:{registered:false},
    product:[]
};
export default (state = initialState, action = {}) => {

    switch (action.type) {
        case registerconstants.REGISTER_SUCCESS:
            return { ...state,register_status:action.register_status                           }
        case registerconstants.REGISTER_FAILURE:
            return { ...state,register_status:action.register_status,msg:action.msg,msgSeverity:action.msgSeverity}   
        case VENDOR_LOGIN_USER:
            // return { ...state, loggedInUser: action.userInfo };
            return { ...state, login_status: action.login_status };
        case VENDOR_LOGOUT:
            return { ...initialState}
        case CREATE_PRODUCT:
            return { ...state, msg:action.msg}
        case MESSAGE_SET_NULL:
            return { ...state, msg: '', msgSeverity: '' }
        case VENDOR_LOGIN_FAILURE:
            return {...state,msg:action.msg,msgSeverity:action.msgSeverity,login_status:action.login_status}
        default:
        return {...state}
    }
}
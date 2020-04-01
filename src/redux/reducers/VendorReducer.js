
import {VTOKEN,VENDOR_LOGIN_USER,VENDOR_LOGIN_FAILURE,VENDOR_LOGOUT, WELCOME_USER,VENDORFAILURE,RETAILER_BASE_URL, MESSAGE_SET_NULL,CREATE_PRODUCT}from "../actions/types";
import {registerconstants} from "../actions/registrationtypes"
const initialState = {
    loggedInUser: null,
    msg:"",
    login_status:{
        success:false
    },
    register_status:{registered:false},
    product:[]
};
export default (state = initialState, action = {}) => {

    switch (action.type) {
        case registerconstants.REGISTER_SUCCESS:
            return { ...state,register_status:action.register_status}
        case registerconstants.REGISTER_FAILURE:
            return { ...state,register_status:action.register_status}   
        case VENDOR_LOGIN_USER:
            // return { ...state, loggedInUser: action.userInfo };
            return { ...state, login_status: action.login_status };
        case VENDOR_LOGOUT:
            return { ...state, loggedInUser: null }
/*         case VENDOR_WELCOME_USER:
           return {...state, userInfo:action.userInfo} */
        case CREATE_PRODUCT:
            return { ...state, msg:action.msg}
 /*        case VENDOR_FAILURE:
            return {...state,login_status:action.login_status} */
        case MESSAGE_SET_NULL:
            return {...state,msg:''}
        case VENDOR_LOGIN_FAILURE:
            return {...state,login_status:action.login_status}
        default:
        return {...state}
    }
}
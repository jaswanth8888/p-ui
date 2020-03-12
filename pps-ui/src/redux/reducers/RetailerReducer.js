import { LOGIN_USER, MESSAGE_SET_NULL, LOGOUT, FAILURE,WELCOME_USER, ZONE_GET_REQUEST, CLUSTER_GET_REQUEST,STORE_POST_REQUEST} from "../actions/types";

const initialState = {
    loggedInUser: null,
    zones:[],
    clusters:[],
    msg:''
};
export default (state = initialState, action = {}) => {

    switch (action.type) {
        case LOGIN_USER:
            // return { ...state, loggedInUser: action.userInfo };
            return { ...state, login_status: action.login_status };
        case LOGOUT:
            return { ...state, loggedInUser: null }
        case WELCOME_USER:
            return {...state, userInfo:action.userInfo}
        case ZONE_GET_REQUEST:
            return {...state, zones:action.zones}
        case CLUSTER_GET_REQUEST:
            return {...state, clusters:action.clusters}
        case STORE_POST_REQUEST:
            return {...state, msg:action.msg}
        case FAILURE:
            return {...state,login_status:action.login_status}
        case MESSAGE_SET_NULL:
            return {...state,msg:''}
        default:
    }
    return { ...state }
};
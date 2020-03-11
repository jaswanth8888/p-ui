import { LOGIN_USER, LOGOUT, WELCOME_USER, LOGIN_FAILURE} from "../actions/types";

const initialState = {
    loggedInUser: null
};
export default (state = initialState,action={}) => {

    switch (action.type) {
        case LOGIN_USER:
            return { ...state, login_status: action.login_status };
        case LOGOUT:
            return { ...state, loggedInUser: null }
        case WELCOME_USER:
            return {...state}
        case LOGIN_FAILURE:
            return {...state,login_status:action.login_status}
        default:
    }
    return { ...state }
};
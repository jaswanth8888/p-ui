import { LOGIN_USER, LOGOUT, WELCOME_USER} from "../actions/types";

const initialState = {
    loggedInUser: null
};
export default (state = initialState, action = {}) => {

    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loggedInUser: action.userInfo };
        case LOGOUT:
            return { ...state, loggedInUser: null }
        case WELCOME_USER:
            return {...state, userInfo:action.userInfo}
        default:
    }
    return { ...state }
};
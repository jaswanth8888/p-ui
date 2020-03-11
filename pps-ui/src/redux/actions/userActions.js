import { LOGIN_USER, LOGOUT, WELCOME_USER} from './types';

// const baseUrl = 'http://localhost:4000/';

export const login = (loginDetails) => async (dispatch) => {
    // let { data } = await axios.post(baseUrl + 'login', loginDetails);
    // console.log('user Actions',loginDetails);
    dispatch({ type: LOGIN_USER, userInfo: loginDetails });
}

export const fetchUserDetails = (loginDetails) => async (dispatch) => {
    // let { data } = await axios.post(baseUrl + 'login', loginDetails);
    // console.log('user Actions',loginDetails);
    dispatch({ type: WELCOME_USER, userInfo: loginDetails });

}

export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT });
}
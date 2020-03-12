import { LOGIN_USER, LOGOUT, WELCOME_USER,RETAILER_BASE_URL,LOGIN_FAILURE} from './types';
import axios from 'axios'



export const login = (loginDetails) => async (dispatch) => {
    await axios.post(RETAILER_BASE_URL + '/retailer/authenticate', loginDetails).then(
        (res)=>{
            sessionStorage.setItem("token",res.data['jwt'])
            dispatch({ type: LOGIN_USER,login_status:{success:true,errorMsg:'',data:res.data},userInfo:loginDetails})
        }
    ).catch((res)=>{
        dispatch({type:LOGIN_FAILURE,login_status:{success:false,errorMsg:"Invalid Username/password"}})
        
    });
    
}

export const fetchUserDetails = () => async (dispatch) => {
    // let { data } = await axios.post(baseUrl + 'login', loginDetails);
    // console.log('user Actions',loginDetails);
    dispatch({ type: WELCOME_USER });

}

export const logout = () => (dispatch) => {
    sessionStorage.removeItem("token");
    dispatch({ type: LOGOUT });
}
import { LOGIN_USER, LOGOUT, WELCOME_USER, ZONE_GET_REQUEST, RETAILER_BASE_URL, RETAILER_URL,CLUSTER_GET_REQUEST, STORE_POST_REQUEST,FAILURE, MESSAGE_SET_NULL} from './types';
// import axios from 'axios'
import axios from "axios";


export const login = (loginDetails) => async (dispatch) => {
    await axios.post(RETAILER_BASE_URL + '/retailer/authenticate', loginDetails).then(
        (res)=>{
            console.log(res);
            dispatch({ type: LOGIN_USER,login_status:{success:true,errorMsg:'',data:res.data}})
        }
    ).catch((res)=>{
        dispatch({type:FAILURE,login_status:{success:false,errorMsg:"Invalid Username/password"}})
    });
    
}

export const fetchUserDetails = (loginDetails) => async (dispatch) => {
    dispatch({ type: WELCOME_USER, userInfo: loginDetails });

}

export const getZones = () => async (dispatch) => {
    console.log("in get zones");
    await axios.get(RETAILER_BASE_URL + '/location-management/zoneNames',{ headers: {"Authorization" : `BearerR eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU4NDAyNDUwNiwiaWF0IjoxNTgzOTg4NTA2fQ.Fu8zSouGHJgEXsU7sZ8t0m-_tYnN)ai3PzHZfNLvfUgE`} }).then((res)=>{
        // await axios.get(RETAILER_BASE_URL + '/location-management/zoneNames',{ headers: {"Authorization" : `BearerR eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU4NDAyNDUwNiwiaWF0IjoxNTgzOTg4NTA2fQ.Fu8zSouGHJgEXsU7sZ8t0m-_tYnNai3PzHZfNLvfUgE`} }).then((res)=>{
        dispatch({type:ZONE_GET_REQUEST, zones:res.data})
    }).catch((err)=>{
        dispatch({type:FAILURE})
    });
}

export const getClusters= (zone) => async(dispatch) => {
    await axios.get(RETAILER_BASE_URL + '/location-management/'+zone+'/cluster',{ headers: {"Authorization" : `BearerR eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU4NDAyNDUwNiwiaWF0IjoxNTgzOTg4NTA2fQ.Fu8zSouGHJgEXsU7sZ8t0m-_tYnNai3PzHZfNLvfUgE`} }).then((res)=>{
        dispatch({type:CLUSTER_GET_REQUEST, clusters:res.data})
    }).catch((err)=>{
        dispatch({type:FAILURE})
    });  //change the URL accordingly
    console.log(zone);
}

export const postStore = (store,zone,cluster) => async(dispatch) => {
    // console.log(store);
    // console.log(zone);
    // console.log(cluster);
    
    await axios.put(RETAILER_BASE_URL+'/location-management/'+zone+'/'+cluster+'/addstore',store,{ headers: {"Authorization" : `BearerR eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU4NDAyNDUwNiwiaWF0IjoxNTgzOTg4NTA2fQ.Fu8zSouGHJgEXsU7sZ8t0m-_tYnNai3PzHZfNLvfUgE`} }).then((res)=>{
        dispatch({type:STORE_POST_REQUEST, msg:"Store Succesfully created"})    //change to data later
    }).catch((err)=>{
        dispatch({type:FAILURE})
    });  
}

export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT });
}

export const messageSetNull=() =>(dispatch) =>{
    dispatch({type:MESSAGE_SET_NULL})
}
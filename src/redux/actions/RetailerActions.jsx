import { LOGIN_USER, CREATE_CLUSTER,CREATE_ZONE, CLUSTERLIST_GET_REQUEST,TOKEN,LOGIN_FAILURE,LOGOUT, WELCOME_USER, ZONE_GET_REQUEST, ZONELIST_GET_REQUEST,RETAILER_BASE_URL, CLUSTER_GET_REQUEST, STORE_POST_REQUEST,FAILURE, MESSAGE_SET_NULL} from './types';
import axios from "axios";


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
export const fetchUserDetails = (loginDetails) => async (dispatch) => {
    dispatch({ type: WELCOME_USER, userInfo: loginDetails });

}
export const postZone = (zoneDetails) =>async (dispatch) => {
    await axios.post(RETAILER_BASE_URL + '/location-management/zone', zoneDetails, {headers: { "Authorization":TOKEN}}).then((res) => {
        dispatch({type:CREATE_ZONE, msg:"Zone Created Succesfully"}) 
    }).catch((err)=>{
        dispatch({type:CREATE_ZONE, msg:"Sorry Zone already exists"}) 
    });
    
}

export const postCluster = (cluster,zone) => async(dispatch)=>{
    await axios.put(RETAILER_BASE_URL+'/location-management/'+zone+'/cluster',cluster,{ headers: {"Authorization" : TOKEN} }).then((res)=>{
        dispatch({type:CREATE_CLUSTER,msg:"Cluster for Zone "+ zone+ " is Created Successfully"})
    }).catch((err)=>{
        dispatch({type:CREATE_CLUSTER, msg:"Sorry Cluster already exists"})
    })
}


export const getZones = () => async (dispatch) => {
    await axios.get(RETAILER_BASE_URL + '/location-management/zoneNames',{ headers: {"Authorization" : TOKEN} }).then((res)=>{
        dispatch({type:ZONE_GET_REQUEST, zones:res.data})
    }).catch((err)=>{
        dispatch({type:FAILURE})
    });
}

export const getClusters= (zone) => async(dispatch) => {
    await axios.get(RETAILER_BASE_URL + '/location-management/'+zone+'/clusters',{ headers: {"Authorization" : TOKEN} }).then((res)=>{
        dispatch({type:CLUSTER_GET_REQUEST, clusters:res.data})
    }).catch((err)=>{
        dispatch({type:FAILURE})
    });  
}

export const postStore = (store,zone,cluster) => async(dispatch) => {
    await axios.put(RETAILER_BASE_URL+'/location-management/'+zone+'/'+cluster+'/store',store,{ headers: {"Authorization" : TOKEN} }).then((res)=>{
        dispatch({type:STORE_POST_REQUEST, msg:"Store Created Succesfully"})
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
export const getZoneList = () => async (dispatch) => {
    await axios.get(RETAILER_BASE_URL + '/location-management/zone-map',{ headers: {"Authorization" : TOKEN} }).then((res)=>{
        
        dispatch({type:ZONELIST_GET_REQUEST, zoneList:res.data})
    });
}

export const getClusterList = () => async (dispatch) => {
    await axios.get(RETAILER_BASE_URL + '/location-management/cluster',{ headers: {"Authorization" : TOKEN} }).then((res)=>{
        
        dispatch({type:CLUSTERLIST_GET_REQUEST, clusterList:res.data})
    });
}

// group Actions

export const postGroup = (groupDetails) =>async (dispatch) => {
    await axios.post(RETAILER_BASE_URL + '/group-management/group', groupDetails, {headers: { "Authorization":TOKEN}}).then((res) => {
        dispatch({type:CREATE_ZONE, msg:"Group Created Succesfully"}) 
    }).catch((err)=>{
        dispatch({type:CREATE_ZONE, msg:"Sorry Group already exists"}) 
    });
    
}
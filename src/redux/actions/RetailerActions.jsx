import { STORELIST_GET_REQUEST ,CATEGORIES_GET_REQUEST ,PRODUCTS_GET_REQUEST ,ZONE_SAVE_VALUE ,CLUSTER_SAVE_VALUE ,STORE_SAVE_VALUE ,PRODUCTTOSTORE_POST_REQUEST ,STORE_GET_REQUEST, LOGIN_USER, CREATE_CLUSTER,CREATE_ZONE, CLUSTERLIST_GET_REQUEST,LOGIN_FAILURE,LOGOUT, WELCOME_USER, ZONE_GET_REQUEST, ZONELIST_GET_REQUEST,RETAILER_BASE_URL, CLUSTER_GET_REQUEST, STORE_POST_REQUEST,FAILURE, MESSAGE_SET_NULL} from './types';
import axios from "axios";

let TOKEN='';
export const login = (loginDetails) => async (dispatch) => {
    await axios.post(RETAILER_BASE_URL + '/retailer/authenticate', loginDetails).then(
        (res)=>{
            sessionStorage.setItem("token",res.data['jwt'])
            TOKEN='BearerR '+res.data['jwt']
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
    await axios.get(RETAILER_BASE_URL + '/location-management/cluster-map',{ headers: {"Authorization" : TOKEN} }).then((res)=>{
        
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

export const getStoreList =() => async (dispatch) =>{
    await axios.get(RETAILER_BASE_URL + '/location-management/store',{ headers:{"Authorization" :TOKEN}}).then((res)=>{
        dispatch({type:STORELIST_GET_REQUEST,storeList:res.data})
    });
}

export const getCategories=()=>async(dispatch)=>{
    await axios.get(RETAILER_BASE_URL+'/product-management/categories',{headers:{"Authorization":TOKEN}}).then((res)=>{
        dispatch({type:CATEGORIES_GET_REQUEST,categories:res.data})
    }).catch((err)=>{
        dispatch({type:FAILURE})
    })
}

export const getProducts=(category)=>async(dispatch)=>{
    await axios.get(RETAILER_BASE_URL+'/product-management/'+category+'/products',{headers:{'Authorization':TOKEN}}).then((res)=>{
        dispatch({type:PRODUCTS_GET_REQUEST,products:res.data})
    }).catch((err)=>{
        dispatch({type:FAILURE})
    })
}

export const saveZoneValue = (zoneValue) => (dispatch) => {
    dispatch({ type: ZONE_SAVE_VALUE, zone:zoneValue });
}

export const saveClusterValue = (clusterValue) => (dispatch) => {
    dispatch({ type: CLUSTER_SAVE_VALUE, cluster:clusterValue });
}

export const saveStoreValue = (storeValue) => (dispatch) => {
    dispatch({ type: STORE_SAVE_VALUE, store:storeValue });
}

export const postProductToStore = (zone,cluster,store,products) =>async (dispatch) => {
    await axios.put(RETAILER_BASE_URL + '/product-management/'+zone+'/'+cluster+'/'+store+'/product',products, {headers: { "Authorization":TOKEN}}).then((res) => {
        dispatch({type:PRODUCTTOSTORE_POST_REQUEST, msg:"Product Added to Store Succesfully"}) 
    }).catch((err)=>{
        dispatch({type:PRODUCTTOSTORE_POST_REQUEST, msg:"Sorry Products already exists in Store"}) 
    });   
}

export const getStores=(zone,cluster) => async(dispatch) => {
    await axios.get(RETAILER_BASE_URL+'/location-management/'+zone+'/'+cluster+'/stores',{headers:{"Authorization" : TOKEN}}).then((res)=>{
        dispatch({type:STORE_GET_REQUEST,stores:res.data})
    }).catch((err)=>{
        dispatch({type:FAILURE})
    });
}

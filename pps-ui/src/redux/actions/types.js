// these are simple constants that are used by 
// actions and reducers to avoid spell mistakes.

export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const WELCOME_USER = "WELCOME_USER";

export const ZONE_GET_REQUEST = "ZONE_GET_REQUEST";
export const CLUSTER_GET_REQUEST = "CLUSTER_GET_REQUEST";
export const STORE_POST_REQUEST = "STORE_POST_REQUEST";
export const FAILURE = "FAILURE";
export const RETAILER_BASE_URL = "http://10.150.223.216:8765";
export const RETAILER_URL = "http://10.150.223.216:9300";
export const MESSAGE_SET_NULL="MESSAGE_SET_NULL";
export const CREATE_ZONE="CREATE_ZONE";
export const CREATE_CLUSTER="CREATE_CLUSTER";
export const TOKEN='BearerR '+sessionStorage.getItem("token");
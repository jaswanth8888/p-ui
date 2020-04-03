// these are simple constants that are used by
// actions and reducers to avoid spell mistakes.



export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const WELCOME_USER = "WELCOME_USER";

export const STORE_POST_REQUEST = "STORE_POST_REQUEST";
export const PRODUCT_POST_REQUEST="PRODUCT_POST_REQUEST";
export const PRODUCTTOSTORE_POST_REQUEST="PRODUCTTOSTORE_POST_REQUEST";
export const FAILURE = "FAILURE";

// export const RETAILER_BASE_URL = "http://10.102.143.121:8765";
export const RETAILER_BASE_URL = "http://10.150.222.113:8765";  //saahil
//export const RETAILER_BASE_URL = "http://10.102.137.146:8765";
//export const RETAILER_BASE_URL = "http://10.102.143.225:8765";
// export const RETAILER_BASE_URL = "http://10.102.130.66:8765";    //kartheek system


export const RETAILER_URL = "http://10.155.236.236:9300";


export const MESSAGE_SET_NULL="MESSAGE_SET_NULL";
export const CREATE_ZONE="CREATE_ZONE";
export const CREATE_CLUSTER="CREATE_CLUSTER";

export const ZONE_GET_REQUEST = "ZONE_GET_REQUEST";
export const CLUSTER_GET_REQUEST = "CLUSTER_GET_REQUEST";
export const STORE_GET_REQUEST="STORE_GET_REQUEST";

export const ZONELIST_GET_REQUEST="ZONELIST_GET_REQUEST";
export const CLUSTERLIST_GET_REQUEST="CLUSTERLIST_GET_REQUEST";
export const STORELIST_GET_REQUEST="STORELIST_GET_REQUEST";

export const ZONE_SAVE_VALUE="ZONE_SAVE_VALUE";
export const CLUSTER_SAVE_VALUE="CLUSTER_SAVE_VALUE";
export const STORE_SAVE_VALUE="STORE_SAVE_VALUE";

export const CATEGORIES_GET_REQUEST="CATEGORIES_GET_REQUEST";
export const PRODUCTS_GET_REQUEST="PRODUCTS_GET_REQUEST"
export const PRODUCT_GET_BYRANGE="PRODUCT_GET_BYRANGE"

export const PRODUCTLIST_GET_REQUEST="PRODUCTLIST_GET_REQUEST"
export const PRODUCT_SAVE_VALUE="PRODUCT_SAVE_VALUE"
export const PRODUCT_GET_REQUEST="PRODUCT_GET_REQUEST"
export const PROMOTION_POST_REQUEST="PROMOTION_POST_REQUEST"
export const ZONECLUSTER_GET_REQUEST="ZONECLUSTER_GET_REQUEST";
export const ASSIGN_TO_CLUSTER="ASSIGN_TO_CLUSTER";
export const ASSIGN_TO_ZONE="ASSIGN_TO_ZONE";
export const RESET_STATUS_CODE="RESET_STATUS_CODE";


export const TOKEN='BearerR '+sessionStorage.getItem("token");


//vendor constants
export const VENDOR_LOGIN_USER = "VENDOR_LOGIN_USER";
export const VENDOR_LOGIN_FAILURE = "VENDOR-LOGIN_FAILURE";
export const VENDOR_LOGOUT = "VENDOR_LOGOUT"; 
export const VENDOR_FAILURE = "VENDOR-FAILURE";

export const CREATE_PRODUCT="CREATE_PRODUCT";
export const VTOKEN='BearerV '+sessionStorage.getItem("token");

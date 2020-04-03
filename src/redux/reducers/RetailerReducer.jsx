
import {
    LOGIN_USER,
    MESSAGE_SET_NULL,
    LOGIN_FAILURE,
    CREATE_CLUSTER,
    CREATE_ZONE,
    PRODUCTTOSTORE_POST_REQUEST,
    LOGOUT, FAILURE,
    CLUSTERLIST_GET_REQUEST,
    ZONELIST_GET_REQUEST,
    WELCOME_USER,
    ZONE_GET_REQUEST,
    CLUSTER_GET_REQUEST,
    STORE_POST_REQUEST,
    STORE_GET_REQUEST,
    STORELIST_GET_REQUEST,
    CATEGORIES_GET_REQUEST,
    PRODUCTS_GET_REQUEST,
    ZONE_SAVE_VALUE,
    CLUSTER_SAVE_VALUE,
    STORE_SAVE_VALUE,
    PRODUCTLIST_GET_REQUEST,
    PRODUCT_SAVE_VALUE,
    PRODUCT_GET_REQUEST,
    PROMOTION_POST_REQUEST,
    ZONECLUSTER_GET_REQUEST,
    ASSIGN_TO_CLUSTER,
    ASSIGN_TO_ZONE,
    PRODUCT_GET_BYRANGE,
    RESET_STATUS_CODE
} from "../actions/types";

const initialState = {
    loggedInUser: null,
    zones: [],
    clusters: [],
    stores: [],
    zone: "",
    cluster: "",
    store: "",
    categories: [],
    products: [],
    msg: '',
    msgSeverity: '',
    login_status: {
        success: false
    },
    isvendor: false,
    zoneList: {},
    clusterList: {},
    productList: [],
    productName: "",
    updatedPrice: "",
    productDetails: {},
    promotionDetails: {},
    zoneclusternames: [],
    statusCode: ''
};
export default (state = initialState, action = {}) => {

    switch (action.type) {
        case LOGIN_USER:
            return { ...state, login_status: action.login_status };
        case LOGOUT:
            return { ...initialState }
        case WELCOME_USER:
            return { ...state, userInfo: action.userInfo }
        case ZONE_GET_REQUEST:
            return { ...state, zones: action.zones }
        case CLUSTER_GET_REQUEST:
            return { ...state, clusters: action.clusters }
        case STORE_GET_REQUEST:
            return { ...state, stores: action.stores }
        case STORE_POST_REQUEST:
            return { ...state, msg: action.msg }
        case FAILURE:
            return { ...state, login_status: action.login_status }
        case MESSAGE_SET_NULL:
            return { ...state, msg: '', msgSeverity: '' }
        case LOGIN_FAILURE:
            return { ...state, login_status: action.login_status }
        case CREATE_ZONE:
            return { ...state, msg: action.msg, msgSeverity: action.msgSeverity }
        case CREATE_CLUSTER:
            return { ...state, msg: action.msg, msgSeverity: action.msgSeverity }
        case ZONELIST_GET_REQUEST:
            return { ...state, zoneList: action.zoneList }
        case CLUSTERLIST_GET_REQUEST:
            return { ...state, clusterList: action.clusterList }
        case STORELIST_GET_REQUEST:
            return { ...state, storeList: action.storeList }
        case CATEGORIES_GET_REQUEST:
            return { ...state, categories: action.categories }
        case PRODUCTS_GET_REQUEST:
            return { ...state, products: action.products }
        case PRODUCT_GET_BYRANGE:
            return { ...state, products: action.products }
        case ZONE_SAVE_VALUE:
            return { ...state, zone: action.zone }
        case CLUSTER_SAVE_VALUE:
            return { ...state, cluster: action.cluster }
        case STORE_SAVE_VALUE:
            return { ...state, store: action.store }
        case PRODUCTTOSTORE_POST_REQUEST:
            return { ...state, msg: action.msg }
        case PRODUCTLIST_GET_REQUEST:
            return { ...state, productList: action.productList }
        case PRODUCT_SAVE_VALUE:
            return { ...state, productName: action.productName }
        case PRODUCT_GET_REQUEST:
            return { ...state, productDetails: action.productDetails }
        case PROMOTION_POST_REQUEST:
            return {
                ...state, promotionDetails: action.promotionDetails,
                msg: action.msg, msgSeverity: action.msgSeverity
            }
        case ZONECLUSTER_GET_REQUEST:
            return { ...state, zoneclusternames: action.zoneclusternames }
        case ASSIGN_TO_CLUSTER:
            return { ...state, msg: action.msg, msgSeverity: action.msgSeverity, statusCode: action.statusCode }
        case ASSIGN_TO_ZONE:
            return { ...state, msg: action.msg, msgSeverity: action.msgSeverity, statusCode: action.statusCode }
        case RESET_STATUS_CODE:
            return { ...state, statusCode: ''}
        default:
            return { ...state }
    }

};
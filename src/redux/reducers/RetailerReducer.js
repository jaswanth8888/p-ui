import {
  LOGIN_USER,
  MESSAGE_SET_NULL,
  LOGIN_FAILURE,
  CREATE_CLUSTER,
  CREATE_ZONE,
  PRODUCTTOSTORE_POST_REQUEST,
  LOGOUT,
  FAILURE,
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
  RESET_STATUS_CODE,
  LEVEL_SAVE_VALUE,
  PROMOTIONS_GET_BYRANGE,
  GET_PROMOTIONS_CLUSTER,
  STARTDATE_SAVE_VALUE,
  ENDDATE_SAVE_VALUE,
  IS_PROMOTION_APPLLIED,
  PRODUCT_UPDATE,
} from "../actions/types"

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
  msg: "",
  msgSeverity: "",
  loginStatus: {
    success: false,
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
  statusCode: "",
  promotions: [],
  clusterPromotions: [],
  startDate: "",
  endDate: "",
  levelOption: "",
  isPromotion: false,
  updatedProduct: {},
}
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginStatus: action.loginStatus }
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
      return { ...state, loginStatus: action.loginStatus }
    case MESSAGE_SET_NULL:
      return { ...state, msg: "", msgSeverity: "" }
    case LOGIN_FAILURE:
      return {
        ...state,
        loginStatus: action.loginStatus,
        msg: action.msg,
        msgSeverity: action.msgSeverity,
      }
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
    case IS_PROMOTION_APPLLIED:
      return { ...state, isPromotion: action.isPromotion }
    case PRODUCT_UPDATE:
      return {
        ...state,
        updatedProduct: action.updatedProduct,
        msg: action.msg,
        msgSeverity: action.msgSeverity,
      }
    case PROMOTION_POST_REQUEST:
      return {
        ...state,
        promotionDetails: action.promotionDetails,
        msg: action.msg,
        msgSeverity: action.msgSeverity,
      }
    case ZONECLUSTER_GET_REQUEST:
      return { ...state, zoneclusternames: action.zoneclusternames }
    case ASSIGN_TO_CLUSTER:
      return {
        ...state,
        msg: action.msg,
        msgSeverity: action.msgSeverity,
        statusCode: action.statusCode,
      }
    case ASSIGN_TO_ZONE:
      return {
        ...state,
        msg: action.msg,
        msgSeverity: action.msgSeverity,
        statusCode: action.statusCode,
      }
    case RESET_STATUS_CODE:
      return { ...state, statusCode: "" }
    case LEVEL_SAVE_VALUE:
      return { ...state, levelOption: action.levelOption }
    case PROMOTIONS_GET_BYRANGE:
      return { ...state, promotions: action.promotions }
    case GET_PROMOTIONS_CLUSTER:
      return { ...state, clusterPromotions: action.clusterPromotions }
    case STARTDATE_SAVE_VALUE:
      return { ...state, startDate: action.startDate }
    case ENDDATE_SAVE_VALUE:
      return { ...state, endDate: action.endDate }
    default:
      return { ...state }
  }
}

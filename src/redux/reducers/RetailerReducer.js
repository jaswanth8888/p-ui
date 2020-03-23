import {
  LOGIN_USER,
  MESSAGE_SET_NULL,
  LOGIN_FAILURE,
  CREATE_CLUSTER,
  CREATE_ZONE,
  LOGOUT,
  FAILURE,
  CLUSTERLIST_GET_REQUEST,
  ZONELIST_GET_REQUEST,
  WELCOME_USER,
  ZONE_GET_REQUEST,
  CLUSTER_GET_REQUEST,
  STORE_POST_REQUEST
} from "../actions/types";

const initialState = {
  loggedInUser: null,
  zones: [],
  clusters: [],
  msg: "",
  login_status: {
    success: false
  },
  zoneList: {},
  clusterList: {}
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN_USER:
      // return { ...state, loggedInUser: action.userInfo };
      return { ...state, login_status: action.login_status };
    case LOGOUT:
      return { ...state, loggedInUser: null };
    case WELCOME_USER:
      return { ...state, userInfo: action.userInfo };
    case ZONE_GET_REQUEST:
      return { ...state, zones: action.zones };
    case CLUSTER_GET_REQUEST:
      return { ...state, clusters: action.clusters };
    case STORE_POST_REQUEST:
      return { ...state, msg: action.msg };
    case FAILURE:
      return { ...state, login_status: action.login_status };
    case MESSAGE_SET_NULL:
      return { ...state, msg: "" };
    case LOGIN_FAILURE:
      return { ...state, login_status: action.login_status };
    case CREATE_ZONE:
      return { ...state, msg: action.msg };
    case CREATE_CLUSTER:
      return { ...state, msg: action.msg };
    case ZONELIST_GET_REQUEST:
      return { ...state, zoneList: action.zoneList };
    case CLUSTERLIST_GET_REQUEST:
      return { ...state, clusterList: action.clusterList };
    default:
      return { ...state };
  }
};

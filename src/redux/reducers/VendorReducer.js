import {
  VENDOR_LOGIN_USER,
  VENDOR_LOGIN_FAILURE,
  VENDOR_LOGOUT,
  MESSAGE_SET_NULL,
  CREATE_PRODUCT,
} from "../actions/types"
import { registerconstants } from "../actions/registrationtypes"

const initialState = {
  loggedInUser: null,
  msg: "",
  msgSeverity: "",
  loginStatus: {
    success: false,
  },
  registerStatus: { registered: false },
  product: [],
}
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case registerconstants.REGISTER_SUCCESS:
      return {
        ...state,
        registerStatus: action.registerStatus,
        msg: action.msg,
        msgSeverity: action.msgSeverity,
      }
    case registerconstants.REGISTER_FAILURE:
      return {
        ...state,
        registerStatus: action.registerStatus,
        msg: action.msg,
        msgSeverity: action.msgSeverity,
      }
    case VENDOR_LOGIN_USER:
      // return { ...state, loggedInUser: action.userInfo };
      return { ...state, loginStatus: action.loginStatus }
    case VENDOR_LOGOUT:
      return { ...initialState }
    case CREATE_PRODUCT:
      return { ...state, msg: action.msg, msgSeverity: action.msgSeverity }
    case MESSAGE_SET_NULL:
      return { ...state, msg: "", msgSeverity: "" }
    case VENDOR_LOGIN_FAILURE:
      return {
        ...state,
        msg: action.msg,
        msgSeverity: action.msgSeverity,
        loginStatus: action.loginStatus,
      }
    default:
      return { ...state }
  }
}

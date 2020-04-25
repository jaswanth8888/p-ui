import { ADMIN_LOGIN, ADMIN_LOGOUT } from "../actions/types"

const initialState = {
  msg: "",
  msgSeverity: "",
  loginStatus: {
    success: false,
  },
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADMIN_LOGIN:
      return { ...state, loginStatus: action.loginStatus }
    case ADMIN_LOGOUT:
      return { ...initialState }
    default:
      return { ...state }
  }
}

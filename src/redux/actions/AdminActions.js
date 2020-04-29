import axios from "axios"
import i18n from "i18next"
import {
  ADMIN_LOGIN,
  RETAILER_BASE_URL,
  USER_TYPE,
  MESSAGE_SET,
  PROMOTION_ALERT,
  FAILURE,
} from "./types"

const TOKEN = () => {
  if (sessionStorage.getItem("userType") === "Retailer") {
    return `BearerR ${sessionStorage.getItem("token")}`
  }

  return `BearerA ${sessionStorage.getItem("token")}`
}

// eslint-disable-next-line import/prefer-default-export
export const login = (loginDetails) => async (dispatch) => {
  await axios
    .post(`${RETAILER_BASE_URL}/admin/authenticate`, loginDetails)
    .then((res) => {
      sessionStorage.setItem("token", res.data.jwt)
      sessionStorage.setItem("userType", "admin")
      dispatch({
        type: USER_TYPE,
        loggedInUser: {
          token: res.data.jwt,
          userType: "admin",
          userName: res.data.userName,
        },
      })
      dispatch({
        type: ADMIN_LOGIN,
        loginStatus: { success: true, errorMsg: "", data: res.data },
        userInfo: loginDetails,
      })
    })
    .catch(() => {
      dispatch({
        type: MESSAGE_SET,
        msg: i18n.t("login.invalidCredentials"),
        msgSeverity: "error",
      })
    })
}

export const getPromotionAlert = (date) => async (dispatch) => {
  await axios
    .post(`http://www.mocky.io/v2/5ea8e43a2d000097883a414d`, date, {
      headers: { Authorization: TOKEN() },
    })
    .then((res) => {
      dispatch({ type: PROMOTION_ALERT, promotionAlert: res.data })
    })
    .catch(() => {
      dispatch({ type: FAILURE })
    })
}

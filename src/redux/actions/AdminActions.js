import axios from "axios"
import i18n from "i18next"
import { ADMIN_LOGIN, ADMIN_LOGIN_FAILURE, RETAILER_BASE_URL } from "./types"

const ATOKEN = () => {
  return `BearerA ${sessionStorage.getItem("token")}`
}

export const login = (loginDetails) => async (dispatch) => {
  await axios
    .post(`${RETAILER_BASE_URL}/admin/authenticate`, loginDetails)
    .then((res) => {
      sessionStorage.setItem("token", res.data.jwt)
      dispatch({
        type: ADMIN_LOGIN,
        loginStatus: { success: true, errorMsg: "", data: res.data },
        userInfo: loginDetails,
      })
    })
    .catch(() => {
      dispatch({
        type: ADMIN_LOGIN_FAILURE,
        loginStatus: {
          success: false,
          errorMsg: i18n.t("login.invalidCredentials"),
        },
        msg: i18n.t("login.invalidCredentials"),
        msgSeverity: "error",
      })
    })
}

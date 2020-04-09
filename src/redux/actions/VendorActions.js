import axios from "axios"
import { registerconstants } from "./registrationtypes"
import {
  VTOKEN,
  VENDOR_LOGIN_USER,
  VENDOR_LOGIN_FAILURE,
  VENDOR_LOGOUT,
  RETAILER_BASE_URL,
  MESSAGE_SET_NULL,
  CREATE_PRODUCT,
} from "./types"

export const registration = (registrationdetails) => async (dispatch) => {
  await axios
    .post(
      `${RETAILER_BASE_URL}/vendor-retailer-management/vendor`,
      registrationdetails
    )
    .then((res) => {
      const body = { dest: registrationdetails.email, body: res.data }
      axios
        .post(
          "https://us-central1-price-promotion-system.cloudfunctions.net/sendMail",
          body
        )
        .then(() => {
          dispatch({
            type: registerconstants.REGISTER_SUCCESS,
            register_status: { registered: true },
            msg:
              "Account registered,please verify your mail by clicking on the link sent to you",
            msgSeverity: "success",
          })
        })
        .catch(() => {
          dispatch({
            type: registerconstants.REGISTER_FAILURE,
            register_status: { registered: false, error: true },
            msg: "something went wrong while sending mail",
            msgSeverity: "error",
          })
        })
    })
    .catch((res) => {
      dispatch({
        type: registerconstants.REGISTER_FAILURE,
        register_status: { registered: false, error: true },
        msg: res.response.data.message,
        msgSeverity: "error",
      })
    })
}
export const postProduct = (productDetails) => async (dispatch) => {
  await axios
    .post(`${RETAILER_BASE_URL}/product-management/product`, productDetails, {
      headers: { Authorization: VTOKEN },
    })
    .then(() => {
      dispatch({
        type: CREATE_PRODUCT,
        msg: "Product Added Succesfully",
        msgSeverity: "success",
      })
    })
    .catch(() => {
      dispatch({
        type: CREATE_PRODUCT,
        msg: "Sorry try again",
        msgSeverity: "error",
      })
    })
}
export const vendorlogin = (loginDetails) => async (dispatch) => {
  await axios
    .post(`${RETAILER_BASE_URL}/vendor/authenticate`, loginDetails)
    .then((res) => {
      sessionStorage.setItem("token", res.data.jwt)
      dispatch({
        type: VENDOR_LOGIN_USER,
        login_status: { success: true, msg: "", data: res.data },
        userInfo: loginDetails,
      })
    })
    .catch((res) => {
      dispatch({
        type: VENDOR_LOGIN_FAILURE,
        login_status: { success: false },
        msg:
          res.response.data.message === "Access Denied"
            ? "Invalid Username/Password"
            : res.response.data.message,
        msgSeverity: "error",
      })
    })
}
export const vendorlogout = () => (dispatch) => {
  dispatch({ type: VENDOR_LOGOUT })
}
export const messageSetNull = () => (dispatch) => {
  dispatch({ type: MESSAGE_SET_NULL })
}

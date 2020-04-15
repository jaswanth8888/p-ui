import axios from "axios"
import { registerconstants } from "./registrationtypes"
import {
  VENDOR_LOGIN_USER,
  VENDOR_LOGIN_FAILURE,
  VENDOR_LOGOUT,
  RETAILER_BASE_URL,
  MESSAGE_SET_NULL,
  CREATE_PRODUCT,
  PRODUCT_GET_REQUEST,
  IS_PROMOTION_APPLLIED,
  PRODUCT_UPDATE,
  FAILURE,
  PRODUCTLIST_GET_REQUEST,
  PRODUCT_SAVE_VALUE,
} from "./types"

const VTOKEN = () => {
  return `BearerV ${sessionStorage.getItem("token")}`
}

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
            registerStatus: { registered: true },
            msg:
              "Account registered,please verify your mail by clicking on the link sent to you",
            msgSeverity: "success",
          })
        })
        .catch(() => {
          dispatch({
            type: registerconstants.REGISTER_FAILURE,
            registerStatus: { registered: false, error: true },
            msg: "something went wrong while sending mail",
            msgSeverity: "error",
          })
        })
    })
    .catch((res) => {
      dispatch({
        type: registerconstants.REGISTER_FAILURE,
        registerStatus: { registered: false, error: true },
        msg: res.response.data.message,
        msgSeverity: "error",
      })
    })
}
export const postProduct = (productDetails) => async (dispatch) => {
  await axios
    .post(`${RETAILER_BASE_URL}/product-management/product`, productDetails, {
      headers: { Authorization: VTOKEN() },
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
export const vendorLogin = (loginDetails) => async (dispatch) => {
  await axios
    .post(`${RETAILER_BASE_URL}/vendor/authenticate`, loginDetails)
    .then((res) => {
      sessionStorage.setItem("token", res.data.jwt)
      dispatch({
        type: VENDOR_LOGIN_USER,
        loginStatus: { success: true, msg: "", data: res.data },
        userInfo: loginDetails,
      })
    })
    .catch((res) => {
      dispatch({
        type: VENDOR_LOGIN_FAILURE,
        loginStatus: { success: false },
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
export const getProductList = () => async (dispatch) => {
  await axios
    .get(`${RETAILER_BASE_URL}/product-management/products/names`, {
      headers: { Authorization: VTOKEN() },
    })
    .then((res) => {
      dispatch({ type: PRODUCTLIST_GET_REQUEST, productList: res.data })
    })
}
export const getProductDetails = (productName) => async (dispatch) => {
  await axios
    .get(`${RETAILER_BASE_URL}/product-management/product/${productName}`, {
      headers: { Authorization: VTOKEN() },
    })
    .then((res) => {
      dispatch({ type: PRODUCT_GET_REQUEST, productDetails: res.data })
    })
}
export const isPromotionApplied = (productName) => async (dispatch) => {
  await axios
    .get(
      `${RETAILER_BASE_URL}/product-management/${productName}/product/promotion`,
      {
        headers: { Authorization: VTOKEN() },
      }
    )
    .then((res) => {
      dispatch({ type: IS_PROMOTION_APPLLIED, isPromotion: res.data })
    })
    .catch(() => {
      alert("not sucess")
      dispatch({
        type: FAILURE,
        msg: "try again",
        msgSeverity: "error",
      })
    })
}
export const updateProduct = (updatedProduct, productName) => async (
  dispatch
) => {
  await axios
    .put(
      `${RETAILER_BASE_URL}/product-management/${productName}/product`,
      updatedProduct,
      { headers: { Authorization: VTOKEN() } }
    )
    .then(() => {
      dispatch({ type: PRODUCT_UPDATE, msg: "Updated Sucessfully" })
    })
    .catch(() => {
      dispatch({
        type: FAILURE,
        msg: "try again",
        msgSeverity: "error",
      })
    })
}
export const saveProductValue = (productValue) => (dispatch) => {
  dispatch({ type: PRODUCT_SAVE_VALUE, productName: productValue })
}

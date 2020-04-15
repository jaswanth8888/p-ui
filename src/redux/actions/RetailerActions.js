import axios from "axios"
import i18n from "i18next"
import {
  STORELIST_GET_REQUEST,
  CATEGORIES_GET_REQUEST,
  PRODUCTS_GET_REQUEST,
  ZONE_SAVE_VALUE,
  CLUSTER_SAVE_VALUE,
  STORE_SAVE_VALUE,
  PRODUCTTOSTORE_POST_REQUEST,
  STORE_GET_REQUEST,
  LOGIN_USER,
  CREATE_CLUSTER,
  CREATE_ZONE,
  CLUSTERLIST_GET_REQUEST,
  LOGIN_FAILURE,
  LOGOUT,
  WELCOME_USER,
  ZONE_GET_REQUEST,
  ZONELIST_GET_REQUEST,
  RETAILER_BASE_URL,
  CLUSTER_GET_REQUEST,
  STORE_POST_REQUEST,
  FAILURE,
  MESSAGE_SET_NULL,
  PRODUCTLIST_GET_REQUEST,
  PRODUCT_SAVE_VALUE,
  PRODUCT_GET_REQUEST,
  PROMOTION_POST_REQUEST,
  ZONECLUSTER_GET_REQUEST,
  ASSIGN_TO_CLUSTER,
  ASSIGN_TO_ZONE,
  PRODUCT_POST_REQUEST,
  RESET_STATUS_CODE,
  LEVEL_SAVE_VALUE,
  PROMOTIONS_GET_BYRANGE,
  GET_PROMOTIONS_CLUSTER,
  STARTDATE_SAVE_VALUE,
  ENDDATE_SAVE_VALUE,
  PRODUCTDETAILS_NOTEFFECTIVEPRICECHANGE_GET_REQUEST,
  PRODUCTDETAILS_EFFECTIVEPRICECHANGE_GET_REQUEST,
  PRODUCT_CANCEL_EFFECTIVEPRICECHANGE,
} from "./types"

const TOKEN = () => {
  return `BearerR ${sessionStorage.getItem("token")}`
}

export const login = (loginDetails) => async (dispatch) => {
  await axios
    .post(`${RETAILER_BASE_URL}/retailer/authenticate`, loginDetails)
    .then((res) => {
      sessionStorage.setItem("token", res.data.jwt)
      dispatch({
        type: LOGIN_USER,
        loginStatus: { success: true, errorMsg: "", data: res.data },
        userInfo: loginDetails,
      })
    })
    .catch(() => {
      dispatch({
        type: LOGIN_FAILURE,
        loginStatus: {
          success: false,
          errorMsg: i18n.t("login.invalidCredentials"),
        },
        msg: i18n.t("login.invalidCredentials"),
        msgSeverity: "error",
      })
    })
}
export const fetchUserDetails = (loginDetails) => async (dispatch) => {
  dispatch({ type: WELCOME_USER, userInfo: loginDetails })
}
export const postZone = (zoneDetails) => async (dispatch) => {
  await axios
    .post(`${RETAILER_BASE_URL}/location-management/zone`, zoneDetails, {
      headers: { Authorization: TOKEN() },
    })
    .then(() => {
      dispatch({
        type: CREATE_ZONE,
        msg: "Zone Created Succesfully",
        msgSeverity: "success",
      })
    })
    .catch((err) => {
      const { response } = err
      if (response.status === 404) {
        dispatch({
          type: CREATE_ZONE,
          msg: "Sorry Zone already exists",
          msgSeverity: "error",
        })
      } else if (response.status === 403) {
        dispatch({
          type: CREATE_ZONE,
          msg: "Something went wrong ,please logout and try again",
          msgSeverity: "warning",
        })
      } else {
        dispatch({
          type: CREATE_ZONE,
          msg: "Something went wrong ,please  try again",
          msgSeverity: "warning",
        })
      }
    })
}

export const postCluster = (cluster, zone) => async (dispatch) => {
  await axios
    .put(`${RETAILER_BASE_URL}/location-management/${zone}/cluster`, cluster, {
      headers: { Authorization: TOKEN() },
    })
    .then(() => {
      dispatch({
        type: CREATE_CLUSTER,
        msg: `Cluster for Zone ${zone} is Created Successfully`,
        msgSeverity: "success",
      })
    })
    .catch((err) => {
      const { response } = err
      if (response.status === 404) {
        dispatch({
          type: CREATE_CLUSTER,
          msg: response.data.message,
          msgSeverity: "error",
        })
      } else if (response.status === 403) {
        dispatch({
          type: CREATE_CLUSTER,
          msg: "Something went wrong ,please logout and try again",
          msgSeverity: "warning",
        })
      } else {
        dispatch({
          type: CREATE_CLUSTER,
          msg: "Something went wrong ,please  try again",
          msgSeverity: "warning",
        })
      }
    })
}

export const getZones = () => async (dispatch) => {
  await axios
    .get(`${RETAILER_BASE_URL}/location-management/zones/names`, {
      headers: { Authorization: TOKEN() },
    })
    .then((res) => {
      dispatch({ type: ZONE_GET_REQUEST, zones: res.data })
    })
    .catch(() => {
      dispatch({ type: FAILURE })
    })
}

export const getClusters = (zone) => async (dispatch) => {
  await axios
    .get(`${RETAILER_BASE_URL}/location-management/${zone}/clusters/names`, {
      headers: { Authorization: TOKEN() },
    })
    .then((res) => {
      dispatch({ type: CLUSTER_GET_REQUEST, clusters: res.data })
    })
    .catch(() => {
      dispatch({ type: FAILURE })
    })
}

export const postStore = (store, zone, cluster) => async (dispatch) => {
  await axios
    .put(
      `${RETAILER_BASE_URL}/location-management/${zone}/${cluster}/store`,
      store,
      { headers: { Authorization: TOKEN() } }
    )
    .then(() => {
      dispatch({ type: STORE_POST_REQUEST, msg: "Store Created Succesfully" })
    })
    .catch(() => {
      dispatch({ type: FAILURE })
    })
}

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT })
}

export const messageSetNull = () => (dispatch) => {
  dispatch({ type: MESSAGE_SET_NULL })
}
export const getZoneList = () => async (dispatch) => {
  await axios
    .get(`${RETAILER_BASE_URL}/location-management/zone-map`, {
      headers: { Authorization: TOKEN() },
    })
    .then((res) => {
      dispatch({ type: ZONELIST_GET_REQUEST, zoneList: res.data })
    })
}

export const getClusterList = () => async (dispatch) => {
  await axios
    .get(`${RETAILER_BASE_URL}/location-management/cluster-map`, {
      headers: { Authorization: TOKEN() },
    })
    .then((res) => {
      dispatch({ type: CLUSTERLIST_GET_REQUEST, clusterList: res.data })
    })
}

// group Actions

export const postGroup = (groupDetails) => async (dispatch) => {
  await axios
    .post(`${RETAILER_BASE_URL}/group-management/group`, groupDetails, {
      headers: { Authorization: TOKEN() },
    })
    .then(() => {
      dispatch({
        type: CREATE_ZONE,
        msg: "Group Created Succesfully",
        msgSeverity: "success",
      })
    })
    .catch((err) => {
      const { response } = err
      if (response.status === 400) {
        dispatch({
          type: CREATE_ZONE,
          msg: "Sorry Group already exists",
          msgSeverity: "error",
        })
      } else if (response.status === 403) {
        dispatch({
          type: CREATE_ZONE,
          msg: "Something went wrong ,please logout and try again",
          msgSeverity: "warning",
        })
      } else {
        dispatch({
          type: CREATE_ZONE,
          msg: "Something went wrong ,please  try again",
          msgSeverity: "warning",
        })
      }
    })
}

export const getStoreList = () => async (dispatch) => {
  await axios
    .get(`${RETAILER_BASE_URL}/location-management/store`, {
      headers: { Authorization: TOKEN() },
    })
    .then((res) => {
      dispatch({ type: STORELIST_GET_REQUEST, storeList: res.data })
    })
}

export const getCategories = () => async (dispatch) => {
  await axios
    .get(`${RETAILER_BASE_URL}/product-management/categories`, {
      headers: { Authorization: TOKEN() },
    })
    .then((res) => {
      dispatch({ type: CATEGORIES_GET_REQUEST, categories: res.data })
    })
    .catch(() => {
      dispatch({ type: FAILURE })
    })
}

export const getProducts = (category) => async (dispatch) => {
  await axios
    .get(`${RETAILER_BASE_URL}/product-management/${category}/products`, {
      headers: { Authorization: TOKEN() },
    })
    .then((res) => {
      dispatch({ type: PRODUCTS_GET_REQUEST, products: res.data })
    })
    .catch(() => {
      dispatch({ type: FAILURE })
    })
}

export const saveZoneValue = (zoneValue) => (dispatch) => {
  dispatch({ type: ZONE_SAVE_VALUE, zone: zoneValue })
}

export const saveClusterValue = (clusterValue) => (dispatch) => {
  dispatch({ type: CLUSTER_SAVE_VALUE, cluster: clusterValue })
}

export const saveStoreValue = (storeValue) => (dispatch) => {
  dispatch({ type: STORE_SAVE_VALUE, store: storeValue })
}

export const postProductToStore = (zone, cluster, store, products) => async (
  dispatch
) => {
  await axios
    .put(
      `${RETAILER_BASE_URL}/product-management/${zone}/${cluster}/${store}/product`,
      products,
      { headers: { Authorization: TOKEN() } }
    )
    .then(() => {
      dispatch({
        type: PRODUCTTOSTORE_POST_REQUEST,
        msg: "Product Added to Store Succesfully",
      })
    })
    .catch(() => {
      dispatch({
        type: PRODUCTTOSTORE_POST_REQUEST,
        msg: "Sorry Products already exists in Store",
      })
    })
}

export const getStores = (zone, cluster) => async (dispatch) => {
  await axios
    .get(
      `${RETAILER_BASE_URL}/location-management/${zone}/${cluster}/stores/names`,
      { headers: { Authorization: TOKEN() } }
    )
    .then((res) => {
      dispatch({ type: STORE_GET_REQUEST, stores: res.data })
    })
    .catch(() => {
      dispatch({ type: FAILURE })
    })
}

export const getPromotionsInRange = (fromDate, toDate, levelOption) => async (
  dispatch
) => {
  await axios
    .get(
      `${RETAILER_BASE_URL}/product-management/products/${levelOption}/data?filter=%7B%22startDate%22:%22${fromDate}%22,%22endDate%22:%22${toDate}%22%7D`,
      {
        headers: { Authorization: TOKEN() },
      }
    )
    .then((res) => {
      dispatch({ type: PROMOTIONS_GET_BYRANGE, promotions: res.data })
    })
    .catch(() => {
      dispatch({ type: FAILURE })
    })
}

export const getProductList = () => async (dispatch) => {
  await axios
    .get(`${RETAILER_BASE_URL}/product-management/products/names`, {
      headers: { Authorization: TOKEN() },
    })
    .then((res) => {
      dispatch({ type: PRODUCTLIST_GET_REQUEST, productList: res.data })
    })
}

export const saveProductValue = (productValue) => (dispatch) => {
  dispatch({ type: PRODUCT_SAVE_VALUE, productName: productValue })
}

export const getProductDetails = (productName) => async (dispatch) => {
  await axios
    .get(`${RETAILER_BASE_URL}/product-management/product/${productName}`, {
      headers: { Authorization: TOKEN() },
    })
    .then((res) => {
      dispatch({ type: PRODUCT_GET_REQUEST, productDetails: res.data })
    })
}

export const getZoneClusterNames = (clusterPattern) => async (dispatch) => {
  await axios
    .get(
      `${RETAILER_BASE_URL}/location-management/clusters/regex/${clusterPattern}`,
      {
        headers: { Authorization: TOKEN() },
      }
    )
    .then((res) => {
      dispatch({ type: ZONECLUSTER_GET_REQUEST, zoneclusternames: res.data })
    })
}

export const assignToCluster = (
  clusterDetails,
  zoneName,
  clusterName,
  productName
) => async (dispatch) => {
  await axios
    .put(
      `${RETAILER_BASE_URL}/product-management/${productName}/${zoneName}/${clusterName}/products`,
      clusterDetails,
      { headers: { Authorization: TOKEN() } }
    )
    .then((res) => {
      dispatch({
        type: ASSIGN_TO_CLUSTER,
        msg: "Product Asigned to Cluster Succesfully",
        statusCode: res.status,
      })
    })
    .catch((err) => {
      const { response } = err
      if (
        response.status === 400 &&
        response.data.message === "Quantity Insufficient"
      ) {
        dispatch({ type: MESSAGE_SET_NULL })
        dispatch({
          type: ASSIGN_TO_CLUSTER,
          msg: "Quantity assigned is high, please enter a lower quantity",
          msgSeverity: "error",
          statusCode: response.status,
        })
      } else if (
        response.status === 400 &&
        response.data.message === "Product price is below minimum selling price"
      ) {
        dispatch({
          type: ASSIGN_TO_ZONE,
          msg:
            "Profit percentage is very low, please enter a higher percentage",
          msgSeverity: "error",
          statusCode: response.status,
        })
      } else if (response.status === 403) {
        dispatch({ type: MESSAGE_SET_NULL })
        dispatch({
          type: ASSIGN_TO_CLUSTER,
          msg: "Something went wrong ,please logout and try again",
          msgSeverity: "warning",
          statusCode: response.status,
        })
      } else {
        dispatch({ type: MESSAGE_SET_NULL })
        dispatch({
          type: ASSIGN_TO_CLUSTER,
          msg: "Something went wrong ,please try again",
          msgSeverity: "warning",
          statusCode: response.status,
        })
      }
    })
}

export const assignToZone = (zoneDetails, zoneName, productName) => async (
  dispatch
) => {
  await axios
    .put(
      `${RETAILER_BASE_URL}/product-management/${zoneName}/${productName}/product`,
      zoneDetails,
      { headers: { Authorization: TOKEN() } }
    )
    .then((res) => {
      dispatch({
        type: ASSIGN_TO_ZONE,
        msg: "Product Asigned to Zone Succesfully",
        statusCode: res.status,
      })
    })
    .catch((err) => {
      const { response } = err
      if (
        response.status === 400 &&
        response.data.message === "Product is already associated with zone"
      ) {
        dispatch({
          type: ASSIGN_TO_ZONE,
          msg: "Product is already associated with zone, please try again",
          msgSeverity: "error",
          statusCode: response.status,
        })
      } else if (
        response.status === 400 &&
        response.data.message === "Quantity Insufficient"
      ) {
        dispatch({
          type: ASSIGN_TO_ZONE,
          msg: "Quantity assigned is high, please enter a lower quantity",
          msgSeverity: "error",
          statusCode: response.status,
        })
      } else if (
        response.status === 400 &&
        response.data.message === "Product price is below minimum selling price"
      ) {
        dispatch({
          type: ASSIGN_TO_ZONE,
          msg:
            "Profit percentage is very low, please enter a higher percentage",
          msgSeverity: "error",
          statusCode: response.status,
        })
      } else if (response.status === 400) {
        dispatch({
          type: ASSIGN_TO_ZONE,
          msg: response.data.message,
          msgSeverity: "warning",
          statusCode: response.status,
        })
      } else if (response.status === 403) {
        dispatch({
          type: ASSIGN_TO_ZONE,
          msg: "Something went wrong ,please logout and try again",
          msgSeverity: "warning",
          statusCode: response.status,
        })
      } else {
        dispatch({ type: MESSAGE_SET_NULL })
        dispatch({
          type: ASSIGN_TO_ZONE,
          msg: "Something went wrong ,please  try again",
          msgSeverity: "warning",
          statusCode: response.status,
        })
      }
    })
}

export const postPromotion = (
  promotionDetails,
  productName,
  levelOption
) => async (dispatch) => {
  dispatch({ type: MESSAGE_SET_NULL })
  await axios
    .put(
      `${RETAILER_BASE_URL}/product-management/product/promotion/${productName}/${levelOption}`,
      promotionDetails,
      {
        headers: { Authorization: TOKEN() },
      }
    )
    .then((res) => {
      if (res.data.status) {
        dispatch({
          type: PROMOTION_POST_REQUEST,
          msg: "promotion applied Succesfully",
          msgSeverity: "success",
        })
      } else {
        dispatch({
          type: PROMOTION_POST_REQUEST,
          msg: "promotion cannot not applied",
          msgSeverity: "error",
        })
      }
    })
    .catch((err) => {
      const { response } = err
      if (response.status === 400) {
        dispatch({
          type: PROMOTION_POST_REQUEST,
          msg: "Sorry something went wrong",
          msgSeverity: "error",
        })
      } else if (response.status === 403) {
        dispatch({
          type: PROMOTION_POST_REQUEST,
          msg: "Something went wrong ,please logout and try again",
          msgSeverity: "warning",
        })
      } else {
        dispatch({
          type: PROMOTION_POST_REQUEST,
          msg: "Something went wrong ,please  try again",
          msgSeverity: "warning",
        })
      }
    })
}

export const getPricesInRange = (startDate, endDate, currentDate) => async (
  dispatch
) => {
  await axios
    .get(
      `${RETAILER_BASE_URL}/product-management/products/data?filter=%7B%22startDate%22:%22${startDate}%22,%22endDate%22:%22${endDate}%22,%22currentDate%22:%22${currentDate}%22%7D`,
      {
        headers: { Authorization: TOKEN() },
      }
    )
    .then((res) => {
      dispatch({ type: PRODUCTS_GET_REQUEST, products: res.data })
    })
    .catch(() => {
      dispatch({ type: FAILURE })
    })
}

export const cancelEffectivePrice = (productName, promotionId) => async (
  dispatch
) => {
  await axios
    .put(
      `${RETAILER_BASE_URL}/product-management/` +
        `product/${productName}/${promotionId}`,
      { headers: { Authorization: TOKEN() } }
    )
    .then(() => {
      dispatch({ type: PRODUCT_POST_REQUEST, msg: "Withdraw Done!" })
    })
    .catch(() => {
      dispatch({ type: FAILURE })
    })
}

export const resetStatusCode = () => (dispatch) => {
  dispatch({ type: RESET_STATUS_CODE })
}

export const cancelPromotion = (details, productName, levelOption) => async (
  dispatch
) => {
  await axios
    .put(
      `${RETAILER_BASE_URL}/product-management/` +
        `product/promotion/cancel/${productName}/${levelOption}`,
      details,
      { headers: { Authorization: TOKEN() } }
    )
    .then(() => {
      dispatch({ type: PRODUCT_POST_REQUEST, msg: "Cancel Successful!" })
    })
    .catch(() => {
      dispatch({ type: FAILURE })
    })
}

export const withdrawPromotion = (
  details,
  productName,
  levelOption,
  promotionId
) => async (dispatch) => {
  await axios
    .put(
      `${RETAILER_BASE_URL}/product-management/` +
        `product/promotion/withdraw/${productName}/${levelOption}/${promotionId}`,
      details,
      { headers: { Authorization: TOKEN() } }
    )
    .then(() => {
      dispatch({ type: PRODUCT_POST_REQUEST, msg: "Withdraw Successful!" })
    })
    .catch(() => {
      dispatch({ type: FAILURE })
    })
}

export const saveLevelValue = (level) => (dispatch) => {
  dispatch({ type: LEVEL_SAVE_VALUE, levelOption: level })
}

export const getPromotionsIncluster = (
  productName,
  zoneName,
  clusterName
) => async (dispatch) => {
  await axios
    .get(
      `${RETAILER_BASE_URL}/product-management/product/promotions/${productName}/${zoneName}/${clusterName}`,
      {
        headers: { Authorization: TOKEN() },
      }
    )
    .then((res) => {
      dispatch({ type: GET_PROMOTIONS_CLUSTER, clusterPromotions: res.data })
    })
    .catch(() => {
      dispatch({ type: FAILURE })
    })
}

export const saveStartDate = (start) => (dispatch) => {
  dispatch({ type: STARTDATE_SAVE_VALUE, startDate: start })
}

export const saveEndDate = (end) => (dispatch) => {
  dispatch({ type: ENDDATE_SAVE_VALUE, endDate: end })
}

export const getNotEffecticePriceChangeProducts = () => async (dispatch) => {
  await axios
    .get(
      `${RETAILER_BASE_URL}/product-management/product/effectivePriceNotInEffect`,
      {
        headers: { Authorization: TOKEN() },
      }
    )
    .then((res) => {
      dispatch({
        type: PRODUCTDETAILS_NOTEFFECTIVEPRICECHANGE_GET_REQUEST,
        priceChangeProductsList: res.data,
      })
    })
}

export const getEffecticePriceChangeProducts = () => async (dispatch) => {
  await axios
    .get(
      `${RETAILER_BASE_URL}/product-management/product/effectivePriceInEffect`,
      {
        headers: { Authorization: TOKEN() },
      }
    )
    .then((res) => {
      dispatch({
        type: PRODUCTDETAILS_EFFECTIVEPRICECHANGE_GET_REQUEST,
        priceChangeProductsList: res.data,
      })
    })
}

export const cancelProductEffectivePriceChange = (productName) => async (
  dispatch
) => {
  await axios
    .put(
      `${RETAILER_BASE_URL}/product-management/product/effectivePrice/cancel${productName}`,
      {
        headers: { Authorization: TOKEN() },
      }
    )
    .then(() => {
      dispatch({
        type: PRODUCT_CANCEL_EFFECTIVEPRICECHANGE,
        msg: "Cancelled Product Price Change Successfully",
      })
    })
    .catch((err) => {
      const { response } = err
      if (response.status === 403) {
        dispatch({
          type: PROMOTION_POST_REQUEST,
          msg: "Something went wrong ,please logout and try again",
          msgSeverity: "warning",
        })
      } else {
        dispatch({
          type: PROMOTION_POST_REQUEST,
          msg: "Something went wrong ,please  try again",
          msgSeverity: "warning",
        })
      }
    })
}

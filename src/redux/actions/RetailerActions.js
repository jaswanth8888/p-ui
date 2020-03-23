import {
  LOGIN_USER,
  CREATE_CLUSTER,
  CREATE_ZONE,
  CLUSTERLIST_GET_REQUEST,
  TOKEN,
  LOGIN_FAILURE,
  LOGOUT,
  WELCOME_USER,
  ZONE_GET_REQUEST,
  ZONELIST_GET_REQUEST,
  RETAILER_BASE_URL,
  CLUSTER_GET_REQUEST,
  STORE_POST_REQUEST,
  FAILURE,
  MESSAGE_SET_NULL
} from "./types";
import axios from "axios";
import React from "react";
import i18n from "i18next";

export const login = loginDetails => async dispatch => {
  await axios
    .post(RETAILER_BASE_URL + "/retailer/authenticate", loginDetails)
    .then(res => {
      sessionStorage.setItem("token", res.data["jwt"]);
      dispatch({
        type: LOGIN_USER,
        login_status: { success: true, errorMsg: "", data: res.data },
        userInfo: loginDetails
      });
    })
    .catch(res => {
      dispatch({
        type: LOGIN_FAILURE,
        login_status: {
          success: false,
          errorMsg: i18n.t("login.invalidCredentials")
        }
      });
    });
};
export const fetchUserDetails = loginDetails => async dispatch => {
  dispatch({ type: WELCOME_USER, userInfo: loginDetails });
};
export const postZone = zoneDetails => async dispatch => {
  await axios
    .post(RETAILER_BASE_URL + "/location-management/zone", zoneDetails, {
      headers: { Authorization: TOKEN }
    })
    .then(res => {
      dispatch({
        type: CREATE_ZONE,
        msg: i18n.t("message.zoneSuccess")
      });
    })
    .catch(err => {
      dispatch({
        type: CREATE_ZONE,
        msg: i18n.t("message.zoneExists")
      });
    });
};

export const postCluster = (cluster, zone) => async dispatch => {
  await axios
    .put(
      RETAILER_BASE_URL + "/location-management/" + zone + "/addcluster",
      cluster,
      { headers: { Authorization: TOKEN } }
    )
    .then(res => {
      dispatch({
        type: CREATE_CLUSTER,
        msg:
          i18n.t("message.clusterSuccess1") +
          zone +
          i18n.t("message.clusterSuccess2")
      });
    })
    .catch(err => {
      dispatch({
        type: CREATE_CLUSTER,
        msg: i18n.t("message.clusterExists")
      });
    });
};

export const getZones = () => async dispatch => {
  await axios
    .get(RETAILER_BASE_URL + "/location-management/zoneNames", {
      headers: { Authorization: TOKEN }
    })
    .then(res => {
      dispatch({ type: ZONE_GET_REQUEST, zones: res.data });
    })
    .catch(err => {
      dispatch({ type: FAILURE });
    });
};

export const getClusters = zone => async dispatch => {
  await axios
    .get(RETAILER_BASE_URL + "/location-management/" + zone + "/cluster", {
      headers: { Authorization: TOKEN }
    })
    .then(res => {
      dispatch({ type: CLUSTER_GET_REQUEST, clusters: res.data });
    })
    .catch(err => {
      dispatch({ type: FAILURE });
    });
};

export const postStore = (store, zone, cluster) => async dispatch => {
  await axios
    .put(
      RETAILER_BASE_URL +
        "/location-management/" +
        zone +
        "/" +
        cluster +
        "/addstore",
      store,
      { headers: { Authorization: TOKEN } }
    )
    .then(res => {
      dispatch({
        type: STORE_POST_REQUEST,
        msg: i18n.t("message.storeSuccess")
      });
    })
    .catch(err => {
      dispatch({ type: FAILURE });
    });
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};

export const messageSetNull = () => dispatch => {
  dispatch({ type: MESSAGE_SET_NULL });
};
export const getZoneList = () => async dispatch => {
  await axios
    .get(RETAILER_BASE_URL + "/location-management/zonelist", {
      headers: { Authorization: TOKEN }
    })
    .then(res => {
      dispatch({ type: ZONELIST_GET_REQUEST, zoneList: res.data });
    });
};

export const getClusterList = () => async dispatch => {
  await axios
    .get(RETAILER_BASE_URL + "/location-management/clusterlist", {
      headers: { Authorization: TOKEN }
    })
    .then(res => {
      dispatch({ type: CLUSTERLIST_GET_REQUEST, clusterList: res.data });
    });
};

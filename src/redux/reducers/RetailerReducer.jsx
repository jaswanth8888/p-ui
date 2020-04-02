import { LOGIN_USER, MESSAGE_SET_NULL, LOGIN_FAILURE, 
    CREATE_CLUSTER, CREATE_ZONE, PRODUCTTOSTORE_POST_REQUEST, LOGOUT, 
    FAILURE, CLUSTERLIST_GET_REQUEST, ZONELIST_GET_REQUEST, WELCOME_USER,
    ZONE_GET_REQUEST, CLUSTER_GET_REQUEST, STORE_POST_REQUEST, 
    STORE_GET_REQUEST, STORELIST_GET_REQUEST, CATEGORIES_GET_REQUEST, 
    PRODUCTS_GET_REQUEST, ZONE_SAVE_VALUE, CLUSTER_SAVE_VALUE,
    STORE_SAVE_VALUE, PRODUCTLIST_GET_REQUEST, PRODUCT_SAVE_VALUE,PRODUCT_GET_REQUEST, 
    ZONECLUSTER_GET_REQUEST,ASSIGN_TO_CLUSTER,ASSIGN_TO_ZONE } from "../actions/types";

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
    msg: '',
    msgSeverity: '',
    login_status: {
        success: false
    },
    isvendor: false,
    zoneList: {},
    clusterList: {},
    productList:["product","product2"],
    product: "",
    productName:"JackDaniels",
    productDetails:{
        "productId": 1,
        "productName": "JackDaniels",
        "productGroup": "",
        "productCategory": "ALCOHOL_PROD",
        "productBasePrice": 1000,
        "initialQuantity": 1000,
        "remainingQuantity": 808,
        "uom": "lts",
        "companyName": "Jack",
        "productDescription": null,
        "productImagePath": "https://images.unsplash.com/photo-1527281400683-1aae777175f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        "volume": 0.7,
        "promotions": [
            {
                "promotionId": 1,
                "effectivePercentage": 0,
                "startDate": "2020-04-01T15:36:15.113+0000",
                "endDate": "2020-04-01T15:36:15.113+0000",
                "isActivated": true
            },
            {
                "promotionId": 2,
                "effectivePercentage": 0,
                "startDate": "2020-04-01T15:36:15.113+0000",
                "endDate": "2020-04-01T15:36:15.113+0000",
                "isActivated": true
            }
        ],
        "abv": 37.5,
        "nutritionalFacts": [],
        "assignProduct": [
            {
                "zoneName": "Pakistan",
                "quantityAssigned": 20,
                "price": 1200,
                "profitPercentage": 20,
                "minimumSP": 525,
                "cluster": null
            },
            {
                "zoneName": "Kazakistan",
                "quantityAssigned": 20,
                "price": 6000,
                "profitPercentage": 500,
                "minimumSP": 4725,
                "cluster": null
            },
            {
                "zoneName": "Cambodia",
                "quantityAssigned": 20,
                "price": 5000,
                "profitPercentage": 400,
                "minimumSP": 4725,
                "cluster": null
            },
            {
                "zoneName": "Russia",
                "quantityAssigned": 20,
                "price": 5000,
                "profitPercentage": 400,
                "minimumSP": 525,
                "cluster": null
            },
            {
                "zoneName": "France",
                "quantityAssigned": 10,
                "price": 1100,
                "profitPercentage": 10,
                "minimumSP": 13.125,
                "cluster": [
                    {
                        "clusterName": "Marseille",
                        "quantityAssigned": 50,
                        "price": 1122,
                        "profitPercentage": 2,
                        "store": null
                    }
                ]
            },
            {
                "zoneName": "Arizona",
                "quantityAssigned": 10,
                "price": 1020,
                "profitPercentage": 2,
                "minimumSP": 131.25,
                "cluster": null
            }
        ]
    },

    zoneclusternames: []

};
export default (state = initialState, action = {}) => {

    switch (action.type) {
        case LOGIN_USER:
            // return { ...state, loggedInUser: action.userInfo };
            return { ...state, login_status: action.login_status };
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
            return { ...state, login_status: action.login_status }
        case MESSAGE_SET_NULL:
            return { ...state, msg: '', msgSeverity: '' }
        case LOGIN_FAILURE:
            return { ...state, login_status: action.login_status }
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
        case ZONECLUSTER_GET_REQUEST:
            return { ...state, zoneclusternames: action.zoneclusternames }
        case ASSIGN_TO_CLUSTER:
            return { ...state, msg:action.msg, msgSeverity: action.msgSeverity  }
        case ASSIGN_TO_ZONE:
            return { ...state, msg:action.msg, msgSeverity: action.msgSeverity  }
        default:
            return { ...state }
    }

};
import axios from "axios"; 
import {registerconstants} from './registrationtypes';
import {VTOKEN,VENDOR_LOGIN_USER,VENDOR_LOGIN_FAILURE,VENDOR_LOGOUT, WELCOME_USER,VENDORFAILURE,RETAILER_BASE_URL, MESSAGE_SET_NULL,CREATE_PRODUCT}from "./types"

export const registration=(registrationdetails)=>async(dispatch)=>{
    await axios.post(RETAILER_BASE_URL+'/vendor-retailer-management/vendor',registrationdetails).then(
        (res)=>{
            console.log("successful registration");
            dispatch({type:registerconstants.REGISTER_SUCCESS,register_status:{registered:true,msg:""}})

        }
    ).catch((res)=>{
        console.log("failed Registration");
        dispatch({type:registerconstants.REGISTER_FAILURE,register_status:{registered:false,error:true,msg:"Registration Failed"}})
    })
    }
export const postProduct = (productDetails) =>async (dispatch) => {
        await axios.post(RETAILER_BASE_URL+"/product-management/product", productDetails,{headers:{ "Authorization":VTOKEN}}).then((res) => {
        alert("added sucessfuly")
        dispatch({type:CREATE_PRODUCT, msg:"Product Added Succesfully"}) 
    }).catch((err)=>{
        console.log(productDetails)
        alert(err)
        console.log(productDetails)
        dispatch({type:CREATE_PRODUCT, msg:"Sorry try again"}) 
    });
}
export const vendorlogin = (loginDetails) => async (dispatch) => {
        await axios.post(RETAILER_BASE_URL+'/vendor/authenticate',loginDetails).then(
        (res)=>{
            sessionStorage.setItem("token",res.data['jwt'])
            dispatch({ type: VENDOR_LOGIN_USER,login_status:{success:true,errorMsg:'',data:res.data},userInfo:loginDetails})
        }
    ).catch((res)=>{
            console.log(loginDetails,res)
            alert("invalid ")
        dispatch({type:VENDOR_LOGIN_FAILURE,login_status:{success:false,errorMsg:"Invalid Username/password"}}) 
    }); 
}
export const vendorlogout = () => (dispatch) => {
    dispatch({ type: VENDOR_LOGOUT });
}
export const vendormessageSetNull=() =>(dispatch) =>{
    dispatch({type:MESSAGE_SET_NULL})
}


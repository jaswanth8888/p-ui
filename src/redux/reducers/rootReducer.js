/* import { combineReducers } from 'redux';
import RetailerReducer from './RetailerReducer.jsx';

// combine multiple reducers into one
export default combineReducers({
    RetailerReducer
});  */
import { combineReducers } from "redux"
import VendorReducer from "./VendorReducer"
import RetailerReducer from "./RetailerReducer"

// combine multiple reducers into one
export default combineReducers({
  VendorReducer,
  RetailerReducer,
})

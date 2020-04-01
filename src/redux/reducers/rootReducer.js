import { combineReducers } from 'redux';
import VendorReducer from "./VendorReducer";
import RetailerReducer from './RetailerReducer';

// combine multiple reducers into one
export default combineReducers({
    VendorReducer,
    RetailerReducer
}); 
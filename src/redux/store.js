import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer';



let state = window.sessionStorage.reduxstate;
if (state) {
    state = JSON.parse(state);
}
let store = null;
if (state) { 
    store = createStore
    store = createStore(rootReducer, state,
        composeWithDevTools(applyMiddleware(thunk)));
}
else {
    store = createStore(rootReducer,
        composeWithDevTools(applyMiddleware(thunk)));
}

export default store
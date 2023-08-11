import {  legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import mainReducer from "../reducers/mainReducer";

const rootReducer = combineReducers({
  mainReducerState: mainReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

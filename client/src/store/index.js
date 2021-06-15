import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import AuthReducer from "./Reducers/AuthReducer";
import PostReducer from "./Reducers/PostReducer";

const middlewares = [thunkMiddleware];

const rootReducer = combineReducers({ AuthReducer, PostReducer });

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;

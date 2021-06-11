import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import AuthReducer from "./Reducers/AuthReducer";

const middlewares = [thunkMiddleware];

const store = createStore(
  AuthReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;

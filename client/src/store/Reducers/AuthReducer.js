import { secureStorage } from "../../utils/SecureStorage";

const initialState = {
  user: secureStorage.getItem("user") || {},
  loader: false,
  token: secureStorage.getItem("token") || null
};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loader: true };

    case "CLOSE_LOADING":
      return { ...state, loader: false };

    case "SET_USER":
      secureStorage.setItem("token", action.token);
      secureStorage.setItem("user", action.user);
      return {
        ...state,
        user: action.user,
        token: action.token,
        loader: false
      };

    case "LOGOUT":
      secureStorage.removeItem("user");
      secureStorage.removeItem("token");
      return { loader: false, user: {}, token: null };

    default:
      return state;
  }
}

import { secureStorage } from "../../utils/SecureStorage";

const initialState = {
  user: secureStorage.getItem("user") || {},
  loader: false,
  token: secureStorage.getItem("token") || null,
  updateState: false
};

let savePostArray, updatedUser;

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loader: true };

    case "CLOSE_LOADING":
      return { ...state, loader: false };

    case "TOGGLE_STATE":
      return { ...state, updateState: !state.updateState };

    case "PUSH_TO_SAVE":
      savePostArray = state.user.savedPosts;
      savePostArray.push(action.postID);

      updatedUser = {
        ...state.user,
        savedPosts: savePostArray
      };

      secureStorage.removeItem("user");
      secureStorage.setItem("user", updatedUser);
      return { ...state, user: updatedUser };

    case "PULL_TO_SAVE":
      savePostArray = state.user.savedPosts;
      savePostArray = savePostArray.filter(
        (postId) => postId !== action.postID
      );

      updatedUser = {
        ...state.user,
        savedPosts: savePostArray
      };
      secureStorage.removeItem("user");
      secureStorage.setItem("user", updatedUser);
      return { ...state, user: updatedUser };

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

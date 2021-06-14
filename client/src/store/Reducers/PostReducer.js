import { secureStorage } from "../../utils/SecureStorage";

const initialState = {
  user: secureStorage.getItem("user") || {},
  loader: false,
  posts: secureStorage.getItem("posts") || [],
  comments: secureStorage.getItem("comments") || [],
  token: secureStorage.getItem("token") || null,
  testPost: null,
  publishPost: null,
  isPreviewClick: false
};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_LOADER":
      const isLoading = state.loader;
      return { ...state, loader: !isLoading };

    case "SET_USER":
      secureStorage.setItem("token", action.token);
      secureStorage.setItem("user", action.user);
      return {
        ...state,
        user: action.user,
        token: action.token,
        loader: false
      };

    case "SET_POSTS":
      secureStorage.setItem("posts", action.posts);
      return { ...state, posts: action.posts };

    case "SET_TEST_POST":
      return { ...state, testPost: action.testPost, isPreviewClick: true };

    case "SET_PUBLISH_POST":
      let temp = state.posts;
      temp.push(action.post);
      return {
        ...state,
        posts: temp,
        publishPost: action.post,
        isPreviewClick: true
      };

    case "SET_PREVIEW":
      return { ...state, isPreviewClick: action.isPreviewClick };

    case "SET_COMMETS":
      secureStorage.setItem("comments", action.comments);
      return { ...state, comments: action.comments };

    case "LOGOUT":
      secureStorage.removeItem("user");
      secureStorage.removeItem("token");
      return { ...state, user: {}, token: null };

    default:
      return state;
  }
}

import { secureStorage } from "../../utils/SecureStorage";

const initialState = {
  loader: false,
  posts: [],
  comments: [],
  draftPost: secureStorage.getItem("draftPost") || null,
  isPreviewClick: secureStorage.getItem("isPreviewClick") || false,
  isSomeActionPerform: false
};

export default function PostReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loader: true };

    case "CLOSE_LOADING":
      return { ...state, loader: false };

    case "TOGGLE_IS_SOME_ACTION_PERFOME":
      return { ...state, isSomeActionPerform: !state.isSomeActionPerform };

    case "SET_POSTS":
      return { ...state, posts: action.posts };

    case "SET_DRAFT_POST":
      secureStorage.setItem("draftPost", action.draftPost);
      secureStorage.setItem("isPreviewClick", true);
      return { ...state, draftPost: action.draftPost, isPreviewClick: true };

    case "SET_PUBLISH_POST":
      let temp = state.posts;
      temp.push(action.post);
      return {
        ...state,
        posts: temp,
        publishPost: action.post,
        isPreviewClick: false
      };

    case "SET_PREVIEW":
      return { ...state, isPreviewClick: action.isPreviewClick };

    case "REMOVE_DRAFT_POST":
      secureStorage.removeItem("draftPost");
      secureStorage.removeItem("isPreviewClick");
      return { ...state, draftPost: null, isPreviewClick: false };

    case "SET_COMMETS":
      secureStorage.setItem("comments", action.comments);
      return { ...state, comments: action.comments };

    default:
      return state;
  }
}

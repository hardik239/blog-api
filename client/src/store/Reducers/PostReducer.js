import { secureStorage } from "../../utils/SecureStorage";

const initialState = {
  loader: false,
  posts: [],
  comments: [],
  draftPost: secureStorage.getItem("draftPost") || null,
  isPreviewClick: secureStorage.getItem("isPreviewClick") || false
};

export default function PostReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loader: true };

    case "CLOSE_LOADING":
      return { ...state, loader: false };

    case "SET_POSTS":
      return { ...state, posts: action.posts };

    case "SET_DRAFT_POST":
      secureStorage.setItem("draftPost", action.draftPost);
      secureStorage.setItem("isPreviewClick", true);
      console.log(action);
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

    case "SET_COMMETS":
      secureStorage.setItem("comments", action.comments);
      return { ...state, comments: action.comments };

    default:
      return state;
  }
}

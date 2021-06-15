import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

export const FetchPosts = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/post/fetch-all",
        config
      );

      if (res.status === 200) {
        dispatch({
          type: "SET_POSTS",
          posts: res.data.posts
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

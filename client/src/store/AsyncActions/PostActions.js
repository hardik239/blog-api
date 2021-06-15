import axios from "axios";
import swal from "sweetalert";
import { secureStorage } from "../../utils/SecureStorage";

const token = secureStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
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

export const DeletePost = (id, history) => {
  return async (dispatch) => {
    swal({
      title: "Are you sure?",
      text: "You Want To Delete This Post",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(async (willDelete) => {
      if (willDelete) {
        console.log("okk");
        try {
          const res = await axios.post(
            "http://localhost:5000/post/delete-post",
            { id: id },
            config
          );

          if (res.status === 200) {
            swal("Post Deleted Successfully.", { icon: "success" });
          }
          history.push("/");
          dispatch({ type: "TOGGLE_IS_SOME_ACTION_PERFOME" });
        } catch (error) {
          swal({
            title: "!! Warnign !!",
            text: error.message,
            icon: "info"
          });
        }
      }
    });
  };
};

export const SaveAndUnsavePost = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/post/action-post",
        { id: id },
        config
      );
    } catch (error) {
      swal({
        title: "!! Warnign !!",
        text: error.message,
        icon: "info"
      });
    }
  };
};

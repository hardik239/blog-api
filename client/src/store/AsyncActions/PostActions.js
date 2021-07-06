import axios from "axios";
import swal from "sweetalert";
import { secureStorage } from "../../utils/SecureStorage";
import { toast } from "react-toastify";

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
  let message = "";
  return async (dispatch) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/post/save-unsave-post",
        { id: id },
        config
      );
      if (res.data.msg === "post saved") {
        dispatch({ type: "PUSH_TO_SAVE", postID: id });
        message = "Post Saved";
      } else {
        dispatch({ type: "PULL_TO_SAVE", postID: id });
        message = "Post Removed";
      }
      toast.success(message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      dispatch({ type: "TOGGLE_IS_SOME_ACTION_PERFOME" });
    } catch (error) {
      swal({
        title: "!! Warnign !!",
        text: error.message,
        icon: "info"
      });
    }
  };
};

export const FetchComment = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/post/fetch-comment",
        { id: id },
        config
      );
      console.log(res);
    } catch (error) {
      swal({
        title: "!! Warnign !!",
        text: error.message,
        icon: "info"
      });
    }
  };
};

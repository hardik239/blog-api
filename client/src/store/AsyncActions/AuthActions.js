import axios from "axios";
import swal from "sweetalert";
// import {
// 	SET_LOADER,
// 	CLOSE_LOADER,
// 	SET_TOKEN,
// 	REGISTER_ERRORS,
// 	LOGIN_ERRORS,
// } from '../types/UserTypes';

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

// export const postRegister = (Userdata) => {
//   return async (dispatch) => {
//     dispatch({ type: "TOGGLE_LOADER" });

//     try {
//       const { data } = await axios.post(
//         "http://localhost:5000/user/register",
//         Userdata,
//         config
//       );
//       dispatch({ type: "TOGGLE_LOADER" });
//       console.log(data);

//       // dispatch({ type: SET_TOKEN, payload: data.token });
//     } catch (error) {
//       dispatch({ type: "TOGGLE_LOADER" });
//       // dispatch({
//       // 	type: REGISTER_ERRORS,
//       // 	payload: error.response.data.errors,
//       // });
//       console.log(error);
//     }
//   };
// };

export const postLogin = (UserData, history, submitProps) => {
  return async (dispatch) => {
    dispatch({ type: "TOGGLE_LOADER" });

    try {
      const res = await axios.post(
        "http://localhost:5000/user/login",
        UserData,
        config
      );

      if (res.status === 200) {
        swal({
          title: "!! Welcome !!",
          text: "Login Successfull",
          icon: "success"
        });
        dispatch({
          type: "SET_USER",
          user: res.data.user,
          token: res.data.token
        });
        submitProps.setSubmitting(false);
        submitProps.resetForm();
        history.push("/my-posts");
      }
    } catch (error) {
      dispatch({ type: "TOGGLE_LOADER" });
      if (error.message === "Request failed with status code 401") {
        swal({
          title: "!! Oppss !!",
          text: "Invalid Credintials",
          icon: "info"
        });
      } else {
        swal({
          title: "!! Oppss !!",
          text: "Something Went Wrong...Login Again",
          icon: "info"
        });
      }
    }
  };
};

export const isAuthenticate = (token) => {
  return async (dispatch) => {
    if (token) {
      try {
        const res = await axios.post(
          "http://localhost:5000/user/authenticated",
          token,
          config
        );

        if (res.status === 200) {
          dispatch({
            type: "SET_USER",
            user: res.data.user,
            token
          });
          console.log("200");
        } else if (res.status === 401) {
          dispatch({ type: "REMOVE_TOKEN" });
          console.log("401");
        }
      } catch (error) {
        dispatch({ type: "REMOVE_TOKEN" });
        console.log(error);
      }
    }
  };
};

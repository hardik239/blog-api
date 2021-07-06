import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import swal from "sweetalert";

const MyProfile = () => {
  const { username, email } = useSelector((state) => state.AuthReducer.user);
  const dispatch = useDispatch();

  const history = useHistory();

  const logout = () => {
    swal({
      title: "Are you sure?",
      text: "You Want To Logout From Ultimate Blog!!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        swal("Logout Successfully.", { icon: "success" });
        dispatch({ type: "LOGOUT" });
        history.push("/");
      }
    });
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="row p-2 pt-5">
        <div className="col-12 bg-dark p-4 shadow col-md-6 mx-auto">
          <div className="row p-2 pb-0" style={{ border: "1px solid orange" }}>
            <h4 className="text-center text-white fs-3 fw-bold text-main">
              My Profile
            </h4>
          </div>
          <div className="row py-3 text-white">
            <div className="col-3 col-md-6 text-main fw-bold">Name</div>
            <div className="col-1">:</div>
            <div className="col-8 col-md-5">{username}</div>
          </div>
          <div className="row py-2 text-white">
            <div className="col-3 col-md-6 text-main fw-bold">Email</div>
            <div className="col-1">:</div>
            <div className="col-8 col-md-5">{email}</div>
          </div>
          <hr style={{ border: "1px solid white" }} />
          <div className="div text-center mb-3">
            <Link to="/my-posts" className="btn w-50 btn-outline-warning">
              My Post
            </Link>
          </div>
          <div className="div text-center mb-3">
            <Link to="/saved-post" className="btn w-50 btn-outline-warning">
              Saved
            </Link>
          </div>
          <div className="div text-center">
            <button className="btn w-50 btn-outline-warning" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

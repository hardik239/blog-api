import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isAuthenticate } from "../store/AsyncActions/AuthActions";

const Navbar = () => {
  const { username } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const logout = () => {
    console.log("log");
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {}, [username]);
  return (
    <div className="mb-4">
      <nav className="navbar fixed-top bg-dark navbar-expand-lg navbar-dark p-md-3">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Ultimate <span style={{ color: "orange" }}>Blog</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="mx-auto"></div>
            <ul className="navbar-nav text-center">
              <li className="nav-item">
                <Link className="nav-link text-white me-md-4" to="/">
                  Home
                </Link>
              </li>
              {username ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-white me-md-4"
                      to="/single-post">
                      Articles
                    </Link>
                  </li>
                  <li className="nav-item">
                    <span
                      className="nav-link logout text-white me-md-4"
                      onClick={logout}>
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-white me-md-4" to="/sign-in">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white me-md-4" to="/sign-up">
                      Register
                    </Link>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Link className="nav-link text-white" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

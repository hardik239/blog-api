import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...props }) => {
  // const isAuthenticated = props.location.state?.isClick ? true : false
  const isPreviewClick = useSelector((state) => state.isPreviewClick);
  return (
    <Route
      render={(props) =>
        isPreviewClick ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;

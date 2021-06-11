import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...props }) => {
  // const isAuthenticated = props.location.state?.isClick ? true : false
  const { username } = useSelector((state) => (state.user ? state.user : null));
  return (
    <Route
      render={(props) =>
        username ? (
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

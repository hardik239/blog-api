import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const IsAuthenticated = ({ component: Component, ...rest }) => {
  const { username } = useSelector((state) => state.user);

  // const isAuthenticate =  ? true : false;

  return (
    <Route
      render={(props) =>
        username ? (
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default IsAuthenticated;

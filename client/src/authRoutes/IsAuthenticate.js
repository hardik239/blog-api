import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { Context } from "../Context/context";

const IsAuthenticated = ({ component: Component, ...props }) => {
  const [state, _] = useContext(Context);
  const isAuthenticated = state?.user?.username ? true : false;

  return (
    <Route
      {...props}
      render={(props) =>
        !isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        )
      }
    />
  );
};

export default IsAuthenticated;

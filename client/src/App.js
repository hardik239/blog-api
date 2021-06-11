import { Route, Switch, useLocation } from "react-router-dom";

import React, { useEffect } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import { useSelector, useDispatch } from "react-redux";
import { isAuthenticate } from "./store/AsyncActions/AuthActions";

function App() {
  const location = useLocation();

  // const { token } = useSelector((state) => state.token);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(isAuthenticate(token));
  // }, [token]);

  return (
    <>
      <Navbar />
      <Switch location={location} key={location.pathname}>
        <Route path="/single-post" component={SinglePost} />
        <Route path="/sign-in" component={Login} />
        <Route path="/sign-up" component={Register} />
        <Route path="/contact" component={Contact} />
        <Route path="/" component={Home} />
      </Switch>
    </>
  );
}

export default App;

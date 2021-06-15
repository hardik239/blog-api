import { Route, Switch, useLocation } from "react-router-dom";

import React, { useEffect } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import CreatePost from "./pages/CreatePost";
import SavePost from "./pages/SavePost";

import ProtectedRoute from "./authRoutes/ProtectedRoute";
import PrivateRoute from "./authRoutes/PrivateRoute";
import IsAuthenticated from "./authRoutes/IsAuthenticate";
import PageNotFound from "./pages/PageNotFound";
import Preview from "./pages/Preview";

import axios from "axios";
import { useDispatch } from "react-redux";
import { FetchPosts } from "./store/AsyncActions/PostActions";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchPosts());
  }, []);

  return (
    <>
      <Navbar />
      <Switch location={location} key={location.pathname}>
        <Route exact path="/" component={Home} />
        {/* <ProtectedRoute path="/single-post" component={SinglePost} /> */}
        <Route path="/single-post/:id" component={SinglePost} />
        <ProtectedRoute path="/my-profile" component={MyProfile} />
        <ProtectedRoute path="/create-post" component={CreatePost} />
        <ProtectedRoute path="/saved-post" component={SavePost} />
        <IsAuthenticated path="/sign-in" component={Login} />
        <IsAuthenticated path="/sign-up" component={Register} />
        <Route path="/contact" component={Contact} />
        <PrivateRoute path="/preview" component={Preview} />
        <Route path="/*" component={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;

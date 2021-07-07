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

import { useDispatch, useSelector } from "react-redux";
import { FetchPosts } from "./store/AsyncActions/PostActions";
import MyPosts from "./pages/MyPosts";
import EditPost from "./pages/EditPost";
import FilterPost from "./pages/FilterPost";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isSomeActionPerform } = useSelector((state) => state.PostReducer);
  const { updateState } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    dispatch(FetchPosts());
  }, [isSomeActionPerform, updateState]);

  return (
    <>
      <Navbar />
      <Switch location={location} key={location.pathname}>
        <Route exact path="/" component={Home} />
        <Route path="/single-post" component={SinglePost} />
        <ProtectedRoute path="/filter-post" component={FilterPost} />
        <ProtectedRoute path="/my-profile" component={MyProfile} />
        <ProtectedRoute path="/my-posts" component={MyPosts} />
        <ProtectedRoute path="/edit-post" component={EditPost} />
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

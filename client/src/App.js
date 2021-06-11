import { Route, Switch, useLocation } from "react-router-dom";

import React from "react";

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
import IsAuthenticated from "./authRoutes/IsAuthenticate";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Switch location={location} key={location.pathname}>
        <Route exact path="/" component={Home} />
        <ProtectedRoute path="/single-post" component={SinglePost} />
        <ProtectedRoute path="/my-profile" component={MyProfile} />
        <ProtectedRoute path="/create-post" component={CreatePost} />
        <ProtectedRoute path="/saved-post" component={SavePost} />
        <IsAuthenticated path="/sign-in" component={Login} />
        <IsAuthenticated path="/sign-up" component={Register} />
        <Route path="/contact" component={Contact} />
        <Route path="/*" component={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;

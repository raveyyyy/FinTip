import React, { useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Platforms from "./pages/platforms";
import Home from "./pages/home";
import { useDispatch, useSelector } from "react-redux";
import { VALIDATEREFRESH } from "./services/redux/slices/auth";
import ForgotPassword from "./pages/home/reset";
import ResetPassword from "./pages/home/reset/resetPassword";
import Verification from "./pages/home/verification";

export default function App() {
  const { auth, token } = useSelector(({ auth }) => auth),
    dispatch = useDispatch();

  useEffect(() => {
    if (!auth._id && token) {
      dispatch(VALIDATEREFRESH(token));
    }
  }, [auth, token, dispatch]);

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/forgot-password" exact component={ForgotPassword} />
      <Route path="/verify/:token" exact component={Verification} />
      <Route
        path="/reset-password/:id/:token"
        exact
        component={ResetPassword}
      />
      <Platforms />
    </Switch>
  );
}

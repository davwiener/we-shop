import React from "react";
import { Redirect, Route } from "react-router";
import { isLoggedIn } from "../../util/auth";

const AuthRequiredRoute = ({ path, component }: any) => {
  const Component = component;
  const loggedIn = isLoggedIn();
  return loggedIn ? <Component /> : <Redirect to="/login"></Redirect>;
};

export default AuthRequiredRoute;

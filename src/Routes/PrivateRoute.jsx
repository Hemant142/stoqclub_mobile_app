import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

export default function PrivateRoute({ children }) {
  const token = Cookies.get("login_token_client");
  const location = useLocation();
  return !token ? (
    <Navigate to="/" state={location.pathname} replace={true} />
  ) : (
    children
  );
}

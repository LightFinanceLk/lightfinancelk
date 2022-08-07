import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  if (storedUserData && storedUserData.token) {
    dispatch(authActions.login(storedUserData));
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;

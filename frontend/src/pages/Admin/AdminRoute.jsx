import React from "react";

import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const AdminRoute = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default AdminRoute;

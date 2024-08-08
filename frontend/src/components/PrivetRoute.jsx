import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PrivetRoute = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  return userInfo ? <Outlet /> : <Navigate to="/login" replace={true} />;
};

export default PrivetRoute;

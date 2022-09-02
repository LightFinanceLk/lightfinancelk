import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import { message } from "antd";
import { useDispatch } from "react-redux";
import authApi from "../../api/authApi";
import { authActions } from "../../store/auth";
import jwt from "jwt-decode";

const RequireAuth = ({ allowedRoles }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const now = Date.now();
  const localData = JSON.parse(localStorage.getItem("user"));
  let user = {};

  if (localData) {
    user = jwt(localData.token);
  }

  const logout = () => {
    localStorage.removeItem("user");
    message.warning({
      content: "Sorry... Session Expired, Please log in again.",
      duration: 6,
    });
    dispatch(authActions.logout());
    navigate("/login");
  };

  if (Object.keys(user).length > 0) {
    const persistData = {
      token: localData.token,
      userId: user.userId,
      id: user.id,
      role: user.role,
      expiry: localData.expiry,
      initPassword: user.initPassword,
    };
    if (persistData.initPassword) {
      navigate("/reset-password");
    }
    dispatch(authActions.login(persistData));
  }

  if (localData && localData.expiry < now) {
    logout();
  } else {
    const isUserRole = user
      ? user.role
        ? allowedRoles.includes(user.role)
        : false
      : false;
    return isUserRole ? (
      <Outlet />
    ) : Object.keys(user).length > 0 ? (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }
};

export default RequireAuth;

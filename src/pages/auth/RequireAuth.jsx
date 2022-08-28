import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import { message } from "antd";
import { useDispatch } from "react-redux";
import authApi from "../../api/authApi";
import { authActions } from "../../store/auth";

const RequireAuth = ({ allowedRoles }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const now = Date.now();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    message.warning({
      content: "Sorry... Session Expired, Please log in again.",
      duration: 6,
    });
    dispatch(authActions.logout());
    navigate("/login");
  };

  if (user) {
    const persistData = {
      token: user.token,
      userId: user.userId,
      initPassword: user.initPassword,
      role: user.role,
      expiry: user.expiry,
    };
    if (persistData.initPassword) {
      navigate("/reset-password");
    }
    dispatch(authActions.login(persistData));
  }
  if (user && user.expiry < now) {
    logout();
  } else {
    const isUserRole = user
      ? user.role
        ? allowedRoles.includes(user.role)
        : false
      : false;
    return isUserRole ? (
      <Outlet />
    ) : user ? (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }
};

export default RequireAuth;

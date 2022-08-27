import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import { message } from "antd";

const RequireAuth = ({ allowedRoles }) => {
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
    navigate("/login");
  };

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

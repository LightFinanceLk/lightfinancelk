import { useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import LoginForm from "../../components/form/forms/LoginForm";
import { useEffect, useState } from "react";
import jwt from "jwt-decode";

let logoutTimer;

const LoginPage = () => {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData && storedUserData.token) {
      dispatch(authActions.login(storedUserData));
      if (storedUserData.initPassword) {
        navigate("/reset-password");
      } else {
        navigate("/");
      }
    }
    if (userData) {
      const user = jwt(userData.token);
      const remainingTime =
        (user.exp - new Date(new Date()).getTime() / 1000) * 1000;
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => {
        dispatch(authActions.logout());
        navigate("/login");
        clearTimeout(logoutTimer);
      }, remainingTime);
      const persistData = {
        token: userData.token,
        uId: user.userId,
        initPassword: user.initPassword,
        role: user.role,
      };
      localStorage.setItem("userData", JSON.stringify(persistData));
      dispatch(authActions.login(persistData));
      if (persistData.initPassword) {
        navigate("/reset-password");
      } else {
        navigate("/");
      }
    }
  }, [dispatch, navigate, userData]);

  const loginHandler = async (formData) => {
    try {
      const res = await authApi.login(JSON.stringify(formData));
      if (res.data) {
        setUserData(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <LoginForm submitHandler={loginHandler}></LoginForm>;
};

export default LoginPage;

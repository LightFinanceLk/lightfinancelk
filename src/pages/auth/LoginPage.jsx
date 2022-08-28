import { Link, useNavigate, useLocation } from "react-router-dom";
import authApi from "../../api/authApi";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import LoginForm from "../../components/form/forms/LoginForm";
import { useEffect, useState } from "react";
import jwt from "jwt-decode";
import { message } from "antd";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.initPassword) {
      if (storedUser.initPassword) {
        navigate("/reset-password");
      }
    }
  }, []);

  const loginHandler = async (formData) => {
    try {
      const res = await authApi.login(JSON.stringify(formData));
      if (res.data) {
        const user = jwt(res.data.token);
        const persistData = {
          token: res.data.token,
          uId: user.userId,
          initPassword: user.initPassword,
          role: user.role,
          expiry: Date.now() + 3600000,
        };
        localStorage.setItem("user", JSON.stringify(persistData));
        dispatch(authActions.login(persistData));
        if (persistData.initPassword) {
          navigate("/reset-password");
        } else {
          navigate(from, { replace: true });
        }
      }
    } catch (e) {
      // console.log(e);
      message.error({
        content: "Login failed, Please try again later.",
        duration: 6,
      });
    }
  };

  return <LoginForm submitHandler={loginHandler}></LoginForm>;
};

export default LoginPage;

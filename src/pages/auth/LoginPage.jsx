import { Link, useNavigate, useLocation } from "react-router-dom";
import authApi from "../../api/authApi";
import userApi from "../../api/userApi";
import accountApi from "../../api/accountApi";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { userActions } from "../../store/user";
import { accountActions } from "../../store/account";
import LoginForm from "../../components/form/forms/auth/LoginForm";
import { useEffect, useState } from "react";
import jwt from "jwt-decode";
import { message } from "antd";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("lf-user"));
    if (storedUser && storedUser.initPassword) {
      if (storedUser.initPassword) {
        navigate("/reset-password");
      }
    }
  }, []);

  const setProfileData = async (id) => {
    try {
      const res = await userApi.getDataByUserId(id);
      if (res.data && res.data.user) {
        console.log(res.data.user, "data");
        dispatch(userActions.getUser(res.data.user));
      }
    } catch (error) {}
  };

  const setAccountData = async (id) => {
    try {
      const res = await userApi.getAccountsByUserId(id);
      if (res.data) {
        dispatch(accountActions.getAccounts(res.data.userAccount));
      }
    } catch (error) {}
  };

  const loginHandler = async (formData) => {
    try {
      const res = await authApi.login(JSON.stringify(formData));
      if (res.data) {
        const user = jwt(res.data.token);
        console.log(user);
        const persistData = {
          token: res.data.token,
          id: user.id,
          userId: user.userId,
          initPassword: user.initPassword,
          role: user.role,
          expiry: Date.now() + 3600000,
        };
        localStorage.setItem(
          "lf-user",
          JSON.stringify({
            token: res.data.token,
            expiry: Date.now() + 3600000,
          })
        );
        dispatch(authActions.login(persistData));
        try {
          setProfileData(user.userId);
        } catch (error) {
          // console.log(error);
        }
        try {
          setAccountData(user.userId);
        } catch (error) {
          // console.log(error);
        }
        if (user.initPassword) {
          navigate("/reset-password");
        } else {
          navigate(from, { replace: true });
        }
      }
    } catch (e) {
      let errorMsg = e.response.data.match(/(?<=Error).*?(?=<br>)/);
      message.error({
        content: errorMsg[0].replace(": ", ""),
        duration: 6,
      });
    }
  };

  return <LoginForm submitHandler={loginHandler}></LoginForm>;
};

export default LoginPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import LoginForm from "../../components/form/forms/LoginForm";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [formData, setFormData] = useState({});

  const loginHandler = (formData) => {
    console.log(formData);
    const login = async (formData) => {
      try {
        console.log("data", formData);
        const res = await authApi.login(JSON.stringify(formData));
        if (res) {
          console.log(res);
          navigate("/dashboard");
          dispatch(authActions.login(res.data.token));
        }
      } catch (e) {
        console.log(e);
      }
    };
    login(formData);
  };

  // useEffect(() => {
  //   if (!(formData && Object.keys(formData).length === 0)) {
  //     // console.log("formData", formData);
  //   }
  // }, [formData]);

  return <LoginForm submitHandler={loginHandler}></LoginForm>;
};

export default LoginPage;

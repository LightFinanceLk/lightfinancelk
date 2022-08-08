import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import authApi from "../../api/authApi";
import SignUpForm from "../../components/form/forms/SignUpForm";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData && storedUserData.token) {
      dispatch(authActions.login(storedUserData));
      navigate("/");
    }
  }, [dispatch, navigate]);

  const signUpHandler = (formData) => {
    const login = async (formData) => {
      try {
        const res = await authApi.signUp(JSON.stringify(formData));
        if (res) {
          navigate("/dashboard");
          dispatch(authActions.login(res.data.token));
        }
      } catch (e) {
        console.log(e);
      }
    };
    login(formData);
  };

  return (
    <div>
      <SignUpForm submitHandler={signUpHandler} />
    </div>
  );
};

export default SignUpPage;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import authApi from "../../api/authApi";
import SignUpForm from "../../components/form/forms/SignUpForm";
import { message } from "antd";

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

  const signUpHandler = async (formData) => {
    let data = { ...formData, initPassword: true, role: "USER" };
    try {
      const res = await authApi.signUp(JSON.stringify(data));
      if (res) {
        navigate("/login");
        message.success({
          content:
            "Your account is created successfully, Please log in to your account. The password is emailed.",
          duration: 6,
        });
      }
    } catch (e) {
      let errorMsg = e.response.data.match(/(?<=Error).*?(?=<br>)/);
      message.error({
        content: errorMsg[0].replace(": ", ""),
        duration: 6,
      });
    }
  };

  return (
    <div>
      <SignUpForm submitHandler={signUpHandler} />
    </div>
  );
};

export default SignUpPage;

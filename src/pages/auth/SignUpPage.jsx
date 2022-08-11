import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import authApi from "../../api/authApi";
import SignUpForm from "../../components/form/forms/SignUpForm";
import { notification } from "antd";

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
    let data = { ...formData, initPassword: true };
    try {
      const res = await authApi.signUp(JSON.stringify(data));
      if (res) {
        navigate("/login");
        notification.success({
          message: "Successful",
          description:
            "Your account is created successfully, Please log in to your account. The password is emailed.",
          duration: 20,
        });
      }
    } catch (e) {
      let errorMsg = e.response.data.match(/(?<=Error).*?(?=<br>)/);
      notification.error({
        message: "Error",
        description: errorMsg[0].replace(": ", ""),
        duration: 20,
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

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import authApi from "../../api/authApi";
import SignUpForm from "../../components/form/forms/auth/SignUpForm";

const SignUpPage = () => {
  const navigate = useNavigate();

  const signUpHandler = async (formData) => {
    let data = { ...formData, initPassword: true, role: "2022" };
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

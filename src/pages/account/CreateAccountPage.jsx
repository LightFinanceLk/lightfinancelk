import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import accountApi from "../../api/accountApi";
import { notification } from "antd";
import CreateAccountForm from "../../components/form/forms/account/CreateAccountForm";

const CreateAccountPage = () => {
  const navigate = useNavigate();
  const uId = useSelector((state) => state.auth.uId);
  const submitHandler = async (data) => {
    console.log(data);
    try {
      const res = await accountApi.createAccount(uId, JSON.stringify(data));
      if (res) {
        navigate("/");
        notification.success({
          message: "Successful",
          description: "Your account is created successfully.",
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
  return <CreateAccountForm submitHandler={submitHandler}></CreateAccountForm>;
};

export default CreateAccountPage;

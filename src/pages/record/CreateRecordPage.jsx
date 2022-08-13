import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import accountApi from "../../api/accountApi";
import { accountActions } from "../../store/account";
import userApi from "../../api/userApi";
import { notification } from "antd";
import CreateRecordForm from "../../components/form/forms/record/CreateRecordForm";

const CreateRecordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uId = useSelector((state) => state.auth.uId);
  const [userAccounts, setUserAccounts] = useState([]);

  const getUserAccounts = async () => {
    try {
      const res = await userApi.getAccountsByUserId(uId);
      if (res.data && res.data.userAccount) {
        const resUserAccounts = res.data.userAccount;
        dispatch(accountActions.setAccounts(resUserAccounts));
        let userAccounts = [];
        resUserAccounts.map((account) => {
          userAccounts.push({ key: account.accountName, value: account._id });
        });
        setUserAccounts(userAccounts);
      }
    } catch (e) {
      console.log(e);
      let errorMsg = e.response.data.match(/(?<=Error).*?(?=<br>)/);
      notification.error({
        message: "Error",
        description: errorMsg[0].replace(": ", ""),
        duration: 20,
      });
    }
  };

  useEffect(() => {
    getUserAccounts();
  }, []);

  const submitHandler = async (data) => {
    console.log(data);
    // try {
    //   const res = await accountApi.createAccount(uId, JSON.stringify(data));
    //   if (res) {
    //     navigate("/");
    //     notification.success({
    //       message: "Successful",
    //       description: "Your account is created successfully.",
    //       duration: 20,
    //     });
    //   }
    // } catch (e) {
    //   let errorMsg = e.response.data.match(/(?<=Error).*?(?=<br>)/);
    //   notification.error({
    //     message: "Error",
    //     description: errorMsg[0].replace(": ", ""),
    //     duration: 20,
    //   });
    // }
  };
  return (
    <CreateRecordForm
      submitHandler={submitHandler}
      userAccounts={userAccounts}
    ></CreateRecordForm>
  );
};

export default CreateRecordPage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import accountApi from "../../api/accountApi";
// import { accountActions } from "../../store/account";
import recordApi from "../../api/recordApi";
import { notification } from "antd";
import CreateRecordForm from "../../components/form/forms/record/CreateRecordForm";

const CreateRecordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uId = useSelector((state) => state.auth.uId);
  const uAccounts = useSelector((state) => state.account.accounts);

  const [userAccounts, setUserAccounts] = useState([]);

  useEffect(() => {
    console.log(uAccounts);
    setUserAccounts(uAccounts);
  }, [uAccounts]);

  const submitHandler = async (data) => {
    console.log(data);
    try {
      const res = await recordApi.createRecord(JSON.stringify(data));
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
  return (
    <>
      {userAccounts !== [] && (
        <CreateRecordForm
          submitHandler={submitHandler}
          userAccounts={userAccounts}
        ></CreateRecordForm>
      )}
    </>
  );
};

export default CreateRecordPage;

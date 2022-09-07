import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userApi from "../../api/userApi";
import AccountAnalysis from "./AccountAnalysis";

const AnalysisPage = () => {
  const userId = useSelector((state) => state.auth.userId);

  const [accounts, setAccounts] = useState([]);

  const getAccounts = async (uId) => {
    try {
      const res = await userApi.getAccountsByUserId(uId);
      if (res.data) {
        setAccounts(res.data.userAccount);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getAccounts(userId);
  }, [userId]);

  return (
    <>
      {accounts.length && (
        <>
          {accounts.map((account) => {
            return (
              <AccountAnalysis aid={account._id} aName={account.accountName} />
            );
          })}
        </>
      )}
    </>
  );
};

export default AnalysisPage;

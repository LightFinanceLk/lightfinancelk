import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import accountApi from "../../api/accountApi";
import { accountActions } from "../../store/account";
import userApi from "../../api/userApi";
import { message } from "antd";
import "./Dashboard.scss";
import AccountsCard from "./AccountsCard";
import SummaryCard from "./SummaryCard";
import SpendingByCategoryCard from "./SpendingByCategoryCard";
import ExpenseStructureCard from "./ExpenseStructureCard";
import AdvisorCard from "./AdvisorCard";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const uId = useSelector((state) => state.auth.uId);

  // const getUserAccounts = async () => {
  //   try {
  //     const res = await userApi.getAccountsByUserId(uId);
  //     if (res.data && res.data.userAccount) {
  //       const resUserAccounts = res.data.userAccount;
  //       dispatch(accountActions.getAccounts(resUserAccounts));
  //     }
  //   } catch (e) {
  //     let errorMsg = e.response.data.match(/(?<=Error).*?(?=<br>)/);
  //     message.error({
  //       content: errorMsg[0].replace(": ", ""),
  //       duration: 6,
  //     });
  //   }
  // };

  // useEffect(() => {
  //   getUserAccounts();
  // }, [uId]);

  return (
    <>
      <div className="lf-dashboard">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-4">
              <div className="lf-dashboard__card">
                <div className="lf-dashboard__card-title">Summary</div>
                <div className="lf-dashboard__card-content">
                  <SummaryCard></SummaryCard>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="lf-dashboard__card">
                <div className="lf-dashboard__card-title">Accounts</div>
                <div className="lf-dashboard__card-content">
                  <AccountsCard></AccountsCard>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="lf-dashboard__card">
                <div className="lf-dashboard__card-title">Advisor</div>
                <div className="lf-dashboard__card-content">
                  <AdvisorCard></AdvisorCard>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="lf-dashboard__card">
                <div className="lf-dashboard__card-title">
                  Spending By Categories
                </div>
                <div className="lf-dashboard__card-content">
                  <SpendingByCategoryCard></SpendingByCategoryCard>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="lf-dashboard__card">
                <div className="lf-dashboard__card-title">
                  Expense Structure
                </div>
                <div className="lf-dashboard__card-content">
                  <ExpenseStructureCard></ExpenseStructureCard>
                </div>
              </div>
            </div>
            {/* <div className="col-sm-4">
              <div className="lf-dashboard__card">
                <div className="lf-dashboard__card-title">Last Records</div>
                <div className="lf-dashboard__card-content">Content</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

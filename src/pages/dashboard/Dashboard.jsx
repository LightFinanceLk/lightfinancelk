import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import accountApi from "../../api/accountApi";
import { accountActions } from "../../store/account";
import userApi from "../../api/userApi";
import { notification } from "antd";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uId = useSelector((state) => state.auth.uId);

  const getUserAccounts = async () => {
    try {
      const res = await userApi.getAccountsByUserId(uId);
      if (res.data && res.data.userAccount) {
        const resUserAccounts = res.data.userAccount;
        dispatch(accountActions.getAccounts(resUserAccounts));
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

  useEffect(() => {
    getUserAccounts();
  }, [uId]);

  return (
    <>
      <div>
        <NavLink to="/account/create">
          <span className="nav-link px-2 link-secondary">Accounts</span>
        </NavLink>
      </div>
      <div>
        <NavLink to="/record/create">
          <span className="nav-link px-2 link-secondary">Records</span>
        </NavLink>
      </div>
    </>
  );
};

export default Dashboard;

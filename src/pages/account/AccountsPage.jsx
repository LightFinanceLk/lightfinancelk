import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Account from "../../components/account/Account";
import userApi from "../../api/userApi";
import "./AccountsPage.scss";

const AccountsPage = () => {
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
      {accounts && (
        <div className="lf-accounts">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-3">
                <div className="lf-accounts__left">
                  <h3>Accounts</h3>
                  <NavLink to="/account/create">
                    <span className="btn btn-outline-secondary">
                      <FontAwesomeIcon icon={faPlus} /> Add Account
                    </span>
                  </NavLink>
                </div>
              </div>
              <div className="col-sm-9">
                <div className="lf-accounts__right">
                  {accounts.map((account) => {
                    return <Account account={account} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountsPage;

import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import accountsApi from "../../api/accountApi";

const Account = (props) => {
  const getAccount = async () => {
    try {
      const results = await accountsApi.requestAccounts();
      console.log(results);
    } catch (error) {}
  };

  useEffect(() => {
    console.log("dd");
    getAccount();
  }, []);

  return (
    <ul className="account-list">
      <li className="account-list__item">
        <NavLink to="/advisor/create">
          <div className="account-list__item-icon">Cash</div>
          <div className="account-list__item-name">Silva</div>
          <div className="account-list__item-amount">LKR 100,000.00</div>
        </NavLink>
      </li>
    </ul>
  );
};

export default Account;

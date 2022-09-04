import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import accountsApi from "../../api/accountApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill1Wave,
  faMoneyCheckAlt,
  faCreditCard,
  faPiggyBank,
  faCarBurst,
  faSackDollar,
  faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";
import "./Account.scss";

const Account = (props) => {
  const [account, setAccount] = useState([]);

  const accountIcons = {
    cash: faMoneyBill1Wave,
    currentAccount: faMoneyCheckAlt,
    creditCard: faCreditCard,
    savingsAccount: faPiggyBank,
    insurance: faCarBurst,
    investment: faSackDollar,
    loan: faMoneyBillTransfer,
  };

  useEffect(() => {
    const account = props.account;
    let accountType = account.accountType;
    accountType = accountType.replace(/[A-Z]/g, (letter) => ` ${letter}`);
    accountType = accountType.charAt(0).toUpperCase() + accountType.slice(1);
    account.accountTypeText = accountType;

    let accountCurrency = account.currency;
    accountCurrency = accountCurrency.toUpperCase();
    account.currency = accountCurrency;

    setAccount(account);
  }, [props]);

  return (
    <div className="account">
      <NavLink to={`/account/${account._id}`}>
        <div className="account__icon">
          <div
            className="account__icon-color"
            style={{ background: account.accountColor }}
          ></div>
          <FontAwesomeIcon icon={accountIcons[account.accountType]} />
        </div>
        <div className="account__type">
          <p> {account.accountTypeText}</p>
        </div>
        <div className="account__name">{account.accountName}</div>
        <div className="account__amount">
          {account.currency} {account.amount}
        </div>
      </NavLink>
    </div>
  );
};

export default Account;

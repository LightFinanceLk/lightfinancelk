import React, { useEffect } from "react";
import accountsApi from "../../api/accountsApi";

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
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          Accounts
          <button>Add Account</button>
        </div>
        <div className="col-md-9">
          <ul className="account-list">
            <li className="account-list__item">
              <a href="/">
                <div className="account-list__item-icon">Cash</div>
                <div className="account-list__item-name">Silva</div>
                <div className="account-list__item-amount">LKR 100,000.00</div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Account;

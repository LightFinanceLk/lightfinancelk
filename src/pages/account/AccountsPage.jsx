import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Account from "../../components/account/Account";

const AccountsPage = () => {
  return (
    <div className="lf-accounts">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3">
            <div className="lf-accounts__left">
              <h2>Accounts</h2>
              <NavLink to="/advisor/create">
                <span className="btn btn-outline-secondary">
                  <FontAwesomeIcon icon={faPlus} /> Add Account
                </span>
              </NavLink>
            </div>
          </div>
          <div className="col-sm-9">
            <div className="lf-accounts__right">
              <Account />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;

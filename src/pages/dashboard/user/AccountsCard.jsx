import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AccountsCard.scss";
import {
  faAngleDoubleRight,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const AccountsCard = () => {
  let accounts = useSelector((state) => state.account.accounts);
  accounts = accounts.slice(0, 3);
  return (
    <>
      {accounts && (
        <div className="lf-c-accounts">
          {accounts.map((account) => {
            return (
              <>
                <div
                  className="lf-c-accounts__item"
                  style={{ "border-color": account.accountColor }}
                >
                  <div className="lf-c-accounts__item-name">
                    <p>{account.accountName}</p>
                  </div>
                  <div className="lf-c-accounts__item-balance">
                    <p>
                      {account.currency.toUpperCase()} {account.amount}
                    </p>
                  </div>
                  <div className="lf-c-accounts__item-link">
                    <NavLink to={`/account/${account._id}`}>
                      <span className="nav-link lf-c-link">
                        <FontAwesomeIcon icon={faAngleRight} />
                      </span>
                    </NavLink>
                  </div>
                </div>
                <div>
                  <NavLink to="/account">
                    <span className="nav-link link-secondary lf-c-more-link">
                      Accounts
                      <FontAwesomeIcon icon={faAngleDoubleRight} />
                    </span>
                  </NavLink>
                </div>
              </>
            );
          })}
        </div>
      )}
    </>
  );
};

export default AccountsCard;

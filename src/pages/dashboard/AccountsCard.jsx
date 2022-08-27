import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AccountsCard.scss";
import {
  faAngleDoubleRight,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const AccountsCard = () => {
  return (
    <div className="lf-c-accounts">
      <div className="lf-c-accounts__item">
        <div className="lf-c-accounts__item-name">
          <p>Test</p>
          <p>Type</p>
        </div>
        <div className="lf-c-accounts__item-balance">
          <p>LKR 99,900.00</p>
        </div>
        <div className="lf-c-accounts__item-link">
          <NavLink to="/account">
            <span className="nav-link link-light lf-c-link">
              <FontAwesomeIcon icon={faAngleRight} />
            </span>
          </NavLink>
        </div>
      </div>

      <div className="lf-c-accounts__item">
        <div className="lf-c-accounts__item-name">
          <p>Test</p>
          <p>Type</p>
        </div>
        <div className="lf-c-accounts__item-balance">
          <p>LKR 99,900.00</p>
        </div>
        <div className="lf-c-accounts__item-link">
          <NavLink to="/account">
            <span className="nav-link link-light lf-c-link">
              <FontAwesomeIcon icon={faAngleRight} />
            </span>
          </NavLink>
        </div>
      </div>

      <div className="lf-c-accounts__item">
        <div className="lf-c-accounts__item-name">
          <p>Test</p>
          <p>Type</p>
        </div>
        <div className="lf-c-accounts__item-balance">
          <p>LKR 99,900.00</p>
        </div>
        <div className="lf-c-accounts__item-link">
          <NavLink to="/account">
            <span className="nav-link link-light lf-c-link">
              <FontAwesomeIcon icon={faAngleRight} />
            </span>
          </NavLink>
        </div>
      </div>

      <div className="lf-c-accounts__item">
        <div className="lf-c-accounts__item-name">
          <p>Test</p>
          <p>Type</p>
        </div>
        <div className="lf-c-accounts__item-balance">
          <p>LKR 99,900.00</p>
        </div>
        <div className="lf-c-accounts__item-link">
          <NavLink to="/account">
            <span className="nav-link link-light lf-c-link">
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
    </div>
  );
};

export default AccountsCard;

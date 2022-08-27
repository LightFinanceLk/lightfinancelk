import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SpendingByCategoryCard.scss";
import {
  faAngleDoubleRight,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const SpendingByCategoryCard = () => {
  return (
    <div className="lf-c-spendingByCat">
      <div className="lf-c-spendingByCat__total">
        <p>last 31 days</p>
        <p>LKR 99,900.00</p>
      </div>
      <div className="lf-c-spendingByCat__item">
        <div className="lf-c-spendingByCat__item-name">
          <p>Housing</p>
          <p>LKR&nbsp;2,055.00</p>
        </div>
        <div className="lf-c-spendingByCat__item-progress">
          <div style={{ width: "91.4355%" }}>
            <div
              style={{
                "background-color": "rgb(244, 67, 54)",
                width: "calc(100%)",
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="lf-c-spendingByCat__item">
        <div className="lf-c-spendingByCat__item-name">
          <p>Housing</p>
          <p>LKR&nbsp;2,055.00</p>
        </div>
        <div className="lf-c-spendingByCat__item-progress">
          <div style={{ width: "91.4355%" }}>
            <div
              style={{
                "background-color": "rgb(244, 67, 54)",
                width: "calc(100%)",
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="lf-c-spendingByCat__item">
        <div className="lf-c-spendingByCat__item-name">
          <p>Housing</p>
          <p>LKR&nbsp;2,055.00</p>
        </div>
        <div className="lf-c-spendingByCat__item-progress">
          <div style={{ width: "91.4355%" }}>
            <div
              style={{
                "background-color": "rgb(244, 67, 54)",
                width: "calc(100%)",
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="lf-c-spendingByCat__item">
        <div className="lf-c-spendingByCat__item-name">
          <p>Housing</p>
          <p>LKR&nbsp;2,055.00</p>
        </div>
        <div className="lf-c-spendingByCat__item-progress">
          <div style={{ width: "91.4355%" }}>
            <div
              style={{
                "background-color": "rgb(244, 67, 54)",
                width: "calc(100%)",
              }}
            ></div>
          </div>
        </div>
      </div>

      <div>
        <NavLink to="/account">
          <span className="nav-link link-secondary lf-c-more-link">
            More
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default SpendingByCategoryCard;

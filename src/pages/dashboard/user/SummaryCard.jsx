import React from "react";
import "./SummaryCard.scss";

const SummaryCard = () => {
  return (
    <div className="lf-c-summary">
      <div className="lf-c-summary__item">
        <div className="lf-c-summary__item-gear">
          <div></div>
        </div>
        <div className="lf-c-summary__item-content">
          <p>Balance</p>
          <p>110K</p>
        </div>
      </div>
      <div className="lf-c-summary__item">
        <div className="lf-c-summary__item-gear">
          <div></div>
        </div>
        <div className="lf-c-summary__item-content">
          <p>Cash Flow</p>
          <p>110K</p>
        </div>
      </div>
      <div className="lf-c-summary__item">
        <div className="lf-c-summary__item-gear">
          <div></div>
        </div>
        <div className="lf-c-summary__item-content">
          <p>Spending</p>
          <p>110K</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;

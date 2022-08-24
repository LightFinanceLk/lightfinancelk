import React, { useState } from "react";
import html from "./../../assets/img/html.png";
import json from "./../../assets/img/json.png";
import csv from "./../../assets/img/csv.png";
import "./BulkRecordsStepOneInstructions.scss";

const BulkRecordsStepOneInstructions = (props) => {
  return (
    <>
      <div className="bulk-record-step-1-inst">
        <img
          src={html}
          alt=""
          className={`img-fluid ${
            props.rawDataType === "html" ? "active" : ""
          }`}
          onClick={() => {
            props.setRawDataType("html");
          }}
        />
        <img
          src={json}
          alt=""
          className={`img-fluid ${
            props.rawDataType === "json" ? "active" : ""
          }`}
          onClick={() => {
            props.setRawDataType("json");
          }}
        />
        <img
          src={csv}
          alt=""
          className={`img-fluid ${props.rawDataType === "csv" ? "active" : ""}`}
          onClick={() => {
            props.setRawDataType("csv");
          }}
        />
      </div>
    </>
  );
};

export default BulkRecordsStepOneInstructions;

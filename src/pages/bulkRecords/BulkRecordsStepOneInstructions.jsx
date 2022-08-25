import React, { useState } from "react";
import html from "./../../assets/img/html.png";
import json from "./../../assets/img/json.png";
import csv from "./../../assets/img/csv.png";
import "./BulkRecordsStepOneInstructions.scss";

const BulkRecordsStepOneInstructions = (props) => {
  return (
    <>
      <div className="bulk-record-step-1-inst row">
        <div className="col">
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
        </div>
        <div className="col">
          <img
            src={csv}
            alt=""
            className={`img-fluid ${
              props.rawDataType === "csv" ? "active" : ""
            }`}
            onClick={() => {
              props.setRawDataType("csv");
            }}
          />
        </div>
        <div className="col">
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
        </div>
      </div>
      <div className="bulk-record-step-1-details">
        {props.rawDataType === "html" ? (
          <>
            <p>
              Copy and paste TABLE tags using &nbsp;
              <a
                href="https://blog.hubspot.com/website/how-to-inspect"
                target="__black"
              >
                browser inspector
              </a>
              . Root level tag should be a table.
            </p>
            <ul>
              <t> </t>
            </ul>
            <dl>
              <dt>in Chrome</dt>
              <dd>
                View &#62; Developer &#62; Developer Tools
                <strong> OR </strong>
                <br /> control+shift+C on Windows or command+option+C on macOS
              </dd>
              <dt>in Safari</dt>
              <dd>
                Develop &#62; Show Web Inspector
                <strong> OR </strong>
                <br />
                command+option+I
              </dd>
              <dt>in Firefox</dt>
              <dd>
                Tools &#62; Web Developer &#62; Inspector
                <strong> OR </strong>
                <br />
                control+shift+C on Windows or command+option+C on macOS
              </dd>
            </dl>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default BulkRecordsStepOneInstructions;

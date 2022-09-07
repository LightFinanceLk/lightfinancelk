import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormControl from "../../components/form/fields/FormControl";
import { useEffect } from "react";
import moment from "moment";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import recordApi from "../../api/recordApi";

const BulkRecordsStepSixInstructions = (props) => {
  const navigate = useNavigate();

  const toCamelCase = (str) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  };

  const createBulkRecordsHandler = async (values) => {
    try {
      let submitValues = values.map((value) => {
        return {
          amount: value.Amount,
          recordType: value.Amount > 0 ? "income" : "expense",
          date: value.Date,
          description: value.Description,
          accountId: props.accountId,
          category: value.category ? toCamelCase(value.category) : "",
          subCategory: value.subCategory ? toCamelCase(value.subCategory) : "",
        };
      });
      const res = await recordApi.createBulkRecords(
        props.accountId,
        JSON.stringify(submitValues)
      );
      if (res.data) {
        navigate(`/account/${props.accountId}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onClickHandler = () => {
    createBulkRecordsHandler(props.dataSource);
  };

  return (
    <>
      <div className="bulk-records__steps-action">
        <Button type="primary" onClick={onClickHandler}>
          Complete
        </Button>
      </div>
    </>
  );
};

export default BulkRecordsStepSixInstructions;

import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormControl from "../../components/form/fields/FormControl";
import { useEffect } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import recordApi from "../../api/recordApi";

const BulkRecordsStepSixInstructions = (props) => {
  const userId = useSelector((state) => state.auth.userId);

  const toCamelCase = (str) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  };

  const createBulkRecordsHandler = async (values) => {
    console.log(values);
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
      console.log("submitValues", submitValues);
      const res = await recordApi.createBulkRecords(
        props.accountId,
        JSON.stringify(submitValues)
      );
      if (res) {
        // TODO validate res to res.length
        console.log(res);
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

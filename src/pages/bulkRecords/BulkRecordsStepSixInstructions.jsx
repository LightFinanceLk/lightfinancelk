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
  // const [tableColumns, setTableColumns] = useState([]);

  // const submitHandler = (values) => {
  //   const dataSources = props.dataSource;
  // };
  const createBulkRecordsHandler = async (values) => {
    console.log(values);
    try {
      console.log("reset data", values);
      const res = await recordApi.createBulkRecords(
        userId,
        JSON.stringify(values)
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

  // useEffect(() => {
  //   if (props.dataColumns) {
  //     let columns = [];
  //     props.dataColumns.map((col) => {
  //       if (col.title && col.title !== "Amount" && col.title !== "Date") {
  //         columns.push({ key: col.key, value: col.title });
  //       }
  //     });
  //     setTableColumns([{ key: "Choose", value: "" }, ...columns]);
  //   }
  // }, []);

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

import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormControl from "../../components/form/fields/FormControl";
import { useEffect } from "react";
import moment from "moment";
import { Button } from "antd";

const BulkRecordsStepSixInstructions = (props) => {
  // const [tableColumns, setTableColumns] = useState([]);

  // const submitHandler = (values) => {
  //   const dataSources = props.dataSource;
  // };

  const onClickHandler = (values) => {
    // submitHandler(values);
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

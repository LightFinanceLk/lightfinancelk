import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormControl from "../../components/form/fields/FormControl";
import { useEffect } from "react";
import moment from "moment";
import { notification } from "antd";

const BulkRecordsStepSixInstructions = (props) => {
  const [tableColumns, setTableColumns] = useState([]);

  const submitHandler = (values) => {
    const dataSources = props.dataSource;
  };

  const onSubmit = (values) => {
    submitHandler(values);
  };

  useEffect(() => {
    if (props.dataColumns) {
      let columns = [];
      props.dataColumns.map((col) => {
        if (col.title && col.title !== "Amount" && col.title !== "Date") {
          columns.push({ key: col.key, value: col.title });
        }
      });
      setTableColumns([{ key: "Choose", value: "" }, ...columns]);
    }
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          descriptionColumn: "",
        }}
        validationSchema={Yup.object({
          descriptionColumn: Yup.string().required("Required"),
        })}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <FormControl
                control="select"
                label={`Select description column`}
                name="descriptionColumn"
                options={tableColumns}
              />
              <div className="lf-auth-form__button-wrapper">
                <button
                  className="btn btn-primary lf-auth-form__submit-button"
                  type="submit"
                  disabled={!formik.isValid}
                >
                  Submit
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default BulkRecordsStepSixInstructions;

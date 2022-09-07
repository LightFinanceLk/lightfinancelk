import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormControl from "../../components/form/fields/FormControl";
import { useEffect } from "react";

const BulkRecordsStepFiveInstructions = (props) => {
  const [tableColumns, setTableColumns] = useState([]);

  const submitHandler = (values) => {
    const descriptionColumn = values.descriptionColumn;
    let updatedDataColumns = props.dataColumns.filter((col) => {
      // remove unnecessary columns
      if (
        col.key === descriptionColumn ||
        col.key === "Amount" ||
        col.key === "Date"
      ) {
        return true;
      }
    });
    updatedDataColumns = updatedDataColumns.map((col) => {
      if (col.key === descriptionColumn) {
        return {
          title: "Description",
          dataIndex: "Description",
          key: "Description",
        };
      }
      return col;
    });
    let updatedDataSource = props.dataSource;
    updatedDataSource = updatedDataSource.map((item) => {
      Object.keys(item).forEach((key) => {
        if (
          key === descriptionColumn ||
          key === "Amount" ||
          key === "Date" ||
          key === "key"
        ) {
        } else {
          delete item[key];
        }
        if (key === descriptionColumn) {
          const value = item[key];
          delete item[key];
          item.Description = value;
        }
      });
      return item;
    });

    props.setDataSource(updatedDataSource);
    props.setDataColumns(updatedDataColumns);
    props.setCurrent(5);
  };

  const onSubmit = (values) => {
    submitHandler(values);
  };

  useEffect(() => {
    if (props.dataColumns) {
      let columns = [];
      props.dataColumns.map((col) => {
        if (col.key && col.key !== "Amount" && col.key !== "Date") {
          columns.push({ key: col.key, value: col.key });
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
          descriptionColumn: Yup.string(),
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
                  Next
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default BulkRecordsStepFiveInstructions;

import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormControl from "../../components/form/fields/FormControl";
import { useEffect } from "react";
import moment from "moment";
import { message } from "antd";

const BulkRecordsStepFourInstructions = (props) => {
  const [tableColumns, setTableColumns] = useState([]);
  const initialValues = {
    dateColumn: "",
    dateFormatText: "",
  };
  const validationSchema = Yup.object({
    dateColumn: Yup.string().required("Required"),
    dateFormatText: Yup.string().required("Required"),
  });
  const submitHandler = (values) => {
    const dateColumn = values.dateColumn;
    const dateFormat = values.dateFormatText;
    let errors = [];
    const updatedDataColumns = props.dataColumns.map((col) => {
      if (col.key === dateColumn) {
        return {
          title: "Date",
          dataIndex: "Date",
          key: "Date",
        };
      }
      return col;
    });
    let updatedDataSource = props.dataSource;
    updatedDataSource = updatedDataSource.map((item) => {
      Object.keys(item).forEach((key) => {
        if (key === dateColumn) {
          const value = item[key];
          delete item[key];
          item.Date = moment(value, dateFormat).format("DD/MM/YYYY");
          // item.Date = value;
        }
      });
      return item;
    });
    props.setDataSource(updatedDataSource);
    props.setDataColumns(updatedDataColumns);

    props.dataSource.map((item) => {
      if (!moment(item.Date, "DD/MM/YYYY", true).isValid()) {
        errors.push(item.Date);
      }
    });

    if (!errors.length > 0) {
      // updatedDataSource = updatedDataSource.map((item) => {
      //   item.Date = moment(item.Date, dateFormat).format("DD/MM/YYYY");
      //   return item;
      // });
      props.setDataSource(updatedDataSource);
      props.setCurrent(4);
    } else {
      message.error(`${errors.join(", ")} is/are not valid`);
    }
  };
  const onSubmit = (values) => {
    submitHandler(values);
  };

  useEffect(() => {
    if (props.dataColumns) {
      let columns = [];
      props.dataColumns.map((col) => {
        if (col.key && col.key !== "Amount") {
          columns.push({ key: col.key, value: col.key });
        }
      });
      setTableColumns([{ key: "Choose", value: "" }, ...columns]);
    }
  }, []);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <FormControl
                control="select"
                label={`Select date column`}
                name="dateColumn"
                options={tableColumns}
              />

              <FormControl
                control="input"
                type="text"
                label={`Type your date format`}
                name="dateFormatText"
                placeholder="DD-MM-YYYY"
              />

              <div className="bulk-records__example-table">
                <div className="row">
                  <div className="col">
                    <table className="table table-striped table-sm">
                      <thead>
                        <tr>
                          <th>Input</th>
                          <th>Example</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>YYYY</td>
                          <td>2014</td>
                        </tr>
                        <tr>
                          <td>YY</td>
                          <td>14</td>
                        </tr>
                        <tr>
                          <td>M</td>
                          <td>1, 12</td>
                        </tr>
                        <tr>
                          <td>MM</td>
                          <td>01, 12</td>
                        </tr>
                        <tr>
                          <td>MMM</td>
                          <td>Jan</td>
                        </tr>
                        <tr>
                          <td>MMMM</td>
                          <td>December</td>
                        </tr>
                        <tr>
                          <td>D</td>
                          <td>1, 31</td>
                        </tr>
                        <tr>
                          <td>DD</td>
                          <td>01, 31</td>
                        </tr>
                        <tr>
                          <td>Do</td>
                          <td>1st, 31st</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col">
                    <table className="table table-striped table-sm">
                      <thead>
                        <tr>
                          <th colSpan={2}>Date Format Examples</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{moment().format("DD-MM-YYYY")}</td>
                          <td>DD-MM-YYYY</td>
                        </tr>
                        <tr>
                          <td>{moment().format("MM/DD/YYYY")}</td>
                          <td>MM/DD/YYYY</td>
                        </tr>
                        <tr>
                          <td>{moment().format("DD MMM YY")}</td>
                          <td>DD MMM YY</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

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
    </div>
  );
};

export default BulkRecordsStepFourInstructions;

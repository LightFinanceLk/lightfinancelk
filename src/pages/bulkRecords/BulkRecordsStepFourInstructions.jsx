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
      if (col.title === dateColumn) {
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
          // item.Date = moment(value, dateFormat).format("DD/MM/YYYY");
          item.Date = value;
        }
      });
      return item;
    });
    props.setDataSource(updatedDataSource);
    props.setDataColumns(updatedDataColumns);

    props.dataSource.map((item) => {
      console.log(item.Date);
      if (!moment(item.Date, dateFormat, true).isValid()) {
        console.log("not valid");
        errors.push(item.Date);
      }
      console.log(item.Date);
      console.log("-----------------------");
    });

    if (errors.length > 0) {
      message.error(`${errors.join(", ")} is/are not valid`);
    } else {
      updatedDataSource = updatedDataSource.map((item) => {
        item.Date = moment(item.Date, dateFormat).format("DD/MM/YYYY");
        return item;
      });
      props.setDataSource(updatedDataSource);
      props.setCurrent(4);
    }
  };
  const onSubmit = (values) => {
    submitHandler(values);
  };

  useEffect(() => {
    if (props.dataColumns) {
      let columns = [];
      props.dataColumns.map((col) => {
        if (col.title && col.title !== "Amount") {
          columns.push({ key: col.key, value: col.title });
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

              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Input</th>
                      <th>Example</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <code>YYYY</code>
                      </td>
                      <td>
                        <code>2014</code>
                      </td>
                      <td>4 digit year</td>
                    </tr>
                    <tr>
                      <td>
                        <code>YY</code>
                      </td>
                      <td>
                        <code>14</code>
                      </td>
                      <td>2 digit year</td>
                    </tr>
                    <tr>
                      <td>
                        <code>M</code>
                      </td>
                      <td>
                        <code>1, 12</code>
                      </td>
                      <td>Month number</td>
                    </tr>
                    <tr>
                      <td>
                        <code>MM</code>
                      </td>
                      <td>
                        <code>01, 12</code>
                      </td>
                      <td>Month number</td>
                    </tr>
                    <tr>
                      <td>
                        <code>MMM</code>
                      </td>
                      <td>
                        <code>Jan</code>
                      </td>
                      <td>Month name</td>
                    </tr>
                    <tr>
                      <td>
                        <code>MMMM</code>
                      </td>
                      <td>
                        <code>December</code>
                      </td>
                      <td>Month name</td>
                    </tr>
                    <tr>
                      <td>
                        <code>D</code>
                      </td>
                      <td>
                        <code>1, 31</code>
                      </td>
                      <td>Day of month</td>
                    </tr>
                    <tr>
                      <td>
                        <code>DD</code>
                      </td>
                      <td>
                        <code>01, 31</code>
                      </td>
                      <td>Day of month</td>
                    </tr>
                    <tr>
                      <td>
                        <code>Do</code>
                      </td>
                      <td>
                        <code>1st, 31st</code>
                      </td>
                      <td>Day of month with ordinal</td>
                    </tr>
                  </tbody>
                </table>

                <table>
                  <thead>
                    <tr>
                      <th>Examples</th>
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

              <FormControl
                control="input"
                type="text"
                label={`Mention your date format`}
                name="dateFormatText"
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
    </div>
  );
};

export default BulkRecordsStepFourInstructions;

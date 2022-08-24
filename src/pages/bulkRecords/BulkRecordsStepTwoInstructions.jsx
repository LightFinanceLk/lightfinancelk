import React, { useState } from "react";
import { Switch } from "antd";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormControl from "../../components/form/fields/FormControl";
import { useEffect } from "react";

const BulkRecordsStepTwoInstructions = (props) => {
  const [areTwoColumns, setAreTwoColumns] = useState(false);
  const [tableColumns, setTableColumns] = useState([]);

  const switchChangeHandler = (checked) => {
    setAreTwoColumns(checked);
  };

  const submitHandler = (values, multipleColumns) => {
    const toFloatingPointNumber = (value) => {
      let charArr = value.split("");
      let numberString = "";
      charArr.map((char) => {
        if (char.match(/^[\.0-9]*$/)) {
          numberString += char;
        }
      });
      return parseFloat(numberString, 2);
    };
    if (!multipleColumns) {
      const updatedDataColumns = props.dataColumns.map((col) => {
        if (col.title === values.incomeExpenseColumn) {
          return {
            title: "Amount",
            dataIndex: "Amount",
            key: "Amount",
          };
        }
        return col;
      });
      let updatedDataSource = props.dataSource;
      updatedDataSource = updatedDataSource.map((item) => {
        Object.keys(item).forEach((key) => {
          if (key === values.incomeExpenseColumn) {
            const value = item[key];
            delete item[key];
            item.Amount = toFloatingPointNumber(value);
            return item;
          }
        });
        return item;
      });
      props.setDataSource(updatedDataSource);
      props.setDataColumns(updatedDataColumns);
      props.setCurrent(2);
    } else {
      props.dataColumns.map((col) => {});
    }
  };

  const onAmountFormSubmit = (values) => {
    submitHandler(values, false);
  };

  const onTwoColumnAmountFormSubmit = (values) => {
    submitHandler(values, true);
  };

  useEffect(() => {
    let dataSources = [];
    props.dataColumns.map((dataSource) => {
      dataSources.push({ key: dataSource.title, value: dataSource.key });
      return null;
    });
    setTableColumns(dataSources);
  }, [props.dataSource, props.dataColumns]);

  return (
    <div>
      <label>Income and Expenses are in two columns</label>
      <Switch
        onChange={switchChangeHandler}
        checkedChildren="Yes"
        unCheckedChildren="No"
      />
      {!areTwoColumns ? (
        <>
          <Formik
            initialValues={{
              incomeExpenseColumn: "",
            }}
            validationSchema={Yup.object({
              incomeExpenseColumn: Yup.string().required("Required"),
            })}
            onSubmit={onAmountFormSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <FormControl
                    control="select"
                    label={`Select income expenses amount column`}
                    name="incomeExpenseColumn"
                    options={[
                      { key: "Select Income Expenses Column", value: "" },
                      ...tableColumns,
                    ]}
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
      ) : (
        <>
          <Formik
            initialValues={{
              incomeColumn: "",
              expenseColumn: "",
            }}
            validationSchema={Yup.object({
              incomeColumn: Yup.string()
                .required("Required")
                .notOneOf(
                  [Yup.ref("expenseColumn")],
                  "Select different columns"
                ),
              expenseColumn: Yup.string()
                .required("Required")
                .notOneOf(
                  [Yup.ref("incomeColumn")],
                  "Select different columns"
                ),
            })}
            onSubmit={onTwoColumnAmountFormSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <>
                    <FormControl
                      control="select"
                      label={`Select income amount column`}
                      name="incomeColumn"
                      options={[
                        { key: "Select Income Column", value: "" },
                        ...tableColumns,
                      ]}
                    />
                    <FormControl
                      control="select"
                      label={`Select expenses amount column`}
                      name="expenseColumn"
                      options={[
                        { key: "Select Expenses Column", value: "" },
                        ...tableColumns,
                      ]}
                    />
                  </>
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
      )}
    </div>
  );
};

export default BulkRecordsStepTwoInstructions;

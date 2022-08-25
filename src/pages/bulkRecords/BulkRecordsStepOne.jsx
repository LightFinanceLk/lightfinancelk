import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormControl from "../../components/form/fields/FormControl";
import HtmlTableToJson from "html-table-to-json";
import { message } from "antd";
import csv from "csvtojson";

const BulkRecordsStepOne = (props) => {
  const initialValues = {
    rawData: "",
  };
  const validationSchema = Yup.object({
    rawData: Yup.string().required("Required"),
  });
  const submitHandler = (values) => {
    let isError = false;
    const capitalize = (str) => {
      const words = str.split(" ");
      const capitalizedWords = words.map((word) => {
        return word && word.charAt(0).toUpperCase() + word.slice(1);
      });
      return capitalizedWords.join();
    };
    const createColumns = (rawColumns) => {
      let columns = [];
      try {
        columns = rawColumns.filter((item) => item !== "");
        columns = columns.map((item) => {
          let altItem = {};
          item !== ""
            ? (altItem = {
                title: capitalize(item).replace(/[^a-zA-Z]/g, ""),
                dataIndex: item.replace(/[^a-zA-Z]/g, "").toLowerCase(),
                key: item.replace(/[^a-zA-Z]/g, "").toLowerCase(),
              })
            : (altItem = null);
          return altItem;
        });
        props.setDataColumns(columns);
      } catch (error) {
        isError = true;
        message.error(`Error in creating table columns`);
      }
    };
    const createDataSource = (rawDataSource) => {
      try {
        let dataSource = [];
        dataSource = rawDataSource.map((item, index) => {
          let altItem = Object.fromEntries(
            Object.entries(item).filter(([key, value]) => {
              return key.replace(/[^a-zA-Z]/g, "") !== "";
            })
          );
          Object.keys(altItem).forEach((key) => {
            const temp = altItem[key];
            delete altItem[key];
            altItem[key.replace(/[^a-zA-Z]/g, "").toLowerCase()] = temp;
          });
          return {
            ...altItem,
            key: index,
          };
        });
        props.setDataSource(dataSource);
      } catch (error) {
        isError = true;
        message.error(`Error in creating table rows`);
      }
    };

    if (props.rawDataType === "html") {
      const jsonTables = HtmlTableToJson.parse(values.rawData);
      if (jsonTables.results[0]) {
        createDataSource(jsonTables.results[0]);
      } else {
        message.error(
          `Error in HTML <thead> markup. Please check and try again.`
        );
      }
      if (jsonTables.headers[0]) {
        createColumns(jsonTables.headers[0]);
      } else {
        message.error(
          `Error in HTML <tbody> markup. Please check and try again.`
        );
      }
    } else if (props.rawDataType === "csv") {
      csv({
        output: "json",
        noheader: false,
      })
        .fromString(values.rawData)
        .then((jsonObj) => {
          if (jsonObj) {
            createColumns(Object.keys(jsonObj[0]));
            createDataSource(jsonObj);
          } else {
            message.error(`Error in CSV data. Please check and try again.`);
          }
        })
        .catch(() => {
          message.error(`Error in CSV data. Please check and try again.`);
        });
    }
    if (!isError) {
      props.setCurrent(1);
    }
  };
  const onSubmit = (values) => {
    submitHandler(values);
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <FormControl
                control="textarea"
                label={`Add ${props.rawDataType.toUpperCase()}`}
                name="rawData"
                placeholder={
                  props.rawDataType === "html" ? (
                    `eg.
                    <table>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Amount</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>25/07/2022</td>
                          <td>1000</td>
                          <td>Salary</td>
                        </tr>
                        <tr>
                          <td>28/07/2022</td>
                          <td>500</td>
                          <td>Doctor Fee</td>
                        </tr>
                      </tbody>
                    </table>`
                  ) : props.rawDataType === "csv" ? (
                    `eg.
                    Date,Amount,Description
                    25/07/2022,1000,Salary
                    28/07/2022,500,Doctor Fee
                    `
                  ) : props.rawDataType === "json" ? (
                    <></>
                  ) : (
                    ""
                  )
                }
              />
              <div className="lf-auth-form__button-wrapper">
                <button
                  className="btn btn-primary lf-auth-form__submit-button"
                  type="submit"
                  disabled={!formik.isValid}
                >
                  Add {props.rawDataType.toUpperCase()}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default BulkRecordsStepOne;

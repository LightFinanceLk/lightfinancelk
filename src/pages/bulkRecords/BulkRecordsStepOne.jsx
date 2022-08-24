import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormControl from "../../components/form/fields/FormControl";
import HtmlTableToJson from "html-table-to-json";

const BulkRecordsStepOne = (props) => {
  const initialValues = {
    html: "",
  };
  const validationSchema = Yup.object({
    html: Yup.string().required("Required"),
  });
  const submitHandler = (values) => {
    if (props.rawDataType === "html") {
      const jsonTables = HtmlTableToJson.parse(values.html);
      if (jsonTables.results[0]) {
        const data = jsonTables.results[0];
        // console.log(data);
        let dataSource = [];

        dataSource = data.map((item, index) => {
          // console.log(item);
          let altItem = Object.fromEntries(
            Object.entries(item).filter(([key, value]) => {
              return key.replace(/[^a-zA-Z]/g, "") !== "";
            })
          );

          Object.keys(altItem).forEach((key) => {
            const temp = altItem[key];
            delete altItem[key];
            altItem[key.replace(/[^a-zA-Z]/g, "")] = temp;
          });
          return {
            ...altItem,
            key: index,
          };
        });
        props.setDataSource(dataSource);
      }
      if (jsonTables.headers[0]) {
        const headers = jsonTables.headers[0];
        let columns = [];
        const capitalize = (str) => {
          const words = str.split(" ");
          const capitalizedWords = words.map((word) => {
            return word && word.charAt(0).toUpperCase() + word.slice(1);
          });
          return capitalizedWords.join();
        };
        columns = headers.filter((item) => item !== "");
        // console.log(columns);
        columns = columns.map((item) => {
          let altItem = {};
          item !== ""
            ? (altItem = {
                title: capitalize(item).replace(/[^a-zA-Z]/g, ""),
                dataIndex: item.replace(/[^a-zA-Z]/g, ""),
                key: item.replace(/[^a-zA-Z]/g, ""),
              })
            : (altItem = null);
          return altItem;
        });
        props.setDataColumns(columns);
      }
    }
    props.setCurrent(1);
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
                name="html"
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

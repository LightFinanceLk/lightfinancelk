import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormControl from "./FormControl";

const AddAccountForm = () => {
  const initialValues = {
    accountName: "",
    accountColor: "#rrggbb",
    accountType: "",
    currency: "",
  };
  const validationSchema = Yup.object({
    accountName: Yup.string().required("Required"),
    accountColor: Yup.string().required("Required"),
    accountType: Yup.string().required("Required"),
    currency: Yup.string().required("Required"),
  });
  const onSubmit = (values) => {
    console.log("Form data", values);
    console.log("Saved data", JSON.parse(JSON.stringify(values)));
  };
  const accountTypeOptions = [
    { key: "Choose", value: "" },
    { key: "Option 1", value: "option1" },
    { key: "Option 2", value: "option2" },
    { key: "Option 3", value: "option3" },
  ];
  const currencyOptions = [
    { key: "Choose", value: "" },
    { key: "Option 1", value: "option1" },
    { key: "Option 2", value: "option2" },
    { key: "Option 3", value: "option3" },
  ];
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
              <div className="add-account">
                <FormControl
                  control="input"
                  type="text"
                  label="Name"
                  name="accountName"
                />
                <FormControl
                  control="input"
                  type="color"
                  label="Color"
                  name="accountColor"
                />
                <FormControl
                  control="select"
                  label="Account Type"
                  name="accountType"
                  options={accountTypeOptions}
                />
                <FormControl
                  control="select"
                  label="Currency"
                  name="currency"
                  options={currencyOptions}
                />
                <div className="add-account__bottom-submit">
                  <button type="submit">Save</button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default AddAccountForm;

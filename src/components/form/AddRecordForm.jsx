import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormControl from "./FormControl";

const AddRecordForm = () => {
  const initialValues = {
    transactionType: "",
    accountName: "",
    amount: 0,
    category: "",
    transactionDate: "",
  };
  const validationSchema = Yup.object({
    transactionType: Yup.string().required("Required"),
    accountName: Yup.string().required("Required"),
    amount: Yup.number()
      .required("Required")
      .min(1, "Amount should be more than 0"),
    category: Yup.string().required("Required"),
    transactionDate: Yup.date().required("Required").nullable(),
  });
  const onSubmit = (values) => {
    console.log("Form data", values);
    console.log("Saved data", JSON.parse(JSON.stringify(values)));
  };
  const transactionTypeOptions = [
    { key: "Income", value: "income" },
    { key: "Expense", value: "expense" },
  ];
  const accountNameOptions = [
    { key: "Choose", value: "" },
    { key: "Option 1", value: "option1" },
    { key: "Option 2", value: "option2" },
    { key: "Option 3", value: "option3" },
  ];
  const categoryOptions = [
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
              <div className="add-record">
                <div className="add-record__top">
                  <FormControl
                    control="radio"
                    label=""
                    name="transactionType"
                    options={transactionTypeOptions}
                  />
                  <FormControl
                    control="select"
                    label="Account"
                    name="accountName"
                    options={accountNameOptions}
                  />
                  <FormControl
                    control="input"
                    type="number"
                    label="Amount"
                    name="amount"
                  />
                </div>
                <div className="add-record__bottom">
                  <FormControl
                    control="select"
                    label="Category"
                    name="category"
                    options={categoryOptions}
                  />
                  <FormControl
                    control="date"
                    label="Date"
                    name="transactionDate"
                  />
                  <div className="add-record__bottom-submit">
                    <button type="submit">Add Record</button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default AddRecordForm;

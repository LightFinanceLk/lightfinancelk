import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormControl from "../../fields/FormControl";

const EditAccountForm = (props) => {
  const [initialValues, setInitialValues] = useState();

  const validationSchema = Yup.object({
    accountName: Yup.string().required("Required"),
    accountColor: Yup.string().required("Required"),
    accountType: Yup.string().required("Required"),
    currency: Yup.string().required("Required"),
    amount: Yup.number().required("Required"),
  });
  const accountTypeOptions = [
    { key: "Choose", value: "" },
    { key: "Cash", value: "cash" },
    { key: "Current Account", value: "currentAccount" },
    { key: "Credit Card", value: "creditCard" },
    { key: "Savings Account", value: "savingsAccount" },
    { key: "Insurance", value: "insurance" },
    { key: "Investment", value: "investment" },
    { key: "Loan", value: "loan" },
  ];
  const currencyOptions = [
    { key: "Choose", value: "" },
    { key: "LKR", value: "lkr" },
  ];
  const onSubmit = (values) => {
    props.submitHandler(values);
  };

  useEffect(() => {
    if (props.initialValues) {
      console.log(initialValues, "initialValues");
      setInitialValues(props.initialValues);
    }
  }, [props]);

  return (
    <>
      {initialValues && (
        <div className="lf-account-form">
          <div className="lf-account-form__inner">
            <div className="lf-account-form__welcome-msg">
              <p>Let's create An account.</p>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => {
                return (
                  <Form>
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-6">
                          <FormControl
                            control="input"
                            type="text"
                            label="Account Name (Nick Name)"
                            name="accountName"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <FormControl
                            control="select"
                            label="Account Type"
                            name="accountType"
                            options={accountTypeOptions}
                          />
                        </div>
                        <div className="col-sm-6">
                          <FormControl
                            control="input"
                            type="color"
                            label="Color"
                            name="accountColor"
                          />
                        </div>
                        <div className="col-sm-6">
                          <FormControl
                            control="input"
                            type="text"
                            label="Starting Amount"
                            name="amount"
                            value="0"
                          />
                        </div>
                        <div className="col-sm-6">
                          <FormControl
                            control="select"
                            label="Currency"
                            name="currency"
                            options={currencyOptions}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="lf-account-form__button-wrapper">
                      <button
                        className="btn btn-primary lf-account-form__submit-button"
                        type="submit"
                        disabled={!formik.isValid}
                      >
                        Edit Account
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default EditAccountForm;

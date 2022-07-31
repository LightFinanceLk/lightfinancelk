import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormControl from "../FormControl";
import logo from "./../../../assets/img/logo.png";

const ForgotPasswordForm = () => {
  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
  });
  const onSubmit = (values) => {
    console.log("Form data", values);
  };
  return (
    <div className="login-form">
      <div className="login-form__inner">
        <figure className="figure login-form__logo">
          <img src={logo} alt="" className=" img-fluid" />
        </figure>
        <p>
          Please enter your email address and we will send you instructions on
          how to reset your password
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <FormControl
                  control="input"
                  type="email"
                  label="Email Address"
                  name="email"
                />
                <div className="login-form__button-wrapper">
                  <button
                    className="btn btn-primary"
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
    </div>
  );
};

export default ForgotPasswordForm;

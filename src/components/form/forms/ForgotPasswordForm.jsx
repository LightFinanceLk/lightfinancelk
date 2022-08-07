import { Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import FormControl from "../FormControl";
import logo from "./../../../assets/img/logo.png";

const ForgotPasswordForm = (props) => {
  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
  });
  const onSubmit = (values) => {
    props.submitHandler(values);
    // console.log("Form data", values);
  };
  return (
    <div className="lf-auth-form lf-auth-form--reset-pw">
      <div className="lf-auth-form__inner">
        <figure className="figure lf-auth-form__logo">
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

                <div className="lf-auth-form__button-wrapper">
                  <button
                    className="btn btn-primary lf-auth-form__submit-button"
                    type="submit"
                    disabled={!formik.isValid}
                  >
                    Submit
                  </button>
                  <div>
                    Back to
                    <Link to="/"> Login</Link>
                  </div>
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

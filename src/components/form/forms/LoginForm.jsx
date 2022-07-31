import { Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import FormControl from "../FormControl";
import logo from "./../../../assets/img/logo.png";

const LoginForm = (props) => {
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(6, "Password must be at least 6 characters"),
  });
  const onSubmit = (values) => {
    props.submitHandler();
    console.log("Form data", values);
  };
  return (
    <div className="login-form">
      <div className="login-form__inner">
        <figure className="figure login-form__logo">
          <img src={logo} alt="" className=" img-fluid" />
        </figure>
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
                  label="Email"
                  name="email"
                />
                <FormControl
                  control="input"
                  type="password"
                  label="Password"
                  name="password"
                />
                <div className="login-form__button-wrapper">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={!formik.isValid}
                  >
                    Log In
                  </button>
                  <Link to="/">Forgot Password</Link>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;

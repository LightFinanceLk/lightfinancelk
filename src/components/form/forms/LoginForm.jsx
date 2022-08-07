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
    props.submitHandler(values);
  };
  return (
    <div className="lf-auth-form lf-auth-form--login">
      <div className="lf-auth-form__inner">
        <figure className="figure lf-auth-form__logo">
          <img src={logo} alt="" className=" img-fluid" />
        </figure>
        <div className="lf-auth-form__welcome-msg">
          <p>Welcome Back!</p>
          <p>Sign into Your account.</p>
        </div>
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
                <FormControl
                  control="input"
                  type="password"
                  label="Password"
                  name="password"
                />
                <div className="lf-auth-form__button-wrapper">
                  <button
                    className="btn btn-primary lf-auth-form__submit-button"
                    type="submit"
                    disabled={!formik.isValid}
                  >
                    Sign In
                  </button>
                  <div>
                    Forgot password?
                    <Link to="/forgot-password"> Reset Password</Link>
                  </div>
                  <div>
                    Don't have an account?<Link to="/signup"> Sign Up</Link>
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

export default LoginForm;

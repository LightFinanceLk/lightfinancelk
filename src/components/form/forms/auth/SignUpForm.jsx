import { Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import FormControl from "../../fields/FormControl";
import DatePickerControl from "../../fields/DatePicker";
import RadioButtons from "../../fields/RadioButtons";
import logo from "../../../../assets/img/logo.png";

const SignUpForm = (props) => {
  const initialValues = {
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    email: "",
    phone: "",
    occupation: "",
    city: "",
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    dob: Yup.string("Invalid value").required("Required"),
    gender: Yup.string().required("Required"),
    maritalStatus: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    phone: Yup.string()
      .required("Required")
      .matches(phoneRegExp, "Phone number is not valid")
      .min(10, "Phone number should be 10 digits")
      .max(10, "Phone number should be 10 digits"),
    occupation: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
  });
  const genderOptions = [
    { key: "Male", value: "male" },
    { key: "Female", value: "female" },
  ];
  const maritalStatusOptions = [
    { key: "Married", value: "married" },
    { key: "Single", value: "single" },
    { key: "Divorced", value: "divorced" },
    { key: "Widowed", value: "widowed" },
  ];
  const onSubmit = (values) => {
    props.submitHandler(values);
  };
  return (
    <div className="lf-auth-form lf-auth-form--signup">
      <div className="lf-auth-form__inner">
        <figure className="figure lf-auth-form__logo">
          <img src={logo} alt="" className=" img-fluid" />
        </figure>
        <div className="lf-auth-form__welcome-msg">
          <p>Welcome!</p>
          <p>Let's create Your account.</p>
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
                        label="First Name"
                        name="firstName"
                      />
                    </div>
                    <div className="col-sm-6">
                      <FormControl
                        control="input"
                        type="text"
                        label="Last Name"
                        name="lastName"
                      />
                    </div>
                    <div className="col-sm-6">
                      <FormControl
                        control="input"
                        type="email"
                        label="Email Address"
                        name="email"
                      />
                    </div>
                    <div className="col-sm-6">
                      <FormControl
                        control="input"
                        type="text"
                        label="Phone Number"
                        name="phone"
                      />
                    </div>
                    <div className="col-sm-6">
                      <RadioButtons
                        label="Are you a"
                        name="gender"
                        options={genderOptions}
                      ></RadioButtons>
                    </div>
                    <div className="col-sm-6">
                      <RadioButtons
                        label="Are you"
                        name="maritalStatus"
                        options={maritalStatusOptions}
                      ></RadioButtons>
                    </div>
                    <div className="col-sm-6">
                      <DatePickerControl
                        label="Date of Birth"
                        name="dob"
                      ></DatePickerControl>
                    </div>
                    <div className="col-sm-6">
                      <FormControl
                        control="input"
                        type="text"
                        label="Occupation"
                        name="occupation"
                      />
                    </div>
                    <div className="col-sm-6">
                      <FormControl
                        control="input"
                        type="text"
                        label="Nearest City"
                        name="city"
                      />
                    </div>
                  </div>
                </div>
                <div className="lf-auth-form__button-wrapper">
                  <button
                    className="btn btn-primary lf-auth-form__submit-button"
                    type="submit"
                    disabled={!formik.isValid}
                  >
                    Submit
                  </button>
                  <div>
                    Login instead?
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

export default SignUpForm;

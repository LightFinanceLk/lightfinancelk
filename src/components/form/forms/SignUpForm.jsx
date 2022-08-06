import { Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import FormControl from "../FormControl";
import DatePickerControl from "../DatePicker";
import RadioButtons from "../RadioButtons";

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
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    dob: Yup.string("Invalid value").required("Required"),
    gender: Yup.string().required("Required"),
    maritalStatus: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    phone: Yup.string().required("Required"),
    occupation: Yup.string().required("Required"),
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
    <div className="login-form">
      <div className="login-form__inner">
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
                  type="text"
                  label="First Name"
                  name="firstName"
                />
                <FormControl
                  control="input"
                  type="text"
                  label="Last Name"
                  name="lastName"
                />
                <DatePickerControl
                  label="Date of Birth"
                  name="dob"
                ></DatePickerControl>
                <RadioButtons
                  label="Are you a"
                  name="gender"
                  options={genderOptions}
                ></RadioButtons>
                <RadioButtons
                  label="Are you"
                  name="maritalStatus"
                  options={maritalStatusOptions}
                ></RadioButtons>

                <FormControl
                  control="input"
                  type="email"
                  label="Email Address"
                  name="email"
                />

                <FormControl
                  control="input"
                  type="text"
                  label="Phone Number"
                  name="phone"
                />
                <FormControl
                  control="input"
                  type="text"
                  label="Occupation"
                  name="occupation"
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

export default SignUpForm;

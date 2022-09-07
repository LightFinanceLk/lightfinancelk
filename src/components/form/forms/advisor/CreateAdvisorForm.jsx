import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormControl from "../../fields/FormControl";
import DatePickerControl from "../../fields/DatePicker";
import RadioButtons from "../../fields/RadioButtons";

const CreateAdvisorForm = (props) => {
  const initialValues = {
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    email: "",
    phone: "",
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
    <div className="lf-auth-form lf-auth-form--advisor">
      <div className="lf-auth-form__inner">
        <div className="lf-auth-form__welcome-msg">
          <p></p>
          <p>Let's create Advisor account.</p>
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
                        placeholder="eg. 0771234567"
                      />
                    </div>
                    <div className="col-sm-6">
                      <RadioButtons
                        label="Gender"
                        name="gender"
                        options={genderOptions}
                      ></RadioButtons>
                    </div>
                    <div className="col-sm-6">
                      <RadioButtons
                        label="Marital Status"
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
                        label="City"
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
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default CreateAdvisorForm;

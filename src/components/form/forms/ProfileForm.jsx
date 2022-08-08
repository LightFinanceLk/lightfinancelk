import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import FormControl from "../FormControl";
import DatePickerControl from "../DatePicker";
import RadioButtons from "../RadioButtons";
import moment from "moment";

const ProfileForm = (props) => {
  const [initialValues, setInitialValues] = useState({});
  const [dob, setDob] = useState(moment(props.date).format("YYYY/MM/DD"));
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    dob: Yup.string("Invalid value").required("Required"),
    gender: Yup.string().required("Required"),
    maritalStatus: Yup.string().required("Required"),
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
  useEffect(() => {
    setInitialValues(() => {
      return { ...props.initialValues.user };
    });
    setDob(() => {
      if (props.initialValues.user && props.initialValues.user.dob) {
        return props.initialValues.user.dob;
      }
    });
  }, [props.initialValues.user]);
  return (
    <>
      {initialValues && Object.keys(initialValues).length !== 0 && (
        <div className="lf-profile-form">
          <div className="lf-profile-form__inner">
            <div className="lf-profile-form__welcome-msg">
              <p>Let's update Your profile.</p>
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
                            disabled
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
                            label="You are a"
                            name="gender"
                            options={genderOptions}
                          ></RadioButtons>
                        </div>
                        <div className="col-sm-6">
                          <RadioButtons
                            label="You are"
                            name="maritalStatus"
                            options={maritalStatusOptions}
                          ></RadioButtons>
                        </div>
                        <div className="col-sm-6">
                          <DatePickerControl
                            label="Date of Birth"
                            name="dob"
                            date={dob}
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
                      </div>
                    </div>
                    <div className="lf-profile-form__button-wrapper">
                      <button
                        className="btn btn-primary lf-profile-form__submit-button"
                        type="submit"
                        disabled={!formik.isValid}
                      >
                        Update
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

export default ProfileForm;

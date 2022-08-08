import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import FormControl from "../FormControl";
const nanoidGenerate = require("nanoid-esm/generate");

const DeleteProfileForm = (props) => {
  const initialValues = {
    randomText: nanoidGenerate("asdf1234", 6).toUpperCase(),
    confirmText: "",
  };
  const validationSchema = Yup.object({
    randomText: Yup.string().required("Required"),
    confirmText: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("randomText"), null], "Text must match"),
  });
  const onSubmit = (values) => {
    props.DeleteProfileHandler(values);
  };
  return (
    <div className="lf-profile-form">
      <div className="lf-profile-form__inner">
        <div className="lf-profile-form__welcome-msg">
          <p>Delete Account.</p>
          <p>Are you sure you want to delete profile?</p>
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
                        label=""
                        name="randomText"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <FormControl
                        control="input"
                        type="text"
                        label="Retype above text to confirm DELETE action"
                        name="confirmText"
                      />
                    </div>
                  </div>
                </div>
                <div className="lf-profile-form__button-wrapper">
                  <button
                    className="btn btn-danger lf-profile-form__submit-button"
                    type="submit"
                    disabled={!formik.isValid}
                  >
                    Delete Profile
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

export default DeleteProfileForm;

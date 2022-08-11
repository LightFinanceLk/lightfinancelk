import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import FormControl from "../FormControl";
import { EyeInvisibleFilled, EyeFilled } from "@ant-design/icons";
import { message } from "antd";

const UpdatePasswordForm = (props) => {
  const [isPasswordSVisible, setIsPasswordVisible] = useState(true);
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmedNewPassword: "",
  };
  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Required"),
    newPassword: Yup.string()
      .required("Required")
      .min(6, "Password is too short. Minimum 6 characters."),
    confirmedNewPassword: Yup.string().required("Required"),
  });

  const togglePasswordVisibility = () => {
    // When the handler is invoked inverse the boolean state of passwordShown
    setIsPasswordVisible(!isPasswordSVisible);
  };

  const onSubmit = (values, { resetForm }) => {
    resetForm();
    props.changePasswordHandler(values);
  };
  return (
    <div className="lf-profile-form">
      <div className="lf-profile-form__inner">
        <div className="lf-profile-form__welcome-msg">
          <p>Change Password.</p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <div className="container lf-profile-form__password-fields">
                  <div className="row">
                    <div className="col-sm-6">
                      <FormControl
                        control="input"
                        type={isPasswordSVisible ? "text" : "password"}
                        label="Current Password"
                        name="currentPassword"
                      />
                      {isPasswordSVisible ? (
                        <EyeInvisibleFilled
                          onClick={togglePasswordVisibility}
                          className="lf-profile-form__password-visibility"
                          style={{ color: "#00000073" }}
                        />
                      ) : (
                        <EyeFilled
                          onClick={togglePasswordVisibility}
                          className="lf-profile-form__password-visibility"
                          style={{ color: "#00000073" }}
                        />
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <FormControl
                        control="input"
                        type={isPasswordSVisible ? "text" : "password"}
                        label="New Password"
                        name="newPassword"
                        onPaste={(e) => {
                          e.preventDefault();
                          message.info("Pasting is disabled.", 3);
                          return false;
                        }}
                        onCopy={(e) => {
                          e.preventDefault();
                          message.info("Copying is disabled.", 3);
                          return false;
                        }}
                      />
                      {isPasswordSVisible ? (
                        <EyeInvisibleFilled
                          onClick={togglePasswordVisibility}
                          className="lf-profile-form__password-visibility"
                          style={{ color: "#00000073" }}
                        />
                      ) : (
                        <EyeFilled
                          onClick={togglePasswordVisibility}
                          className="lf-profile-form__password-visibility"
                          style={{ color: "#00000073" }}
                        />
                      )}
                    </div>
                    <div className="col-sm-6">
                      <FormControl
                        control="input"
                        type={isPasswordSVisible ? "text" : "password"}
                        label="Retype New Password to confirm"
                        name="confirmedNewPassword"
                        onPaste={(e) => {
                          e.preventDefault();
                          message.info("Pasting is disabled.", 3);
                          return false;
                        }}
                        onCopy={(e) => {
                          e.preventDefault();
                          message.info("Copying is disabled.", 3);
                          return false;
                        }}
                      />
                      {isPasswordSVisible ? (
                        <EyeInvisibleFilled
                          onClick={togglePasswordVisibility}
                          className="lf-profile-form__password-visibility"
                          style={{ color: "#00000073" }}
                        />
                      ) : (
                        <EyeFilled
                          onClick={togglePasswordVisibility}
                          className="lf-profile-form__password-visibility"
                          style={{ color: "#00000073" }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="lf-profile-form__button-wrapper">
                  <button
                    className="btn btn-primary lf-profile-form__submit-button"
                    type="submit"
                    disabled={!formik.isValid}
                  >
                    Change Password
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

export default UpdatePasswordForm;

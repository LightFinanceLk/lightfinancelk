import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import FormControl from "./FormControl";

const CreateUserForm = (props) => {
  const initialValues = {
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    newPassword: "",
  };
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    mobile: Yup.string()
      .required("required")
      .matches(phoneRegExp, "Phone number is not valid")
      .min(10, "Phone number is too short")
      .max(10, "Phone number is too long"),
    email: Yup.string().email("Invalid email format").required("Required"),
    newPassword: Yup.string()
      .required("Required")
      .min(6, "Password is too short"),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      "Passwords must match"
    ),
  });
  const onSubmit = (values) => {
    props.setFormData(values);
  };

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    // When the handler is invoked inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  return (
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
            <FormControl
              control="input"
              type="text"
              label="Mobile Number"
              name="mobile"
              placeholder="0771234567"
            />
            <FormControl
              control="input"
              type="email"
              label="Email"
              name="email"
            />
            <FormControl
              control="input"
              type={passwordShown ? "text" : "password"}
              label="New Password"
              name="newPassword"
            />
            <FormControl
              control="input"
              type={passwordShown ? "text" : "password"}
              label="Retype New Password"
              name="passwordConfirmation"
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              onCopy={(e) => {
                e.preventDefault();
                return false;
              }}
            />
            <button type="button" onClick={togglePassword}>
              {passwordShown ? "Hide" : "Show"} Password
            </button>
            <button type="submit" disabled={!formik.isValid}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateUserForm;

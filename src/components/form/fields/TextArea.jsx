import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const TextArea = (props) => {
  const { label, name, ...rest } = props;
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Field
        as="textarea"
        id={name}
        name={name}
        className="form-control"
        {...rest}
      />
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
};

export default TextArea;

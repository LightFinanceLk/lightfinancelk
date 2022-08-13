import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

function Select(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Field
        as="select"
        id={name}
        name={name}
        {...rest}
        className="form-control"
      >
        {options.map((option, index) => {
          let el;
          if (index === 0) {
            el = (
              <option key={option.value} value={option.value}>
                {option.key}
              </option>
            );
          } else {
            el = (
              <option key={option.value} value={option.value}>
                {option.key}
              </option>
            );
          }
          return el;
        })}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default Select;

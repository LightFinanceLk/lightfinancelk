import React, { useEffect, useState } from "react";
// import DateView from "react-datepicker";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
// import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from "antd";
import moment from "moment";

const DatePickerControl = (props) => {
  const { label, name, ...rest } = props;
  const dateFormat = "YYYY/MM/DD";
  const [date, setDate] = useState("");
  useEffect(() => {
    if (props.date) {
      setDate(moment(props.date).format(dateFormat));
    }
    console.log(props.date);
  }, [props.date]);
  return (
    <div className="mb-3 lf-dob">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <DatePicker
              className="form-control"
              name={name}
              format={dateFormat}
              onChange={(val) => setFieldValue(name, val)}
              placeholder={date}
            />
          );
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
};

export default DatePickerControl;

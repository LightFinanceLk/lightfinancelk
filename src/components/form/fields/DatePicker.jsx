import React, { useEffect, useState } from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { DatePicker } from "antd";
import moment from "moment";

const DatePickerControl = (props) => {
  const { label, name } = props;
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
        {({ form }) => {
          const { setFieldValue } = form;
          return (
            <DatePicker
              className="form-control"
              name={name}
              format={dateFormat}
              onChange={(val) => setFieldValue(name, val)}
              placeholder="Select"
              disabledDate={(current) => {
                let customDate = moment().add(1, "days").format("YYYY-MM-DD");
                return current && current > moment(customDate, "YYYY-MM-DD");
              }}
            />
          );
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
};

export default DatePickerControl;

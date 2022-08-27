import React from "react";
// import CheckboxGroup from "./CheckboxGroup";
import RadioButtons from "./RadioButtons";
import Select from "./Select";
import Input from "./Input";
import DatePicker from "./DatePicker";
import TextArea from "./TextArea";

const FormControl = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    // case "textarea":
    //   return <Textarea {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "radio":
      return <RadioButtons {...rest} />;
    // case "checkbox":
    // return <CheckboxGroup {...rest} />;
    case "date":
      return <DatePicker {...rest} />;
    case "textarea":
      return <TextArea {...rest} />;
    default:
      return null;
  }
};

export default FormControl;

import { useFormikContext, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import FormControl from "../../FormControl";
import categories from "./categories";
import RadioButtons from "../../RadioButtons";
import DatePickerControl from "../../DatePicker";
import moment from "moment";

const AutoUpdateForm = (props) => {
  const { values } = useFormikContext();

  useEffect(() => {
    console.log(values);
    console.log(props);
    if (values.category !== "") {
      let index;
      Object.keys(categories).map((el, i) => {
        if (
          el
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()) ===
          values.category
        ) {
          index = i;
        }
      });
      const subCategories = Object.values(categories)[index];
      let subCatOptions = [];
      for (let i = 0; i < subCategories.length; i++) {
        subCatOptions.push({
          key: subCategories[i],
          value: subCategories[i]
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()),
        });
      }
      props.setSubCategoryOptions([
        {
          key: "Choose",
          value: "",
        },
        ...subCatOptions,
      ]);
      props.setIsSubCategoryEnabled(false);
    }
  }, [values, props]);
  return null;
};

const CreateRecordForm = (props) => {
  const [categoryOptions, setCategoryOptions] = useState([
    {
      key: "Choose",
      value: "",
    },
  ]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([
    {
      key: "Choose",
      value: "",
    },
  ]);
  const [isSubCategoryEnabled, setIsSubCategoryEnabled] = useState(true);

  useEffect(() => {
    let cat = Object.keys(categories);
    let catOptions = [];
    for (let i = 0; i < cat.length; i++) {
      catOptions.push({
        key: cat[i],
        value: cat[i]
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()),
      });
      setCategoryOptions([]);
      setCategoryOptions([
        {
          key: "Choose",
          value: "",
        },
        ...catOptions,
      ]);
    }
  }, []);

  const initialValues = {
    transactionType: "expense",
    account: "",
    transactionAmount: "",
    category: "",
    subCategory: "",
    date: "",
  };

  const validationSchema = Yup.object({
    transactionType: Yup.string().required("Required"),
    account: Yup.string().required("Required"),
    transactionAmount: Yup.number("Amount should be a number").required(
      "Required"
    ),
    category: Yup.string().required("Required"),
    date: Yup.string().required("Required"),
  });

  const transactionTypeOptions = [
    { key: "Income", value: "income" },
    { key: "Expense", value: "expense" },
  ];

  const onSubmit = (values) => {
    props.submitHandler(values);
  };

  return (
    categoryOptions &&
    props.userAccounts !== [] && (
      <div className="lf-account-form">
        <div className="lf-account-form__inner">
          <div className="lf-account-form__welcome-msg">
            <p>Let's record a Transaction.</p>
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
                      <div className="col-sm-12">
                        <RadioButtons
                          label=""
                          name="transactionType"
                          options={transactionTypeOptions}
                        ></RadioButtons>
                      </div>
                      <div className="col-sm-6">
                        <FormControl
                          control="select"
                          label="Account Name"
                          name="account"
                          options={props.userAccounts}
                        />
                      </div>
                      <div className="col-sm-6">
                        <DatePickerControl
                          label="Date"
                          name="date"
                          date={moment().format("YYYY/MM/DD")}
                        ></DatePickerControl>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <FormControl
                          control="select"
                          label="Category"
                          name="category"
                          options={categoryOptions}
                        />
                      </div>
                      <div className="col-sm-6">
                        <FormControl
                          control="select"
                          label="Sub Category"
                          name="subCategory"
                          options={subCategoryOptions}
                          disabled={isSubCategoryEnabled}
                        />
                      </div>
                      <div className="col-sm-6">
                        <FormControl
                          control="input"
                          type="text"
                          label="Amount"
                          name="transactionAmount"
                        />
                      </div>
                      <div className="col-sm-6">show currency here....</div>
                    </div>
                  </div>
                  <div className="lf-account-form__button-wrapper">
                    <button
                      className="btn btn-primary lf-account-form__submit-button"
                      type="submit"
                      disabled={!formik.isValid}
                    >
                      Create Record
                    </button>
                  </div>
                  <AutoUpdateForm
                    setSubCategoryOptions={setSubCategoryOptions}
                    setIsSubCategoryEnabled={setIsSubCategoryEnabled}
                  ></AutoUpdateForm>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    )
  );
};

export default CreateRecordForm;

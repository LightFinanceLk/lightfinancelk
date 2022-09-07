import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormikContext, Form, Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import FormControl from "../../fields/FormControl";
import categories from "../../../../util/categories";
import RadioButtons from "../../fields/RadioButtons";
import DatePickerControl from "../../fields/DatePicker";

const AutoUpdateForm = (props) => {
  const { values } = useFormikContext();

  useEffect(() => {
    if (values.category !== "") {
      let index = 0;
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
  }, []);
  return null;
};

const UpdateRecordForm = (props) => {
  const uAccounts = useSelector((state) => state.account.accounts);
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

  const [userAccounts, setUserAccounts] = useState([]);

  const [initialValues, setInitialValues] = useState({});

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
    let userAccounts = [
      {
        key: "Choose",
        value: "",
      },
    ];
    uAccounts.map((account) => {
      userAccounts.push({ key: account.accountName, value: account._id });
    });

    setUserAccounts(userAccounts);

    setInitialValues({
      recordType: props.initialValues.recordType,
      accountId: props.initialValues.accountId,
      amount: props.initialValues.amount,
      category: props.initialValues.category || "",
      subCategory: props.initialValues.subCategory || "",
      date: props.initialValues.date,
      description: props.initialValues.description || "",
    });
  }, [props.initialValues, uAccounts]);

  const validationSchema = Yup.object({
    recordType: Yup.string().required("Required"),
    accountId: Yup.string().required("Required"),
    amount: Yup.number("Amount should be a number").required("Required"),
    category: Yup.string().required("Required"),
    subCategory: Yup.string(),
    date: Yup.string().required("Required"),
    description: Yup.string(),
  });

  const transactionTypeOptions = [
    { key: "Income", value: "income" },
    { key: "Expense", value: "expense" },
  ];

  const onSubmit = (values) => {
    props.submitHandler(values);
  };

  return (
    categoryOptions !== {} &&
    userAccounts.length &&
    initialValues.accountId && (
      <div className="lf-account-form lf-account-form--create-record">
        <div className="lf-account-form__inner">
          <div className="lf-account-form__welcome-msg">
            <p>Let's update a Transaction.</p>
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
                          name="recordType"
                          options={transactionTypeOptions}
                        ></RadioButtons>
                      </div>
                      <div className="col-sm-6">
                        <FormControl
                          control="select"
                          label="Account Name"
                          name="accountId"
                          options={userAccounts}
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
                          type="number"
                          label="Amount"
                          name="amount"
                        />
                      </div>
                      <div className="col-sm-6">
                        <FormControl
                          control="input"
                          type="text"
                          label="Description"
                          name="description"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="lf-account-form__button-wrapper">
                    <button
                      className="btn btn-primary lf-account-form__submit-button"
                      type="submit"
                      disabled={!formik.isValid}
                    >
                      Update Record
                    </button>
                  </div>
                  <AutoUpdateForm
                    setSubCategoryOptions={setSubCategoryOptions}
                    setIsSubCategoryEnabled={setIsSubCategoryEnabled}
                    initialValues={initialValues}
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

export default UpdateRecordForm;

import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import userApi from "../../../../api/userApi";
import FormControl from "../../fields/FormControl";
import DatePickerControl from "../../fields/DatePicker";
import RadioButtons from "../../fields/RadioButtons";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";

const AdvisorProfileForm = (props) => {
  const [initialValues, setInitialValues] = useState({});
  const [dob, setDob] = useState(moment(props.date).format("YYYY/MM/DD"));
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    const gerUserDataById = async (userId) => {
      try {
        const res = await userApi.getDataByUserId(userId);
        if (res) {
          setInitialValues(res.data.user);
          setDob(() => {
            return res.data.user.dob;
          });
        }
      } catch (e) {
        // console.log(e);
      }
    };
    gerUserDataById(userId);
  }, [userId]);

  const URL =
    /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    dob: Yup.string("Invalid value").required("Required"),
    gender: Yup.string().required("Required"),
    maritalStatus: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    title: Yup.string(),
    headline: Yup.string(),
    description: Yup.string(),
    linkedIn: Yup.string().matches(URL, "Enter correct URI"),
  });

  const genderOptions = [
    { key: "Male", value: "male" },
    { key: "Female", value: "female" },
  ];

  const maritalStatusOptions = [
    { key: "Married", value: "married" },
    { key: "Single", value: "single" },
    { key: "Divorced", value: "divorced" },
    { key: "Widowed", value: "widowed" },
  ];

  const onSubmit = (values) => {
    props.submitHandler(values);
  };

  return (
    <>
      {initialValues && Object.keys(initialValues).length !== 0 && (
        <div className="lf-profile-form">
          <div className="lf-profile-form__inner">
            <div className="lf-profile-form__welcome-msg">
              <p>Let's update Your profile.</p>
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
                            label="First Name"
                            name="firstName"
                          />
                        </div>
                        <div className="col-sm-6">
                          <FormControl
                            control="input"
                            type="text"
                            label="Last Name"
                            name="lastName"
                          />
                        </div>
                        <div className="col-sm-6">
                          <FormControl
                            control="input"
                            type="text"
                            label="Your titles"
                            name="title"
                            placeholder="eg: AAT, MBCS"
                          />
                        </div>
                        <div className="col-sm-6">
                          <FormControl
                            control="input"
                            type="text"
                            label="Headline"
                            name="headline"
                            placeholder="eg: Financial Advisor"
                          />
                        </div>
                        <div className="col-sm-12">
                          <FormControl
                            control="textarea"
                            type="text"
                            label="Description"
                            name="description"
                            placeholder="Mention what you have to tell to your clients"
                          />
                        </div>
                        <div className="col-sm-6">
                          <FormControl
                            control="input"
                            type="text"
                            label="Phone Number"
                            name="phone"
                          />
                        </div>
                        <div className="col-sm-6">
                          <FormControl
                            control="input"
                            type="text"
                            label="LinkedIn Profile URI"
                            name="linkedIn"
                            placeholder="eg: https://www.linkedin.com/<profile-name>"
                          />
                        </div>
                        <div className="col-sm-6">
                          <RadioButtons
                            label="You are a"
                            name="gender"
                            options={genderOptions}
                          ></RadioButtons>
                        </div>
                        <div className="col-sm-6">
                          <RadioButtons
                            label="You are"
                            name="maritalStatus"
                            options={maritalStatusOptions}
                          ></RadioButtons>
                        </div>
                        <div className="col-sm-6">
                          <DatePickerControl
                            label="Date of Birth"
                            name="dob"
                            date={dob}
                          ></DatePickerControl>
                        </div>
                      </div>
                    </div>
                    <div className="lf-profile-form__button-wrapper">
                      <button
                        className="btn btn-primary lf-profile-form__submit-button"
                        type="submit"
                        disabled={!formik.isValid}
                      >
                        Update
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default AdvisorProfileForm;

import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormControl from "../FormControl";

const UpdatePasswordForm = (props) => {
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmedNewPassword: "",
  };
  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Required"),
    newPassword: Yup.string().required("Required"),
    confirmedNewPassword: Yup.string().required("Required"),
  });
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
                <div className="container">
                  <div className="row">
                    <div className="col-sm-6">
                      <FormControl
                        control="input"
                        type="text"
                        label="Current Password"
                        name="currentPassword"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <FormControl
                        control="input"
                        type="text"
                        label="New Password"
                        name="newPassword"
                      />
                    </div>
                    <div className="col-sm-6">
                      <FormControl
                        control="input"
                        type="text"
                        label="Retype New Password to confirm"
                        name="confirmedNewPassword"
                      />
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

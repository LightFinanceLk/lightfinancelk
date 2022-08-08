import React, { useEffect, useState } from "react";
import ProfileForm from "../../components/form/forms/ProfileForm";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import userApi from "../../api/userApi";
import UpdatePasswordForm from "../../components/form/forms/UpdatePasswordForm";
import DeleteProfileForm from "../../components/form/forms/DeleteProfileForm";
import { authActions } from "../../store/auth";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({});
  const uId = useSelector((state) => state.auth.uId);
  useEffect(() => {
    const gerUserDataById = async (uId) => {
      try {
        const res = await userApi.getDataByUserId(uId);
        if (res) {
          // TODO validate res to res.length
          // navigate("/login");
          setInitialValues(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    gerUserDataById(uId);
    // setInitialValues({});
  }, []);

  const submitHandler = async (formData) => {
    console.log(formData);
    // const resetPassword = async (formData) => {
    try {
      console.log("reset data", formData);
      const res = await userApi.updateDataByUserId(
        uId,
        JSON.stringify(formData)
      );
      if (res) {
        // TODO validate res to res.length
        console.log(res);
        // navigate("/login");
      }
    } catch (e) {
      console.log(e);
    }
    // };
    // resetPassword(formData);
  };
  const changePasswordHandler = async (formData) => {
    try {
      console.log("reset data", formData);
      const res = await userApi.updatePassword(uId, JSON.stringify(formData));
      if (res) {
        // TODO validate res to res.length
        console.log(res);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const DeleteProfileHandler = async (formData) => {
    try {
      console.log("reset data", formData);
      const res = await userApi.deleteProfile(uId, JSON.stringify(formData));
      if (res) {
        dispatch(authActions.logout());
        navigate("/login");
        // TODO validate res to res.length
        console.log(res);
      }
    } catch (e) {
      console.log(e);
    }
  };
  // return <ProfileForm initialValues={initialValues} />;
  return (
    <>
      <ProfileForm
        initialValues={initialValues}
        submitHandler={submitHandler}
      />
      <UpdatePasswordForm
        changePasswordHandler={changePasswordHandler}
      ></UpdatePasswordForm>
      <DeleteProfileForm
        DeleteProfileHandler={DeleteProfileHandler}
      ></DeleteProfileForm>
    </>
  );
};

export default ProfilePage;

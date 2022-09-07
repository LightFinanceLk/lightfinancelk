import React, { useEffect, useState } from "react";
import UserProfilePage from "./UserProfilePage";
import userApi from "../../api/userApi";
import UpdatePasswordForm from "../../components/form/forms/auth/UpdatePasswordForm";
import DeleteProfileForm from "../../components/form/forms/auth/DeleteProfileForm";
import { authActions } from "../../store/auth";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdvisorProfilePage from "./AdvisorProfilePage";
import { message } from "antd";

const ProfileWrapper = () => {
  const [initialValues, setInitialValues] = useState({});
  const userId = useSelector((state) => state.auth.userId);
  const id = useSelector((state) => state.auth.id);
  const userRole = useSelector((state) => state.auth.role);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ROLES = {
    User: "2022",
    Admin: "1986",
    Advisor: "1974",
  };

  useEffect(() => {
    const gerUserDataById = async (userId) => {
      try {
        const res = await userApi.getDataByUserId(userId);
        if (res) {
          setInitialValues(res.data);
        }
      } catch (e) {
        // console.log(e);
      }
    };
    gerUserDataById(userId);
    console.log(initialValues);
  }, [userId]);

  const changePasswordHandler = async (formData) => {
    try {
      const res = await userApi.updatePassword(id, JSON.stringify(formData));
      if (res) {
        message.success({
          content: "Password was updated successfully.",
        });
      }
    } catch (e) {
      // console.log(e);
      message.error({
        content: "Error, Password was not updated successfully.",
      });
    }
  };

  const DeleteProfileHandler = async (formData) => {
    try {
      const res = await userApi.deleteProfile(id, JSON.stringify(formData));
      if (res.data) {
        localStorage.removeItem("lf-user");
        dispatch(authActions.logout());
        message.success({
          content: "Account was deleted successfully.",
        });
        navigate("/login");
      }
    } catch (e) {
      // console.log(e);
      message.error({
        content: "Error, Account was not deleted successfully.",
      });
    }
  };

  return (
    <>
      {userRole === ROLES.Advisor ? (
        <AdvisorProfilePage />
      ) : userRole === ROLES.User ? (
        <UserProfilePage initialValues={initialValues} />
      ) : null}
      <UpdatePasswordForm
        changePasswordHandler={changePasswordHandler}
      ></UpdatePasswordForm>
      <DeleteProfileForm
        DeleteProfileHandler={DeleteProfileHandler}
      ></DeleteProfileForm>
    </>
  );
};

export default ProfileWrapper;

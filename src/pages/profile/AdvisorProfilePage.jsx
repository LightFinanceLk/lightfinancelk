import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import userApi from "../../api/userApi";
import AdvisorProfileForm from "../../components/form/forms/profile/AdvisorProfileForm";
import { authActions } from "../../store/auth";
import { message } from "antd";

const AdvisorProfilePage = () => {
  const userId = useSelector((state) => state.auth.userId);

  const submitHandler = async (formData) => {
    try {
      const res = await userApi.updateDataByUserId(
        userId,
        JSON.stringify({ ...formData, occupation: "advisor" })
      );
      if (res) {
        message.success({
          content: "Profile updated successfully.",
        });
      }
    } catch (e) {
      // console.log(e);
      message.error({
        content: "Error, Profile was not updated successfully.",
      });
    }
  };
  return (
    <div>
      <AdvisorProfileForm submitHandler={submitHandler} />
    </div>
  );
};

// set date format
// set currency and remove currency from account

export default AdvisorProfilePage;

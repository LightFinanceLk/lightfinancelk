import React from "react";
import { useSelector } from "react-redux";
import { message } from "antd";
import userApi from "../../api/userApi";
import AdvisorProfileForm from "../../components/form/forms/profile/AdvisorProfileForm";

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

export default AdvisorProfilePage;

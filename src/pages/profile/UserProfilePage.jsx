import { useSelector } from "react-redux";
import { message } from "antd";
import UserProfileForm from "../../components/form/forms/profile/UserProfileForm";
import userApi from "../../api/userApi";

const UserProfilePage = (props) => {
  const userId = useSelector((state) => state.auth.userId);

  const submitHandler = async (formData) => {
    try {
      const res = await userApi.updateDataByUserId(
        userId,
        JSON.stringify(formData)
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
    <>
      <UserProfileForm
        initialValues={props.initialValues}
        submitHandler={submitHandler}
      />
    </>
  );
};

export default UserProfilePage;

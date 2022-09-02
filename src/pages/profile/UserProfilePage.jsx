import UserProfileForm from "../../components/form/forms/profile/UserProfileForm";
import { useSelector } from "react-redux";
import userApi from "../../api/userApi";
import { message } from "antd";

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
      // console.log(e);
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

// set date format
// set currency and remove currency from account

export default UserProfilePage;

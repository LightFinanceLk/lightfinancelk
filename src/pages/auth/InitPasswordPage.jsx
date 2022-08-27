import { useNavigate } from "react-router-dom";
import userApi from "../../api/userApi";
import UpdatePasswordForm from "../../components/form/forms/UpdatePasswordForm";

const InitPasswordPage = () => {
  const navigate = useNavigate();

  const resetHandler = async (formData) => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await userApi.updatePassword(
        storedUserData.uId,
        JSON.stringify(formData)
      );
      if (res) {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...storedUserData, initPassword: false })
        );
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <UpdatePasswordForm
      changePasswordHandler={resetHandler}
    ></UpdatePasswordForm>
  );
};

export default InitPasswordPage;

import { useNavigate } from "react-router-dom";
import ForgotPasswordForm from "../../components/form/forms/auth/ForgotPasswordForm";
import authApi from "../../api/authApi";
import { message } from "antd";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const resetHandler = async (formData) => {
    try {
      const res = await authApi.resetPassword(JSON.stringify(formData));
      if (res) {
        navigate("/login");
      }
    } catch (e) {
      let errorMsg = e.response.data.match(/(?<=Error).*?(?=<br>)/);
      message.error({
        content: errorMsg[0].replace(": ", ""),
        duration: 6,
      });
      // console.log(e);
    }
  };
  return <ForgotPasswordForm submitHandler={resetHandler}></ForgotPasswordForm>;
};

export default ForgotPasswordPage;

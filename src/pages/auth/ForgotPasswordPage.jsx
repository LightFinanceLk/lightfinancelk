import { useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import ForgotPasswordForm from "../../components/form/forms/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const resetHandler = (formData) => {
    console.log(formData);
    const resetPassword = async (formData) => {
      try {
        console.log("reset data", formData);
        const res = await authApi.resetPassword(JSON.stringify(formData));
        if (res) {
          // TODO validate res to res.length
          console.log(res);
          navigate("/login");
        }
      } catch (e) {
        console.log(e);
      }
    };
    resetPassword(formData);
  };
  return <ForgotPasswordForm submitHandler={resetHandler}></ForgotPasswordForm>;
};

export default ForgotPasswordPage;

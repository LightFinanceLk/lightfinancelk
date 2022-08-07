import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import ForgotPasswordForm from "../../components/form/forms/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData && storedUserData.token) {
      dispatch(authActions.login(storedUserData));
      navigate("/");
    }
  }, []);

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

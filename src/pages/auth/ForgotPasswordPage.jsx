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
  }, [dispatch, navigate]);

  const resetHandler = async (formData) => {
    try {
      const res = await authApi.resetPassword(JSON.stringify(formData));
      if (res) {
        navigate("/login");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return <ForgotPasswordForm submitHandler={resetHandler}></ForgotPasswordForm>;
};

export default ForgotPasswordPage;

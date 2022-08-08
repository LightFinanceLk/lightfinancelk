import { useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import LoginForm from "../../components/form/forms/LoginForm";
import { useEffect } from "react";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData && storedUserData.token) {
      dispatch(authActions.login(storedUserData));
      navigate("/");
    }
  }, [dispatch, navigate]);

  const loginHandler = async (formData) => {
    try {
      const res = await authApi.login(JSON.stringify(formData));
      if (res.data) {
        // TODO validate res to res.length
        dispatch(authActions.login(res.data));
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <LoginForm submitHandler={loginHandler}></LoginForm>;
};

export default LoginPage;

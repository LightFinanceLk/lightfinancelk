import { useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import LoginForm from "../../components/form/forms/LoginForm";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = (formData) => {
    console.log(formData);
    const login = async (formData) => {
      try {
        const res = await authApi.login(JSON.stringify(formData));
        if (res) {
          // TODO validate res to res.length
          dispatch(authActions.login(res.data));
          navigate("/");
        }
      } catch (e) {
        console.log(e);
      }
    };
    login(formData);
  };

  return <LoginForm submitHandler={loginHandler}></LoginForm>;
};

export default LoginPage;

import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import LoginForm from "../../components/form/forms/LoginForm";

const LoginPage = () => {
  const dispatch = useDispatch();

  const loginHandler = (event) => {
    dispatch(authActions.login());
  };

  return <LoginForm submitHandler={loginHandler}></LoginForm>;
};

export default LoginPage;

import { useNavigate } from "react-router-dom";
import userApi from "../../api/userApi";
import { authActions } from "../../store/auth";
import UpdatePasswordForm from "../../components/form/forms/auth/UpdatePasswordForm";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

const InitPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.id);

  // useState(()=>{

  // },[id])

  const resetHandler = async (formData) => {
    console.log(id);
    try {
      const res = await userApi.updatePassword(id, JSON.stringify(formData));
      if (res) {
        dispatch(authActions.initPassword(false));
        localStorage.setItem(
          "lf-user",
          JSON.stringify({
            token: res.data.token,
            expiry: Date.now() + 3600000,
          })
        );
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {id && (
        <UpdatePasswordForm
          changePasswordHandler={resetHandler}
        ></UpdatePasswordForm>
      )}
    </>
  );
};

export default InitPasswordPage;

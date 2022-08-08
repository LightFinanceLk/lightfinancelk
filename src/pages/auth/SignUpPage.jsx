import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import authApi from "../../api/authApi";
import SignUpForm from "../../components/form/forms/SignUpForm";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData && storedUserData.token) {
      dispatch(authActions.login(storedUserData));
      navigate("/");
    }
  }, []);
  // const [formData, setFormData] = useState({});

  // useEffect(() => {
  //   if (!(formData && Object.keys(formData).length === 0)) {
  //     // console.log("formData", formData);
  //     const signUp = async () => {
  //       try {
  //         const results = await authApi.signUp(JSON.stringify(formData));
  //         if (results) {
  //           console.log(results);
  //         }
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     };
  //     signUp();
  //   }
  // }, [formData]);

  const signUpHandler = (formData) => {
    const login = async (formData) => {
      try {
        // console.log("data", formData);
        // const dob = formData.dob.format("YYYY-MM-DD");
        // // const age = moment().diff(dob, "years", false);
        // formData = { ...formData, dob };
        // console.log(formData);
        const res = await authApi.signUp(JSON.stringify(formData));
        if (res) {
          // console.log(res);
          navigate("/dashboard");
          dispatch(authActions.login(res.data.token));
        }
      } catch (e) {
        console.log(e);
      }
    };
    login(formData);
  };

  return (
    <div>
      <SignUpForm submitHandler={signUpHandler} />
    </div>
  );
};

export default SignUpPage;

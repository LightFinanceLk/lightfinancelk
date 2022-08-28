import React from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import { message } from "antd";
import CreateAdvisorForm from "../../components/form/forms/advisor/CreateAdvisorForm";

const CreateAdvisor = () => {
  const navigate = useNavigate();

  const createAdvisorHandler = async (formData) => {
    let data = {
      ...formData,
      occupation: "advisor",
      initPassword: true,
      role: "1974",
    };
    try {
      const res = await authApi.signUp(JSON.stringify(data));
      if (res) {
        navigate("/");
        message.success({
          content:
            "Advisor account is created successfully. The password is emailed.",
          duration: 6,
        });
      }
    } catch (e) {
      let errorMsg = e.response.data.match(/(?<=Error).*?(?=<br>)/);
      message.error({
        content: errorMsg[0].replace(": ", ""),
        duration: 6,
      });
    }
  };

  return (
    <div>
      <CreateAdvisorForm submitHandler={createAdvisorHandler} />
    </div>
  );
};

export default CreateAdvisor;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AdvisorDetails from "../../../components/advisor/AdvisorDetails";

const DashboardAdvisor = () => {
  const userId = useSelector((state) => state.auth.userId);
  return (
    <div>
      <AdvisorDetails aid={userId}></AdvisorDetails>
    </div>
  );
};

export default DashboardAdvisor;

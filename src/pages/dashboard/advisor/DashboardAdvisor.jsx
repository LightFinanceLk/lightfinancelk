import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AdvisorDetails from "../../../components/advisor/AdvisorDetails";

const DashboardAdvisor = () => {
  const userId = useSelector((state) => state.auth.userId);
  return (
    <div>
      <AdvisorDetails aid={userId}></AdvisorDetails>
      <NavLink to="/meetings">
        <span className="nav-link px-2 link-secondary">Meetings</span>
      </NavLink>
    </div>
  );
};

export default DashboardAdvisor;

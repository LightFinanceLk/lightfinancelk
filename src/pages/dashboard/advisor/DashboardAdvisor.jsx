import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AdvisorDetails from "../../../components/advisor/AdvisorDetails";
import AdvisorMeetings from "./AdvisorMeetings";

const DashboardAdvisor = () => {
  const userId = useSelector((state) => state.auth.userId);
  return (
    <div>
      <AdvisorDetails aid={userId}></AdvisorDetails>
      <NavLink to="/meetings">
        <span className="btn px-2 btn-outline-secondary">View Meetings</span>
      </NavLink>
      <AdvisorMeetings />
    </div>
  );
};

export default DashboardAdvisor;

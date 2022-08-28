import React from "react";
import AdminAdvisorCard from "./AdminAdvisorCard";
import AdminClientCard from "./AdminClientCard";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const DashboardAdmin = () => {
  return (
    <div className="lf-dashboard">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            <NavLink to="/advisor/create">
              <span className="btn btn-outline-secondary">
                <FontAwesomeIcon icon={faPlus} /> Add Advisor
              </span>
            </NavLink>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="lf-dashboard__card">
              <div className="lf-dashboard__card-title">Available Advisors</div>
              <div className="lf-dashboard__card-content">
                <AdminAdvisorCard></AdminAdvisorCard>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="lf-dashboard__card">
              <div className="lf-dashboard__card-title">New Clients</div>
              <div className="lf-dashboard__card-content">
                <AdminClientCard></AdminClientCard>
              </div>
            </div>
          </div>
          {/* <div className="col-sm-4">
        <div className="lf-dashboard__card">
          <div className="lf-dashboard__card-title">Last Records</div>
          <div className="lf-dashboard__card-content">Content</div>
        </div>
      </div> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;

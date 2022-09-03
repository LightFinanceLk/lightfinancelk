import React, { useState, useEffect } from "react";
import AdminAdvisorCard from "./AdminAdvisorCard";
import AdminClientCard from "./AdminClientCard";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AdvisorAssignCard from "./AdvisorAssignCard";
import userApi from "../../../api/userApi";
import { message } from "antd";
import moment from "moment";

const DashboardAdmin = () => {
  const [clients, setClients] = useState([]);
  const [advisors, setAdvisors] = useState([]);

  const getAdvisors = async () => {
    try {
      const res = await userApi.getUsersByUserRole("1974");
      if (res.data) {
        const advisors = res.data.users;
        const advisorsArr = advisors.map((user, index) => {
          const advisor = user.user;
          const age = moment().diff(advisor.dob, "years", false);
          return {
            ...advisor,
            key: index,
            name: `${advisor.firstName} ${advisor.lastName}`,
            noOfClients: 0,
            noOfMeetings: 0,
            age,
            link: `/user/${advisor._id}`,
          };
        });
        setAdvisors(advisorsArr);
      }
    } catch (e) {
      // console.log(e);
      message.error({
        content: "Fetching advisors failed.",
        duration: 6,
      });
    }
  };

  const getClients = async () => {
    try {
      const res = await userApi.getUsersByUserRole("2022");
      if (res.data) {
        const clients = res.data.users;
        const clientsArr = clients.map((user, index) => {
          const client = user.user;
          const age = moment().diff(client.dob, "years", false);
          return {
            ...client,
            key: index,
            name: `${client.firstName} ${client.lastName}`,
            noOfClients: 0,
            noOfMeetings: 0,
            age,
            link: `/user/${client._id}`,
          };
        });
        setClients(clientsArr);
      }
    } catch (e) {
      // console.log(e);
      message.error({
        content: "Fetching clients failed.",
        duration: 6,
      });
    }
  };

  useEffect(() => {
    getClients();
    getAdvisors();
  }, []);

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
          <div className="col-sm-12">
            <div className="lf-dashboard__card">
              <div className="lf-dashboard__card-title">New Clients</div>
              <div className="lf-dashboard__card-content">
                <AdvisorAssignCard
                  advisors={advisors}
                  clients={clients}
                  getClients={getClients}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="lf-dashboard__card">
              <div className="lf-dashboard__card-title">Advisors</div>
              <div className="lf-dashboard__card-content">
                <AdminAdvisorCard advisors={advisors} />
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="lf-dashboard__card">
              <div className="lf-dashboard__card-title">Clients</div>
              <div className="lf-dashboard__card-content">
                <AdminClientCard clients={clients} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;

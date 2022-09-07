import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import "./AdvisorMeetings.scss";
import logo from "../../../assets/img/logo.png";
import { useEffect } from "react";
import userApi from "../../../api/userApi";
import { useState } from "react";

const AdvisorMeetings = () => {
  const userId = useSelector((state) => state.auth.userId);

  const [advisorMeetings, setAdvisorMeetings] = useState([]);

  const getUserMeetings = async (uId) => {
    try {
      const res = await userApi.getMeetingsByAdvisorId(uId);

      if (res.data) {
        console.log(res.data, "res data");
        const advisorMeetings = res.data.advisorMeetings;
        setAdvisorMeetings(advisorMeetings);
      }
      // if (res.data) {
      // }
    } catch (error) {}
  };

  useEffect(() => {
    getUserMeetings(userId);
  }, [userId]);

  return (
    <div className="lf-c-advisor-meetings">
      <div className="lf-c-advisor-meetings__meetings">
        <table className="table table-striped">
          <thead>
            <tr>
              <th colSpan={3}>Up Coming Meetings</th>
            </tr>
          </thead>
          <tbody>
            {advisorMeetings.map((meeting) => {
              if (meeting.userName) {
                return (
                  <tr>
                    <td style={{ width: "150px" }}>{meeting.date}</td>
                    <td style={{ width: "150px" }}>{meeting.time}</td>
                    <td style={{ width: "400px" }}>{meeting.userName}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdvisorMeetings;

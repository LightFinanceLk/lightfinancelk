import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/img/logo.png";
import userApi from "../../../api/userApi";
import "./AdvisorCard.scss";

const AdvisorCard = () => {
  const advisorId = useSelector((state) => state.user.advisor);
  const userId = useSelector((state) => state.auth.userId);

  const [advisorData, setAdvisorDate] = useState([]);
  const [advisorMeetings, setAdvisorMeetings] = useState([]);

  const getAdvisorData = async (aId) => {
    try {
      const res = await userApi.getDataByUserId(aId);
      if (res.data) {
        setAdvisorDate(res.data.user);
      }
    } catch (error) {}
  };

  const getUserMeetings = async (uId) => {
    try {
      const res = await userApi.getMeetingsByUserId(uId);
      if (res.data) {
        const advisorMeetings = res.data.userMeetings;
        setAdvisorMeetings(advisorMeetings);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAdvisorData(advisorId);
  }, [advisorId]);

  useEffect(() => {
    getUserMeetings(userId);
  }, [userId]);

  return (
    <>
      {advisorId ? (
        <div className="lf-c-advisor">
          <div className="lf-c-advisor__details">
            <figure>
              <img src={logo} alt="" className="rounded img-thumbnail" />
            </figure>
            <div>
              <p>
                {advisorData.firstName} {advisorData.lastName}
              </p>
              <p>{advisorData.headline}</p>
            </div>
          </div>
          <div className="lf-c-advisor__meetings">
            <table className="table table-sm table-striped">
              <thead>
                <tr>
                  <th colSpan={3}>Up Coming Meetings</th>
                </tr>
              </thead>
              <tbody>
                {advisorMeetings.map((meeting) => {
                  return (
                    <tr>
                      <td style={{ width: "80px" }}>{meeting.date}</td>
                      <td style={{ width: "120px" }}>{meeting.time}</td>
                      <td style={{ width: "calc(100% - 200px)" }}></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div>
            <NavLink to={`/advisor/${advisorId}`}>
              <span className="nav-link link-secondary lf-c-more-link">
                More
                <FontAwesomeIcon icon={faAngleDoubleRight} />
              </span>
            </NavLink>
          </div>
        </div>
      ) : (
        <p className="text-center">An advisor is yet to be assigned.</p>
      )}
    </>
  );
};

export default AdvisorCard;

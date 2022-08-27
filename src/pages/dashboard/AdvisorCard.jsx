import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleRight,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import "./AdvisorCard.scss";
import logo from "../../assets/img/logo.png";

const AdvisorCard = () => {
  return (
    <div className="lf-c-advisor">
      <div className="lf-c-advisor__details">
        <figure>
          <img src={logo} alt="" className="rounded img-thumbnail" />
        </figure>
        <div>
          <p>Mr. Saneera Silva BCS</p>
          <p>10 years experience in Financial Advisory</p>
        </div>
      </div>
      <div className="lf-c-advisor__meetings">
        <table class="table table-sm table-striped">
          <thead>
            <tr>
              <th colSpan={3}>Up Coming Meetings</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ width: "80px" }}>2022/08/23</td>
              <td style={{ width: "120px" }}>12:00PM-13:00PM</td>
              <td style={{ width: "calc(100% - 200px)" }}>
                Initial Discussion Initial Discussion Discussion
              </td>
            </tr>
            <tr>
              <td>2022/08/23</td>
              <td>12:00PM-13:00PM</td>
              <td>Initial Discussion</td>
            </tr>
            <tr>
              <td>2022/08/23</td>
              <td>12:00PM-13:00PM</td>
              <td>Initial Discussion</td>
            </tr>
            <tr>
              <td>2022/08/23</td>
              <td>12:00PM-13:00PM</td>
              <td>Initial Discussion</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <NavLink to="/advisor">
          <span className="nav-link link-secondary lf-c-more-link">
            More
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdvisorCard;

import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import userApi from "../../api/userApi.js";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const AdvisorDetails = () => {
  const [userData, setUserData] = useState({});
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    const gerUserDataById = async (userId) => {
      try {
        const res = await userApi.getDataByUserId(userId);
        console.log(res, "res");
        if (res) {
          setUserData(res.data.user);
          if (
            userData.maritalStatus === "married" &&
            userData.gender === "female"
          ) {
            setUserData({ ...userData, nameTitle: "Mrs." });
          } else if (
            userData.maritalStatus === "single" &&
            userData.gender === "female"
          ) {
            setUserData({ ...userData, nameTitle: "Miss." });
          } else if (userData.gender === "female") {
            setUserData({ ...userData, nameTitle: "Mrs." });
          } else if (userData.gender === "male") {
            setUserData({ ...userData, nameTitle: "Mr." });
          }
          if (userData.phone) {
            const phoneLink = userData.phone.replace("0", "+94");
            setUserData({ ...userData, phoneLink });
          }
          if (userData.dob) {
            const age = moment().diff(userData.dob, "years", false);
            setUserData({ ...userData, age });
          }
        }
      } catch (e) {
        // console.log(e);
        message.error({
          content: "Error, User data was not fetched successfully.",
        });
      }
    };
    gerUserDataById(userId);
  }, [userId]);

  return (
    <div className="lf-advisor-detail">
      <div className="fluid-container">
        <div className="row">
          <div className="col-sm-2">
            <img src="..." className="img-thumbnail" alt="profile" />
          </div>
          <div className="col-sm-10">
            <h2>
              {userData.nameTitle} {userData.firstName} {userData.lastName}{" "}
              <small>{userData.title}</small>
              <a href={userData.linkedIn} target="_blank">
                <FontAwesomeIcon icon={faAngleRight} />
              </a>
            </h2>
            <h5> {userData.headline}</h5>
            <p>
              {userData.age}y {userData.city}
            </p>
            <p>
              <a href={`tel:${userData.phoneLink}`}> {userData.phone}</a>
            </p>
          </div>
          <div className="col-sm-12">
            <p>{userData.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorDetails;

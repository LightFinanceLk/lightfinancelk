import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import userApi from "../../api/userApi.js";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const AdvisorDetails = (props) => {
  const [userData, setUserData] = useState({});

  const getUserDataById = async (userId) => {
    try {
      const res = await userApi.getDataByUserId(userId);
      console.log(res.data);
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
        console.log(userData, "userData");
      }
    } catch (e) {
      // console.log(e);
      message.error({
        content: "Error, User data was not fetched successfully.",
      });
    }
  };

  useEffect(() => {
    const userId = props.aid;
    getUserDataById(userId);
  }, [props.aid]);

  return (
    <>
      {Object.keys(userData).length > 0 && (
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
                    <FontAwesomeIcon icon={faAngleRight} /> LinkedIn
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
      )}
    </>
  );
};

export default AdvisorDetails;

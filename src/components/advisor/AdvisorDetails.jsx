import React, { useEffect, useState } from "react";
import userApi from "../../api/userApi.js";
import moment from "moment";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faClose } from "@fortawesome/free-solid-svg-icons";
import ImageUpload from "../image-upload/ImageUpload.jsx";
import config from "../../config";
import linkedIn from "../../assets/img/linkedIn.png";
import "./AdvisorDetails.scss";

const AdvisorDetails = (props) => {
  const currentUserId = useSelector((state) => state.auth.userId);

  const [userData, setUserData] = useState({});
  const [showImageInput, setShowImageInput] = useState(true);
  const [editor, setEditor] = useState(false);

  const getUserDataById = async (userId) => {
    try {
      const res = await userApi.getDataByUserId(userId);
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
    }
  };

  useEffect(() => {
    const userId = props.aid;
    setEditor(userId === currentUserId);
    getUserDataById(userId);
    console.log(userData.image !== "");
    setShowImageInput(userData.image === "");
  }, [props]);

  return (
    <>
      {Object.keys(userData).length > 0 && (
        <div className="lf-advisor-detail">
          <div className="fluid-container">
            <div className="row">
              <div className="col-sm-2">
                <div className="lf-profile-image">
                  {showImageInput && editor ? (
                    <div className="lf-profile-image__control">
                      <ImageUpload />
                      <button
                        className="btn btn-outline-secondary lf-profile-image__control-btn"
                        onClick={() => {
                          setShowImageInput(false);
                        }}
                      >
                        <FontAwesomeIcon icon={faClose} />
                      </button>
                    </div>
                  ) : (
                    <div className="lf-profile-image__control">
                      <img
                        src={`${config.api.BASE_URL}/${userData.image}`}
                        alt=""
                      />
                      {editor && (
                        <button
                          className="btn btn-outline-secondary  lf-profile-image__control-btn"
                          onClick={() => {
                            setShowImageInput(true);
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-sm-10">
                <div className="lf-advisor-detail__content">
                  <h2>
                    {userData.nameTitle} {userData.firstName}{" "}
                    {userData.lastName} <small>{userData.title}</small>
                  </h2>
                  {userData.linkedIn && (
                    <a href={userData.linkedIn} target="_blank">
                      <img src={linkedIn} alt="" className=" img-fluid" />
                    </a>
                  )}
                  {userData.headline && <h5> {userData.headline}</h5>}
                  <p>
                    {userData.age && `${userData.age}y `}
                    {userData.city && userData.city}
                  </p>
                  {userData.phone && (
                    <p>
                      <a href={`tel:${userData.phoneLink}`}>{userData.phone}</a>
                    </p>
                  )}
                </div>
              </div>
              <div className="offset-sm-2 col-sm-10">
                {userData.description && (
                  <div className="lf-advisor-detail__content">
                    <p>{userData.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdvisorDetails;

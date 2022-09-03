import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import meetingApi from "../../api/meetingApi";
import "./Meeting.scss";

const Meeting = (props) => {
  const [meeting, setMeeting] = useState({});

  useEffect(() => {
    if (props) {
      setMeeting({
        meetingId: props.meetingId,
        advisorId: props.advisorId,
        time: props.time,
        date: props.date,
        isDisabled: props.disabled,
        isBooked: props.isBooked,
        isUpdated: false,
      });
    }
  }, [props]);

  const saveMeeting = async (m) => {
    let updatedMeeting = m;
    updatedMeeting.isUpdated = undefined;
    updatedMeeting.isBooked = undefined;
    try {
      const res = await meetingApi.createMeeting(updatedMeeting);
      if (res.data) {
        props.getMeetingsByAdvisorId();
      }
    } catch (error) {}
  };

  const deleteMeeting = async (m) => {
    try {
      const res = await meetingApi.deleteMeeting(m.meetingId);
      if (res.data) {
        props.getMeetingsByAdvisorId();
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (meeting.isUpdated) {
      if (meeting.meetingId === "") {
        saveMeeting(meeting);
      } else if (meeting.meetingId !== "") {
        deleteMeeting(meeting);
      }
      meeting.isUpdated = false;
    }
  }, [meeting]);

  const handleOnClick = () => {
    setMeeting({
      ...meeting,
      isDisabled: !meeting.isDisabled,
      isUpdated: true,
    });
  };
  return (
    <>
      {!meeting.isBooked && (
        <div className="lf-meeting__time">
          <button
            className={`btn btn-outline-primary ${
              meeting.isDisabled ? "opacity-25" : ""
            }`}
            onClick={handleOnClick}
          >
            {true ? meeting.time : <Link to="/">{meeting.time}</Link>}
          </button>
        </div>
      )}
    </>
  );
};

export default Meeting;

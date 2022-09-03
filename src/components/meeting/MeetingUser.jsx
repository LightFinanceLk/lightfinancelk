import React, { useEffect, useState } from "react";
import meetingApi from "../../api/meetingApi";
import "./Meeting.scss";

const Meeting = (props) => {
  const [meeting, setMeeting] = useState({});

  useEffect(() => {
    if (props) {
      setMeeting({
        meetingId: props.meetingId,
        advisorId: props.advisorId,
        userId: props.userId,
        time: props.time,
        date: props.date,
        isDisabled: props.disabled,
        isUpdated: false,
        role: meeting.role,
        userBooked: props.userBooked,
        userName: props.userName,
      });
    }
  }, [props]);

  const saveMeeting = async (m) => {
    let updatedMeeting = m;
    updatedMeeting.isUpdated = undefined;
    updatedMeeting.userBooked = undefined;
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
      userId: meeting.userId,
      userName: meeting.userName,
      isUpdated: true,
    });
  };

  return (
    <>
      {!meeting.isDisabled && (
        <div className="lf-meeting__time">
          <button
            className={`btn ${
              meeting.isDisabled ? "btn-outline-primary opacity-25" : ""
            } ${
              meeting.userBooked
                ? "btn-primary opacity-75"
                : "btn-outline-primary"
            }`}
            onClick={handleOnClick}
          >
            {meeting.time}
          </button>
        </div>
      )}
    </>
  );
};

export default Meeting;

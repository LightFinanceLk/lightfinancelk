import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import MeetingUser from "./MeetingUser";
import userApi from "../../api/userApi";
import "./Meetings.scss";

const MeetingsUser = () => {
  const role = useSelector((state) => state.auth.role);
  const userId = useSelector((state) => state.auth.userId);
  const advisorId = useSelector((state) => state.user.advisor);
  const userFirstName = useSelector((state) => state.user.firstName);
  const userLastName = useSelector((state) => state.user.lastName);

  const [dates, setDates] = useState([]);
  const [disabledDateTimes, setDisabledDateTimes] = useState([]);
  const [filledDateTimes, setFilledDateTimes] = useState([]);
  const [userBookedDateTimes, setUserBookedDateTimes] = useState([]);
  const [advisorMeetings, setAdvisorMeetings] = useState([]);

  const getMeetingsByAdvisorId = async () => {
    try {
      const res = await userApi.getMeetingsByAdvisorId(advisorId);
      if (res.data) {
        setAdvisorMeetings(res.data.advisorMeetings);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getMeetingsByAdvisorId();
    const days = [];
    let daysStartIndex = 0;
    const today = moment();
    if (today.day() === 6) {
      daysStartIndex = 2;
    }
    if (today.day() === 0) {
      daysStartIndex = 1;
    }
    for (let i = daysStartIndex; i < daysStartIndex + 14; i++) {
      let date = moment().add(i, "days");
      if (!(date.day() === 6 || date.day() === 0)) {
        days.push(date.format("Do MMM YYYY"));
      }
    }
    setDates(days);
  }, []);

  useEffect(() => {
    const disabled = [];
    const filled = [];
    const userBooked = [];
    advisorMeetings.map((m) => {
      if (m.isDisabled) {
        disabled.push(`${m.date}T${m.time}`);
      }
      if (m.userId && m.userId !== userId) {
        filled.push(`${m.date}T${m.time}`);
      }
      if (m.userId && m.userId === userId) {
        userBooked.push(`${m.date}T${m.time}U${m._id}`);
      }
    });
    if (disabled.length === 0) {
      setDisabledDateTimes([""]);
    } else {
      setDisabledDateTimes([...disabled]);
    }
    if (filled.length === 0) {
      setFilledDateTimes([""]);
    } else {
      setFilledDateTimes([...filled]);
    }
    if (userBooked.length === 0) {
      setUserBookedDateTimes([""]);
    } else {
      setUserBookedDateTimes([...userBooked]);
    }
  }, [advisorMeetings]);

  let times = [
    "9am-10am",
    "10am-11am",
    "11am-12pm",
    "2pm-3pm",
    "3pm-4pm",
    "4pm-5pm",
  ];

  return (
    <>
      {dates.length && dates.length > 0 && disabledDateTimes.length > 0 && (
        <div className="lf-meetings__wrapper">
          {dates.map((date, i) => {
            return (
              <>
                <div className="lf-meeting">
                  <div className="lf-meeting__date">
                    <p>{date}</p>
                  </div>
                  <div className="lf-meeting__time-wrapper">
                    {times.map((time) => {
                      let timeDisabled = false;
                      let userBooked = false;
                      let meetingId = "";
                      if (
                        disabledDateTimes.findIndex((d) => {
                          return (
                            date === d.split("T")[0] && time === d.split("T")[1]
                          );
                        }) > -1 ||
                        filledDateTimes.findIndex((d) => {
                          return (
                            date === d.split("T")[0] && time === d.split("T")[1]
                          );
                        }) > -1
                      ) {
                        timeDisabled = true;
                      }
                      if (
                        userBookedDateTimes.findIndex((d) => {
                          return (
                            date === d.split("T")[0] &&
                            time === d.split("T")[1].split("U")[0]
                          );
                        }) > -1
                      ) {
                        userBooked = true;
                        userBookedDateTimes.findIndex((d) => {
                          if (
                            date === d.split("T")[0] &&
                            time === d.split("T")[1].split("U")[0]
                          ) {
                            meetingId = d.split("T")[1].split("U")[1];
                          }
                        });
                      }
                      return (
                        <MeetingUser
                          role={role}
                          time={time}
                          advisorId={advisorId}
                          userId={userId}
                          userName={`${userFirstName} ${userLastName}`}
                          date={date}
                          meetingId={meetingId}
                          disabled={timeDisabled}
                          userBooked={userBooked}
                          getMeetingsByAdvisorId={getMeetingsByAdvisorId}
                        />
                      );
                    })}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      )}
    </>
  );
};

export default MeetingsUser;

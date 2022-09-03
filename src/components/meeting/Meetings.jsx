import React, { useEffect } from "react";
import moment from "moment";
import "./Meetings.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import Meeting from "../../components/meeting/Meeting";
import userApi from "../../api/userApi";

const Meetings = () => {
  const role = useSelector((state) => state.auth.role);
  const userId = useSelector((state) => state.auth.userId);

  const [dates, setDates] = useState([]);
  const [disabledDateTimes, setDisabledDateTimes] = useState([]);
  const [filledDateTimes, setFilledDateTimes] = useState([]);
  const [advisorMeetings, setAdvisorMeetings] = useState([]);

  const getMeetingsByAdvisorId = async () => {
    try {
      const res = await userApi.getMeetingsByAdvisorId(userId);
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
    console.log(advisorMeetings);
    advisorMeetings.map((m) => {
      if (m.isDisabled) {
        disabled.push(`${m.date}T${m.time}U${m._id}`);
      }
      if (m.userId && m.userId !== "") {
        filled.push(`${m.date}T${m.time}`);
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
    console.log(disabled, "disabled");
    console.log(filled, "filled");
    console.log(disabledDateTimes, "disabledDateTimes");
    console.log(filledDateTimes, "filledDateTimes");
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
      {dates.length && dates.length > 0 && (
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
                      let isBooked = false;
                      let meetingId = "";
                      if (
                        disabledDateTimes.findIndex((d) => {
                          return (
                            date === d.split("T")[0] &&
                            time === d.split("T")[1].split("U")[0]
                          );
                        }) > -1
                      ) {
                        timeDisabled = true;
                        disabledDateTimes.findIndex((d) => {
                          if (
                            date === d.split("T")[0] &&
                            time === d.split("T")[1].split("U")[0]
                          ) {
                            meetingId = d.split("T")[1].split("U")[1];
                          }
                        });
                      }
                      if (
                        filledDateTimes.findIndex((d) => {
                          return (
                            date === d.split("T")[0] && time === d.split("T")[1]
                          );
                        }) > -1
                      ) {
                        isBooked = true;
                      }
                      return (
                        <Meeting
                          role={role}
                          time={time}
                          advisorId={userId}
                          date={date}
                          meetingId={meetingId}
                          disabled={timeDisabled}
                          isBooked={isBooked}
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

export default Meetings;

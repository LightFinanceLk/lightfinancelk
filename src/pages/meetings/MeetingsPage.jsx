import React from "react";
import "./MeetingsPage.scss";
import Meetings from "../../components/meeting/Meetings";

const MeetingsPage = () => {
  return (
    <div className="lf-meetings-page">
      <h3>Meetings</h3>
      <p>Enable or Disable meetings</p>
      <Meetings />
    </div>
  );
};

export default MeetingsPage;

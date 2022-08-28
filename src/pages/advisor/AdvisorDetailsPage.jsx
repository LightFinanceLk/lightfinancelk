import React from "react";
import AdvisorDetails from "../../components/advisor/AdvisorDetails";

const AdvisorDetailsPage = () => {
  return (
    <div className="lf-detail-page">
      <AdvisorDetails></AdvisorDetails>
      <div className="fluid-container">
        <div className="row">
          <div className="col-sm-12">
            <div className="lf-detail-page__meetings">
              <h4>Meetings</h4>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="lf-detail-page__clients">
              <h4>Clients</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorDetailsPage;

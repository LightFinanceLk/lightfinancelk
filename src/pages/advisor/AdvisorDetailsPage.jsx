import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AdvisorClients from "../../components/advisor/AdvisorClients";
import AdvisorDetails from "../../components/advisor/AdvisorDetails";
import MeetingsUser from "../../components/meeting/MeetingsUser";

const AdvisorDetailsPage = () => {
  const role = useSelector((state) => state.auth.role);
  const { aid } = useParams();
  return (
    <div className="lf-detail-page">
      <AdvisorDetails aid={aid}></AdvisorDetails>
      {role === "1974" && (
        <div className="fluid-container">
          <div className="row">
            <div className="col-sm-6">
              <div className="lf-detail-page__meetings">
                <h5>Up Coming Meetings</h5>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="lf-detail-page__clients">
                <h5>Clients</h5>
                <AdvisorClients aid={aid}></AdvisorClients>
              </div>
            </div>
          </div>
        </div>
      )}
      {role === "2022" && (
        <div className="fluid-container">
          <div className="row">
            <div className="col-sm-12">
              <div className="lf-detail-page__clients">
                <h5>Schedule A Meeting</h5>
                <MeetingsUser />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvisorDetailsPage;

import { useParams } from "react-router-dom";
import AdvisorClients from "../../components/advisor/AdvisorClients";
import AdvisorDetails from "../../components/advisor/AdvisorDetails";

const AdvisorDetailsPage = () => {
  const { aid } = useParams();
  return (
    <div className="lf-detail-page">
      <AdvisorDetails aid={aid}></AdvisorDetails>
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
    </div>
  );
};

export default AdvisorDetailsPage;

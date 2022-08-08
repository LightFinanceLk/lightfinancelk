import React from "react";

const Dashboard = (props) => {
  return (
    <>
      <section className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="account">
              <div className="account__icon">
                <img
                  className="img-fluid"
                  width="40px"
                  src="https://d29fhpw069ctt2.cloudfront.net/icon/image/73642/preview.svg"
                  alt=""
                />
              </div>
              <div className="account__details">
                <div className="account__name">Cash</div>
                <div className="account__amount">LKR 100,000.00</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="row">
          <div className="col-sm-4">
            <div className="card">
              <div className="card__title">Dashboard</div>
              <div className="card__details">
                <img
                  className="img-fluid"
                  src="https://image.shutterstock.com/image-photo/business-concept-growth-success-process-600w-1483995179.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;

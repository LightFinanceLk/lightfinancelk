import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import recordApi from "../../api/recordApi";
import CreateRecordForm from "../../components/form/forms/record/CreateRecordForm";

const CreateRecordPage = () => {
  const { aid } = useParams();
  const navigate = useNavigate();

  const uAccounts = useSelector((state) => state.account.accounts);

  const [userAccounts, setUserAccounts] = useState([]);

  useEffect(() => {
    setUserAccounts(uAccounts);
  }, [uAccounts]);

  const submitHandler = async (data) => {
    if (data.recordType === "expense") {
      data.amount = Math.abs(data.amount) * -1;
    } else {
      data.amount = Math.abs(data.amount);
    }
    try {
      const res = await recordApi.createRecord(JSON.stringify(data));
      if (res) {
        navigate(`/account/${aid}`);
        message.success({
          content: "Your record is created successfully.",
        });
      }
    } catch (e) {
      let errorMsg = e.response.data.match(/(?<=Error).*?(?=<br>)/);
      message.error({
        content: errorMsg[0].replace(": ", ""),
      });
    }
  };
  return (
    <>
      {userAccounts !== [] && (
        <div className="lf-accounts">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-3">
                <div className="lf-accounts__left justify-content-start d-flex">
                  <NavLink to={`/account/${aid}`}>
                    <span className="btn btn-outline-secondary btn-sm me-3">
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </span>
                  </NavLink>
                  <h3>Records</h3>
                </div>
              </div>
              <div className="col-sm-9">
                <div className="lf-accounts__right">
                  <CreateRecordForm
                    aid={aid}
                    submitHandler={submitHandler}
                    userAccounts={userAccounts}
                  ></CreateRecordForm>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateRecordPage;

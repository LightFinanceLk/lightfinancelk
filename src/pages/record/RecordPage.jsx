import React, { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import recordApi from "../../api/recordApi";
import UpdateRecordForm from "../../components/form/forms/record/UpdateRecordForm";

const RecordPage = () => {
  const navigate = useNavigate();
  const { rid } = useParams();
  const [record, setRecord] = useState({});

  const getRecord = async () => {
    try {
      const res = await recordApi.getRecordsById(rid);
      if (res.data) {
        setRecord(res.data.record);
      }
    } catch (e) {
      // console.log(e);
    }
  };

  useEffect(() => {
    getRecord();
  }, [rid]);

  const submitHandler = async (data) => {
    try {
      const res = await recordApi.updateRecord(data, rid);
      if (res.data) {
        navigate(`/account/${record.accountId}`);
      }
    } catch (e) {
      // console.log(e);
    }
  };

  return (
    <>
      {record && (
        <div className="lf-accounts">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-3">
                <div className="lf-accounts__left justify-content-start d-flex">
                  <NavLink to={`/account/${record.accountId}`}>
                    <span className="btn btn-outline-secondary btn-sm me-3">
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </span>
                  </NavLink>
                  <h3>Records</h3>
                </div>
              </div>
              <div className="col-sm-9">
                <div className="lf-accounts__right">
                  <UpdateRecordForm
                    initialValues={record}
                    submitHandler={submitHandler}
                  ></UpdateRecordForm>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecordPage;

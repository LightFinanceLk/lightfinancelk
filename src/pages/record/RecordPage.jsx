import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CreateRecordForm from "../../components/form/forms/record/CreateRecordForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import recordApi from "../../api/recordApi";
import { message, notification } from "antd";
import "./Records.scss";
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
    console.log(data, "record");
    // if (data.recordType === "expense") {
    //   data.amount = Math.abs(data.amount) * -1;
    // } else {
    //   data.amount = Math.abs(data.amount);
    // }
    // try {
    //   const res = await recordApi.createRecord(JSON.stringify(data));
    //   if (res) {
    //     navigate(`/account/${aid}`);
    //     message.success({
    //       content: "Your record is created successfully.",
    //     });
    //   }
    // } catch (e) {
    //   let errorMsg = e.response.data.match(/(?<=Error).*?(?=<br>)/);
    //   message.error({
    //     content: errorMsg[0].replace(": ", ""),
    //     duration: 5,
    //   });
    // }
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
                    // userAccounts={userAccounts}
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

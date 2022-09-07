import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import accountApi from "../../api/accountApi";
import { message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import EditAccountForm from "../../components/form/forms/account/EditAccountForm";

const EditAccountPage = () => {
  const { aid } = useParams();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);

  const [account, setAccount] = useState(null);

  const submitHandler = async (data) => {
    try {
      const res = await accountApi.updateAccount(aid, JSON.stringify(data));
      if (res) {
        navigate(`/account/${aid}`);
        message.success({
          content: "Your account is updated successfully.",
        });
      }
    } catch (e) {
      let errorMsg = e.response.data.match(/(?<=Error).*?(?=<br>)/);
      message.error({
        content: errorMsg[0].replace(": ", ""),
        duration: 6,
      });
    }
  };

  useEffect(() => {
    getAccounts(aid);
  }, [userId, aid]);

  const getAccounts = async (uId) => {
    try {
      const res = await accountApi.getAccountById(uId);
      if (res.data) {
        setAccount(res.data.account);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className="lf-accounts">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3">
            <div className="lf-accounts__left">
              <h3>Accounts</h3>
              <NavLink to={`/account/${aid}`}>
                <span className="btn btn-outline-secondary">
                  <FontAwesomeIcon icon={faChevronLeft} /> Back
                </span>
              </NavLink>
            </div>
          </div>
          <div className="col-sm-9">
            <div className="lf-accounts__right">
              <EditAccountForm
                initialValues={account}
                submitHandler={submitHandler}
              ></EditAccountForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAccountPage;

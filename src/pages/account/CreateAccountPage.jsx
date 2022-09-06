import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import accountApi from "../../api/accountApi";
import { message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import CreateAccountForm from "../../components/form/forms/account/CreateAccountForm";

const CreateAccountPage = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);
  const submitHandler = async (data) => {
    try {
      const res = await accountApi.createAccount(userId, JSON.stringify(data));
      if (res) {
        navigate("/account");
        message.success({
          content: "Your account is created successfully.",
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
  return (
    <div className="lf-accounts">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3">
            <div className="lf-accounts__left justify-content-start d-flex">
              <NavLink to="/account">
                <span className="btn btn-outline-secondary btn-sm me-3">
                  <FontAwesomeIcon icon={faChevronLeft} />
                </span>
              </NavLink>
              <h3>Accounts</h3>
            </div>
          </div>
          <div className="col-sm-9">
            <div className="lf-accounts__right">
              <CreateAccountForm
                submitHandler={submitHandler}
              ></CreateAccountForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPage;

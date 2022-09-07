import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { accountActions } from "../../store/account";
import userApi from "../../api/userApi";
import accountApi from "../../api/accountApi";
import CreateAccountForm from "../../components/form/forms/account/CreateAccountForm";

const CreateAccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);

  const setAccountData = async () => {
    try {
      const res = await userApi.getAccountsByUserId(userId);
      if (res.data) {
        dispatch(accountActions.getAccounts(res.data.userAccount));
      }
    } catch (error) {}
  };

  const submitHandler = async (data) => {
    try {
      const res = await accountApi.createAccount(userId, JSON.stringify(data));
      if (res) {
        setAccountData();
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

import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faPenToSquare,
  faTrashCan,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { message, Popconfirm } from "antd";
import Account from "../../components/account/Account";
import accountApi from "../../api/accountApi";
import AccountRecords from "./AccountRecords";
import "./Account.scss";

const AccountPage = () => {
  const { aid } = useParams();
  const userId = useSelector((state) => state.auth.userId);

  const [account, setAccount] = useState(null);

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

  const confirm = async (e) => {
    try {
      const res = await accountApi.deleteAccount(aid);
      if (res.data) {
        message.success({
          content: "Your account is deleted successfully.",
        });
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const cancel = (e) => {
    console.log(e);
  };

  useEffect(() => {
    getAccounts(aid);
  }, [userId, aid]);

  return (
    <>
      {account && (
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
                  <div className="lf-accounts__buttons">
                    <NavLink to={`/account/edit/${aid}`}>
                      <span className="btn btn-outline-secondary mb-4">
                        <FontAwesomeIcon icon={faPenToSquare} /> Edit
                      </span>
                    </NavLink>
                    <Popconfirm
                      title="Are you sure to delete this account?"
                      onConfirm={confirm}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <span className="btn btn-danger mb-4 ms-4 text-light">
                        <FontAwesomeIcon icon={faTrashCan} className="me-1" />
                        Delete
                      </span>
                    </Popconfirm>
                  </div>
                  <Account account={account} />
                  <div className="lf-accounts__buttons">
                    <NavLink to={`/record/create/${aid}`}>
                      <span className="btn btn-outline-secondary mb-4 mt-4">
                        <FontAwesomeIcon icon={faPlus} /> Create Record
                      </span>
                    </NavLink>
                    <NavLink to={`/record/create-bulk-record`}>
                      <span className="btn btn-outline-secondary mb-4 mt-4 ms-4">
                        <FontAwesomeIcon icon={faPlus} /> Create Bulk Record
                      </span>
                    </NavLink>
                  </div>
                  <div className="lf-accounts__records">
                    <AccountRecords aid={aid} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountPage;

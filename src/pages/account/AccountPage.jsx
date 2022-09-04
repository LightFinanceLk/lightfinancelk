import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { message, Popconfirm } from "antd";
import Account from "../../components/account/Account";
import accountApi from "../../api/accountApi";
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

  const confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
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
                <div className="lf-accounts__left">
                  <h3>Accounts</h3>
                  <NavLink to="/account">
                    <span className="btn btn-outline-secondary">
                      <FontAwesomeIcon icon={faChevronLeft} /> Back
                    </span>
                  </NavLink>
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

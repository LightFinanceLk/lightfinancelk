import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import userApi from "../../api/userApi";
import BulkRecord from "../../components/bulk-record/BulkRecord";

const BulkRecordListPage = () => {
  const userId = useSelector((state) => state.auth.userId);
  const [userAccounts, setUserAccounts] = useState([]);

  const getUserAccounts = async () => {
    try {
      const res = await userApi.getAccountsByUserId(userId);
      if (res.data) {
        setUserAccounts(res.data.userAccount);
      }
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    getUserAccounts();
  }, [userId]);
  return (
    <>
      {userAccounts && (
        <div className="lf-accounts">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-3">
                <div className="lf-accounts__left d-flex align-items-center flex-column">
                  <h3>Bulk Records</h3>
                  <NavLink to="/record/create-bulk-record">
                    <span className="btn btn-outline-secondary">
                      <FontAwesomeIcon icon={faPlus} /> Add Bulk Record
                    </span>
                  </NavLink>
                </div>
              </div>
              <div className="col-sm-9">
                <div className="lf-accounts__right">
                  {userAccounts.map((account) => {
                    return (
                      <BulkRecord
                        account={account}
                        getUserAccounts={getUserAccounts}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkRecordListPage;

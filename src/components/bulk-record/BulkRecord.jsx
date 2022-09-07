import React, { useEffect, useState } from "react";
import moment from "moment";
import { Popconfirm, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill1Wave,
  faMoneyCheckAlt,
  faCreditCard,
  faPiggyBank,
  faCarBurst,
  faSackDollar,
  faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";
import recordApi from "../../api/recordApi";
import "./BulkRecord.scss";

const BulkRecord = (props) => {
  const [account, setAccount] = useState([]);
  const [bulkRecords, setBulkRecords] = useState([]);

  const accountIcons = {
    cash: faMoneyBill1Wave,
    currentAccount: faMoneyCheckAlt,
    creditCard: faCreditCard,
    savingsAccount: faPiggyBank,
    insurance: faCarBurst,
    investment: faSackDollar,
    loan: faMoneyBillTransfer,
  };

  const getBulkRecordsByAccountId = async (aId) => {
    try {
      const res = await recordApi.getBulkRecordsByAccountId(aId);
      if (res.data) {
        console.log(res.data.bulkRecords);
        setBulkRecords(res.data.bulkRecords);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    const account = props.account;
    let accountType = account.accountType;
    accountType = accountType.replace(/[A-Z]/g, (letter) => ` ${letter}`);
    accountType = accountType.charAt(0).toUpperCase() + accountType.slice(1);
    account.accountTypeText = accountType;
    setAccount(account);
    getBulkRecordsByAccountId(props.account._id);
  }, [props]);

  const deleteBulkRecords = async (bId) => {
    try {
      const res = await recordApi.deleteBulkRecordsById(bId);
      if (res.data) {
        props.getUserAccounts();
        message.success({
          content: "Bulk Record is Deleted Successfully.",
        });
      }
    } catch (error) {
      message.error({
        content: "Bulk Record is not Deleted Successfully. Try again later.",
      });
    }
  };

  const handleDelete = (bulkRecordId) => {
    deleteBulkRecords(bulkRecordId);
  };

  return (
    <>
      {bulkRecords.length > 0 && (
        <div className="bulk-record">
          <div className="bulk-record__account">
            <div className="bulk-record__account-icon">
              <div
                className="bulk-record__account-icon-color"
                style={{ background: account.accountColor }}
              ></div>
              <FontAwesomeIcon icon={accountIcons[account.accountType]} />
            </div>
            <div className="bulk-record__account-name">
              {account.accountName}
            </div>
            <div className="bulk-record__account-type">
              {account.accountTypeText}
            </div>
          </div>
          {bulkRecords.map((bulkRecord) => {
            return (
              <div className="bulk-record__details">
                <div className="bulk-record__name">
                  {moment(bulkRecord.dateTime).format(" MMMM Do, YYYY HH:mm")}
                </div>
                <div className="bulk-record__action">
                  <Popconfirm
                    title="Sure to delete?"
                    onConfirm={() => handleDelete(bulkRecord._id)}
                  >
                    <a>Delete</a>
                  </Popconfirm>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default BulkRecord;

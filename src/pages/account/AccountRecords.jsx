import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Table, Popconfirm, message } from "antd";
import recordApi from "../../api/recordApi.js";
const { Column } = Table;

const AccountRecords = (props) => {
  const [records, setRecords] = useState([]);
  const [updated, setUpdated] = useState(false);

  const getRecords = async (aId) => {
    try {
      const res = await recordApi.getRecordsByAccountId(aId);
      if (res.data) {
        setRecords(res.data.records);
      }
    } catch (error) {
      // console.log(error);
    }
  };
  const handleDelete = async (rId) => {
    try {
      const res = await recordApi.deleteRecord(rId);
      if (res.data) {
        message.success({
          content: "Your record is deleted successfully.",
        });
        setUpdated(true);
      }
    } catch (error) {
      message.error({
        content:
          "Your record is not deleted successfully. Please try again later.",
      });
    }
  };
  useEffect(() => {
    getRecords(props.aid);
  }, [props, updated]);

  return (
    <div>
      <Table dataSource={records}>
        <Column title="Date" dataIndex="date" key="date" />
        <Column title="Description" dataIndex="description" key="description" />
        <Column title="Category" dataIndex="category" key="category" />
        <Column
          title="Sub Category"
          dataIndex="subCategory"
          key="subCategory"
        />
        <Column title="Amount" dataIndex="amount" key="amount" />
        <Column
          title="Delete"
          key="action"
          width="80"
          render={(_, record) => (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record._id)}
            >
              <a className="text-danger">Delete</a>
            </Popconfirm>
          )}
        />
        <Column
          title="Edit"
          key="action"
          width="80"
          render={(_, record) => {
            const rId = record._id;
            return (
              <NavLink to={`/record/${rId}`}>
                <span className="nav-link px-2 link-secondary">Edit</span>
              </NavLink>
            );
          }}
        />
      </Table>
    </div>
  );
};

export default AccountRecords;

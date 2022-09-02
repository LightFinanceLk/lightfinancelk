import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Table } from "antd";
import { useEffect, useState } from "react";
import userApi from "../../../api/userApi";
import { message } from "antd";
import moment from "moment";

const AdminAdvisorCard = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (props.advisors) {
      const advisors = props.advisors.map((advisor) => {
        return { ...advisor, link: advisor.link.replace("user", "advisor") };
      });
      setData(advisors);
    }
  }, [props]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 1,
      },
    },
    {
      title: "Area",
      dataIndex: "city",
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 2,
      },
    },
    {
      title: "No of Clients",
      dataIndex: "noOfClients",
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "New Meetings",
      dataIndex: "noOfMeetings",
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 4,
      },
    },
    {
      title: "",
      dataIndex: "operation",
      width: 80,
      render: (_, record) => (
        <NavLink to={record.link}>
          <span className="nav-link px-2 link-secondary">
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </span>
        </NavLink>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      pagination={{ defaultPageSize: 5 }}
    />
  );
};

export default AdminAdvisorCard;

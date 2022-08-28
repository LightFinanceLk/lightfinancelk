import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Table } from "antd";
import { useEffect, useState } from "react";
import userApi from "../../api/userApi";
import { message } from "antd";

const AdminAdvisorCard = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getAdvisors = async () => {
      try {
        const res = await userApi.getUsersByUserRole("1974");
        if (res.data) {
          const advisors = res.data.users;
          const advisorsArr = advisors.map((advisor, index) => {
            return {
              key: index,
              name: `${advisor.firstName} ${advisor.lastName}`,
              noOfClients: 98,
              noOfMeetings: 5,
              link: `/advisor/${advisor.id}`,
            };
          });
          setData(advisorsArr);
        }
      } catch (e) {
        // console.log(e);
        message.error({
          content: "Fetching advisors failed.",
          duration: 6,
        });
      }
    };
    getAdvisors();
  }, []);

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
      dataIndex: "area",
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

  return <Table columns={columns} dataSource={data} onChange={onChange} />;
};

export default AdminAdvisorCard;

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import userApi from "../../../api/userApi";

const AdminAdvisorCard = (props) => {
  const [data, setData] = useState([]);
  const [advisorClientData, setAdvisorClientData] = useState([]);

  const getMeetingsData = async (aId) => {
    try {
      const res = await userApi.getMeetingsByAdvisorId(aId);
      if (res.data) {
        let users = [];
        let meetings = [];
        const advisorMeetings = res.data.advisorMeetings.filter((m) => {
          return m.userId && m.userId !== "";
        });

        advisorMeetings.map((m) => {
          users.push(m.userId);
          meetings.push(m._id);
        });

        let uniqueUsers = [...new Set(users)];

        setAdvisorClientData([
          ...advisorClientData,
          {
            advisorId: aId,
            users: uniqueUsers.length,
            meetings: meetings.length,
          },
        ]);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (props.advisors) {
      const advisors = props.advisors.map((advisor) => {
        getMeetingsData(advisor._id);
        return { ...advisor, link: advisor.link.replace("user", "advisor") };
      });
      setData(advisors);
    }
  }, [props]);

  useEffect(() => {
    if (advisorClientData.length) {
      let advisors = data;
      advisors.map((advisor, index) => {
        let advisorId = advisor._id;
        advisorClientData.map((advisorData) => {
          if (advisorData.advisorId === advisorId) {
            advisors[index] = {
              ...advisors[index],
              noOfClients: advisorData.users,
              noOfMeetings: advisorData.meetings,
            };
          }
        });
        setData(advisors);
      });
    }
  }, [advisorClientData]);

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
      title: "Age",
      dataIndex: "age",
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
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
    // console.log("params", pagination, filters, sorter, extra);
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

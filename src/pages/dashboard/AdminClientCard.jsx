import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faPerson,
  faPersonDress,
} from "@fortawesome/free-solid-svg-icons";
import { Table } from "antd";
import { useEffect, useState } from "react";
import userApi from "../../api/userApi";
import { message } from "antd";
import moment from "moment";
import "./AdminClientCard.scss";

import male from "../../assets/img/male.png";
import female from "../../assets/img/female.png";

const AdminClientCard = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getClients = async () => {
      try {
        const res = await userApi.getUsersByUserRole("2022");
        if (res.data) {
          const clients = res.data.users;
          const clientsArr = clients.map((client, index) => {
            console.log(client);
            const age = moment().diff(client.dob, "years", false);
            return {
              key: index,
              name: `${client.firstName} ${client.lastName}`,
              noOfClients: 98,
              noOfMeetings: 5,
              age,
              area: client.city,
              link: `/user/${client.id}`,
              gender: client.gender,
            };
          });
          setData(clientsArr);
        }
      } catch (e) {
        // console.log(e);
        message.error({
          content: "Fetching clients failed.",
          duration: 6,
        });
      }
    };
    getClients();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "",
      dataIndex: "operation",
      width: 50,
      render: (_, record) =>
        record.gender === "male" ? (
          <img src={male} alt="" />
        ) : (
          <img src={female} alt="" />
        ),
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Area",
      dataIndex: "area",
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
    <div className="lf-admin-client-card">
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
};

export default AdminClientCard;

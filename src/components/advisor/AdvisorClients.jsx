import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faPerson,
  faPersonDress,
} from "@fortawesome/free-solid-svg-icons";
import userApi from "../../api/userApi";
import { message, Table } from "antd";
import moment from "moment";
import male from "../../assets/img/male.png";
import female from "../../assets/img/female.png";

const AdvisorClients = (props) => {
  const [clients, setClients] = useState([]);
  const getClients = async () => {
    try {
      const res = await userApi.getUsersByUserRole("2022");
      if (res.data) {
        const clients = res.data.users;
        const advisorClients = clients.map((client) => {
          return client.advisor === props.aid;
        });
        console.log(advisorClients, "advisorClients");
        const clientsArr = clients.map((user, index) => {
          const client = user.user;
          const age = moment().diff(client.dob, "years", false);
          return {
            ...client,
            key: index,
            name: `${client.firstName} ${client.lastName}`,
            age,
            link: `/user/${client._id}`,
          };
        });
        setClients(clientsArr);
      }
    } catch (e) {
      // console.log(e);
      message.error({
        content: "Fetching clients failed.",
        duration: 6,
      });
    }
  };

  useEffect(() => {
    getClients();
  }, [props]);

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
      dataIndex: "city",
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
      <Table columns={columns} dataSource={clients} onChange={onChange} />
    </div>
  );
};

export default AdvisorClients;

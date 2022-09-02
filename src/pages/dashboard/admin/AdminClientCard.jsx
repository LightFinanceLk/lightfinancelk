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
import userApi from "../../../api/userApi";
import { message } from "antd";
import moment from "moment";
import "./AdminClientCard.scss";

import male from "../../../assets/img/male.png";
import female from "../../../assets/img/female.png";

const AdminClientCard = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (props.clients) {
      setData(props.clients);
    }
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
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        pagination={{ defaultPageSize: 5 }}
      />
    </div>
  );
};

export default AdminClientCard;

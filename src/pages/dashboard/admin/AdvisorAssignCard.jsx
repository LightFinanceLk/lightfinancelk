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
import { message, TreeSelect } from "antd";
import moment from "moment";
import "./AdminClientCard.scss";

import male from "../../../assets/img/male.png";
import female from "../../../assets/img/female.png";

const AdvisorAssignCard = (props) => {
  const [clients, setClients] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [treeValue, setTreeValue] = useState();

  useEffect(() => {
    console.log(props);
    if (props.advisors) {
      const treeData = props.advisors.map((advisor, index) => {
        return {
          title: advisor.name,
          value: advisor._id,
        };
      });
      setTreeData(treeData);
    }

    if (props.clients) {
      const newClients = props.clients.filter((client) => {
        console.log(client);
        return client.advisor === null;
      });
      console.log(newClients, "newClients");
      setClients(newClients);
    }
  }, [props]);

  const onTreeSelect = (record, value) => {
    const updateClient = async () => {
      const client = clients.filter(function (client) {
        return client._id == record._id;
      });

      try {
        const res = await userApi.updateDataByUserId(record._id, {
          ...client[0],
          advisor: value,
        });
        if (res.data) {
          console.log(res.data);
          props.getClients();
          message.success({
            content: "The advisor assigned successfully.",
            duration: 6,
          });
        }
      } catch (e) {
        // console.log(e);
        message.error({
          content: "Updating client failed.",
          duration: 6,
        });
      }
    };
    updateClient();
  };

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
      title: "Marital Status",
      dataIndex: "maritalStatus",
    },
    {
      title: "Occupation",
      dataIndex: "occupation",
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
    {
      title: "Assign an Advisor",
      dataIndex: "operation",
      width: 250,
      render: (_, record) => {
        return (
          <TreeSelect
            style={{ width: "100%" }}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            treeData={treeData}
            placeholder="Please select"
            onChange={(treeValue) => {
              onTreeSelect(record, treeValue);
            }}
            value={treeValue}
          />
        );
      },
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div className="lf-admin-client-card">
      <Table
        columns={columns}
        dataSource={clients}
        onChange={onChange}
        pagination={{ defaultPageSize: 5 }}
      />
    </div>
  );
};

export default AdvisorAssignCard;

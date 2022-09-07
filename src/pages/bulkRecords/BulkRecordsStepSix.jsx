import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Popconfirm,
  Table,
  Typography,
  TreeSelect,
  message,
} from "antd";
import categories from "../../util/categories";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={
            title === "Amount"
              ? [
                  {
                    required: true,
                    pattern: new RegExp(/^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/),
                    message: `Please Input ${title}!`,
                  },
                ]
              : title === "Date"
              ? [
                  {
                    required: true,
                    pattern: new RegExp(
                      /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
                    ),
                    message: `Please Input ${title} in correct format dd/mm/yyyy`,
                  },
                ]
              : [
                  {
                    required: true,
                    message: `Please Input ${title}!`,
                  },
                ]
          }
        >
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const BulkRecordsStepSix = (props) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [treeData, setTreeData] = useState([]);
  const [treeValue, setTreeValue] = useState();

  useEffect(() => {
    let treeData = [];
    for (const category in categories) {
      let children = [];
      categories[category].map((item) => {
        children.push({
          title: item,
          value: `${category}-${item}`,
        });
      });
      treeData.push({ title: category, value: `${category}-`, children });
    }
    setTreeData(treeData);
  }, [props.dataColumns, props.dataSource]);

  const isEditing = (record) => record.key === editingKey;

  const handleDelete = (key) => {
    const newData = props.dataSource.filter((item) => item.key !== key);
    props.setDataSource(newData);
  };

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...props.dataSource];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        props.setDataSource(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        props.setDataSource(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      message.error(`Validation Failed`);
    }
  };

  const onTreeSelect = (record, value) => {
    const updatedDataSources = props.dataSource.map((col) => {
      if (col.key === record.key) {
        return {
          ...col,
          category: value.split("-")[0].replace("-", " "),
          subCategory: value.split("-")[1].replace("-", " "),
        };
      }
      return col;
    });
    props.setDataSource(updatedDataSources);
  };

  const columns = [
    ...props.dataColumns,
    {
      title: "Category",
      dataIndex: "operation",
      width: 200,
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
            defaultValue="Other"
          />
        );
      },
    },
    {
      title: "Edit",
      dataIndex: "operation",
      width: 80,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Typography.Link
              onClick={cancel}
              style={{
                marginRight: 8,
              }}
            >
              Cancel
            </Typography.Link>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
    {
      title: "Delete",
      dataIndex: "operation",
      width: 80,
      render: (_, record) =>
        props.dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (col.dataIndex === "operation") {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={props.dataSource}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default BulkRecordsStepSix;

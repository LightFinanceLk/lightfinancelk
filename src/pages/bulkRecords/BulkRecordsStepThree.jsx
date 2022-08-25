import React, { useState } from "react";
import { Table } from "antd";
import { useEffect } from "react";

const BulkRecordsStepThree = (props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [columns, setColumns] = useState([]);

  const onSelectChange = (keys) => {
    setSelectedRowKeys(keys);
    props.setSelectedExpenses(keys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    const selectedRows = [];
    if (props.dataColumns && columns.length === 0) {
      let columns = props.dataColumns;
      const amountColIndex = props.dataColumns.findIndex(
        (p) => p.title === "Amount"
      );
      columns.splice(amountColIndex, 0, Table.SELECTION_COLUMN);
      setColumns(columns);
    }

    props.dataSource.map((item, index) => {
      Object.keys(item).forEach((key) => {
        if (key === "Amount" && item[key] < 0) {
          selectedRows.push(index);
        }
      });
    });
    setSelectedRowKeys(selectedRows);
  }, []);

  return (
    <div className="bulk-records__income-expense-table">
      <Table
        dataSource={props.dataSource}
        columns={columns}
        bordered
        rowSelection={rowSelection}
      />
    </div>
  );
};

export default BulkRecordsStepThree;

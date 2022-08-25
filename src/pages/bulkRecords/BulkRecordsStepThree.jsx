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
    if (props.dataColumns && columns.length === 0) {
      let columns = props.dataColumns;
      const amountColIndex = props.dataColumns.findIndex(
        (p) => p.title === "Amount"
      );
      columns.splice(amountColIndex, 0, Table.SELECTION_COLUMN);
      setColumns(columns);
    }
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

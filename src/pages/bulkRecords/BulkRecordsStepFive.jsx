import React from "react";
import { Table } from "antd";

const BulkRecordsStepFive = (props) => {
  return (
    <div className="bulk-records__income-expense-table">
      <Table
        dataSource={props.dataSource}
        columns={props.dataColumns}
        bordered
      />
    </div>
  );
};

export default BulkRecordsStepFive;

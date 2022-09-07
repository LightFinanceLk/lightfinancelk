import React from "react";
import { Table } from "antd";

const BulkRecordsStepTwo = (props) => {
  return (
    <div>
      <Table
        dataSource={props.dataSource}
        columns={props.dataColumns}
        bordered
      />
    </div>
  );
};

export default BulkRecordsStepTwo;

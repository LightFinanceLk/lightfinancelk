import React, { useState } from "react";
import { Table } from "antd";
import { useEffect } from "react";

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

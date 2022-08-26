import React, { useState, useEffect } from "react";
import { Button } from "antd";

const BulkRecordsStepThreeInstructions = (props) => {
  const [data, setData] = useState([]);
  const [selectedExpenses, setSelectedExpenses] = useState([]);
  useEffect(() => {
    if (props.dataSource) {
      setData(props.dataSource);
    }
    if (props.selectedExpenses) {
      setSelectedExpenses(props.selectedExpenses);
    }
  }, [props.selectedExpenses, props.dataSource]);

  const handleOnClick = () => {
    selectedExpenses.map((item) => {
      data[item].Amount *= -1;
    });
    props.setDataSource(data);
    props.setCurrent(3);
  };

  return (
    <div className="bulk-records__steps-action">
      <Button
        type="primary"
        onClick={() => {
          handleOnClick();
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default BulkRecordsStepThreeInstructions;

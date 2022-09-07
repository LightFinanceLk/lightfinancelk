import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import recordApi from "../../api/recordApi";

const BulkRecordsStepSixInstructions = (props) => {
  const navigate = useNavigate();

  const toCamelCase = (str) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  };

  const createBulkRecordsHandler = async (values) => {
    try {
      let submitValues = values.map((value) => {
        return {
          amount: value.Amount,
          recordType: value.Amount > 0 ? "income" : "expense",
          date: value.Date,
          description: value.Description,
          accountId: props.accountId,
          category: value.category ? toCamelCase(value.category) : "",
          subCategory: value.subCategory ? toCamelCase(value.subCategory) : "",
        };
      });
      const res = await recordApi.createBulkRecords(
        props.accountId,
        JSON.stringify(submitValues)
      );
      if (res.data) {
        navigate(`/account/${props.accountId}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onClickHandler = () => {
    createBulkRecordsHandler(props.dataSource);
  };

  return (
    <>
      <div className="bulk-records__steps-action">
        <Button type="primary" onClick={onClickHandler}>
          Complete
        </Button>
      </div>
    </>
  );
};

export default BulkRecordsStepSixInstructions;

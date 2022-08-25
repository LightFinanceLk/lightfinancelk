import Reactt, { useState } from "react";
import { Button, message, Steps, Table } from "antd";
import "./BulkRecordsPage.scss";
import BulkRecordsStepOne from "./BulkRecordsStepOne";
import BulkRecordsStepTwo from "./BulkRecordsStepTwo";
import BulkRecordsStepThree from "./BulkRecordsStepThree";
import BulkRecordsStepFive from "./BulkRecordsStepFive";
import BulkRecordsStepSix from "./BulkRecordsStepSix";
import BulkRecordsStepOneInstructions from "./BulkRecordsStepOneInstructions";
import BulkRecordsStepTwoInstructions from "./BulkRecordsStepTwoInstructions";
import BulkRecordsStepThreeInstructions from "./BulkRecordsStepThreeInstructions";
import BulkRecordsStepFourInstructions from "./BulkRecordsStepFourInstructions";
import BulkRecordsStepFiveInstructions from "./BulkRecordsStepFiveInstructions";
import BulkRecordsStepSixInstructions from "./BulkRecordsStepSixInstructions";
import { useEffect } from "react";
import BulkRecordsStepFour from "./BulkRecordsStepFour";

const { Step } = Steps;
const steps = [
  {
    title: "Add Raw Data",
    content:
      "Select raw data type and copy your data into the text input field",
  },
  {
    title: "Select Amount Column",
    content: "",
  },
  {
    title: "Select Income Expenses",
    content: ``,
  },
  {
    title: "Select Date Column",
    content: "",
  },
  {
    title: "Select Optional Column",
    content: "",
  },
  {
    title: "Select Categories",
    content: "",
  },
];

const BulkRecordsPage = () => {
  const [current, setCurrent] = useState(0);
  const [rawDataType, setRawDataType] = useState("html");
  const [dataSource, setDataSource] = useState([]);
  const [dataColumns, setDataColumns] = useState([]);
  const [amountColumn, setAmountColumn] = useState("");
  const [dateColumn, setDateColumn] = useState("");
  const [descriptionColumn, setDescriptionColumn] = useState("");
  const [selectedExpenses, setSelectedExpenses] = useState([]);

  useEffect(() => {
    if (amountColumn !== "") {
      // console.log(dataColumns, "----");
      // console.log(amountColumn, "amountColumn");
      // console.log(dateColumn, "dateColumn");
      const updatedTableColumns = [];
      dataColumns.map((e) => {
        // console.log(e.title);
        // console.log(amountColumn, "amountColumn");
        if (e.title === amountColumn) {
          updatedTableColumns.push(Table.SELECTION_COLUMN);
        }
        updatedTableColumns.push(e);
      }, []);
      setDataColumns(updatedTableColumns);
    }
  }, [amountColumn]);

  // useEffect(() => {
  //   console.log(dataSource);
  // }, [dataSource]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <>
      <div className="container-fluid bulk-records">
        <div className="row">
          <div className="col-sm-4">
            <Steps current={current} className="bulk-records__steps">
              {steps.map((item) => (
                <Step key={item.title} />
              ))}
            </Steps>
            <div className="bulk-records__title">
              <h3>{steps[current].title}</h3>
              <>
                {current === 2 ? (
                  <>
                    <p>
                      Click on the
                      <label className="ant-checkbox-wrapper">
                        <span className="ant-checkbox">
                          <input
                            type="checkbox"
                            className="ant-checkbox-input"
                            value=""
                          />
                          <span className="ant-checkbox-inner"></span>
                        </span>
                      </label>
                      button to change amount to an expense value.
                      <label className="ant-checkbox-wrapper">
                        <span className="ant-checkbox ant-checkbox-checked">
                          <input
                            type="checkbox"
                            className="ant-checkbox-input"
                            value=""
                          />
                          <span className="ant-checkbox-inner"></span>
                        </span>
                      </label>
                    </p>
                  </>
                ) : current === 5 ? (
                  <>
                    <p>
                      When the Categories are selected, click "Complete" button.
                    </p>
                    <p>(Selecting Categories is not mandatory)</p>
                  </>
                ) : (
                  <p>{steps[current].content}</p>
                )}
              </>
            </div>
            <div className="bulk-records__steps-instructions">
              {current === 0 ? (
                <BulkRecordsStepOneInstructions
                  setRawDataType={setRawDataType}
                  rawDataType={rawDataType}
                />
              ) : null}
              {current === 1 ? (
                <BulkRecordsStepTwoInstructions
                  dataColumns={dataColumns}
                  dataSource={dataSource}
                  setDataSource={setDataSource}
                  setDataColumns={setDataColumns}
                  setCurrent={setCurrent}
                />
              ) : null}
              {current === 2 ? (
                <BulkRecordsStepThreeInstructions
                  dataColumns={dataColumns}
                  dataSource={dataSource}
                  setCurrent={setCurrent}
                  setDataSource={setDataSource}
                  selectedExpenses={selectedExpenses}
                />
              ) : null}
              {current === 3 ? (
                <BulkRecordsStepFourInstructions
                  setCurrent={setCurrent}
                  dataColumns={dataColumns}
                  dataSource={dataSource}
                  setDataSource={setDataSource}
                  setDataColumns={setDataColumns}
                />
              ) : null}
              {current === 4 ? (
                <BulkRecordsStepFiveInstructions
                  dataColumns={dataColumns}
                  setCurrent={setCurrent}
                  dataSource={dataSource}
                  setDataSource={setDataSource}
                  setDataColumns={setDataColumns}
                />
              ) : null}
              {current === 5 ? (
                <BulkRecordsStepSixInstructions
                  dataColumns={dataColumns}
                  setCurrent={setCurrent}
                  dataSource={dataSource}
                  setDataSource={setDataSource}
                  setDataColumns={setDataColumns}
                />
              ) : null}
            </div>
          </div>
          <div className="col-sm-8">
            <div className="bulk-records__steps-content">
              {current === 0 ? (
                <BulkRecordsStepOne
                  rawDataType={rawDataType}
                  setDataSource={setDataSource}
                  setDataColumns={setDataColumns}
                  setCurrent={setCurrent}
                />
              ) : null}
              {current === 1 ? (
                <BulkRecordsStepTwo
                  dataSource={dataSource}
                  dataColumns={dataColumns}
                />
              ) : null}
              {current === 2 ? (
                <BulkRecordsStepThree
                  dataSource={dataSource}
                  setDataSource={setDataSource}
                  dataColumns={dataColumns}
                  setSelectedExpenses={setSelectedExpenses}
                />
              ) : null}
              {current === 3 ? (
                <BulkRecordsStepFour
                  dataSource={dataSource}
                  dataColumns={dataColumns}
                  setDataSource={setDataSource}
                  dateColumn={dateColumn}
                />
              ) : null}
              {current === 4 ? (
                <BulkRecordsStepFive
                  dataSource={dataSource}
                  dataColumns={dataColumns}
                  setDataSource={setDataSource}
                  setDataColumns={setDataColumns}
                />
              ) : null}
              {current === 5 ? (
                <BulkRecordsStepSix
                  dataSource={dataSource}
                  dataColumns={dataColumns}
                  setDataSource={setDataSource}
                  setDataColumns={setDataColumns}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BulkRecordsPage;

import React, { useState, useEffect } from "react";
import recordApi from "../../api/recordApi.js";
import { Chart } from "react-google-charts";

const AccountAnalysis = (props) => {
  const [records, setRecords] = useState([]);
  const [chartData, setChartData] = useState([]);
  const getRecords = async (aId) => {
    try {
      const res = await recordApi.getRecordsByAccountId(aId);
      if (res.data) {
        setRecords(res.data.records);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getRecords(props.aid);
  }, [props]);

  useEffect(() => {
    createChart(records);
  }, [records]);

  const createChart = (rec) => {
    const categories = {};
    let expenses = rec.filter((r) => {
      return r.recordType === "expense";
    });
    expenses.map((expense) => {
      if (expense.category) {
        let cat = expense.category;
        const result = cat.replace(/([A-Z])/g, " $1");
        const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
        if (!(cat in categories)) {
          categories[`${finalResult}`] = expense.amount;
        } else {
          categories[`${finalResult}`] += expense.amount;
        }
      }
    });

    let data = [["Category", "Total Expenses"]];

    const result = Object.keys(categories).map((key) => [
      key,
      Math.abs(categories[key]),
    ]);

    data = [...data, ...result];

    result.push();
    setChartData(data);
  };

  const options = {
    title: `Expenses of the "${props.aName}" account `,
    chartArea: { width: "50%" },
    hAxis: {
      title: "Total Expenses",
      minValue: 0,
    },
    vAxis: {
      title: "Category",
    },
    legend: { position: "none" },
  };

  return (
    <div>
      <Chart
        chartType="BarChart"
        width="100%"
        height="400px"
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default AccountAnalysis;

import React from "react";
import Chart from "react-google-charts";

const data = [
  ["Category", "Spent"],
  ["Food and Drinks", 1100],
  ["Shopping", 2000],
  ["Housing", 2000],
  ["Transportation", 2000],
  ["Vehicle", 7000],
  ["Life and Entertainment", 7000],
  ["Communication and Computers", 7000],
  ["Financial Expenses", 7000],
  ["Investment", 7000],
  ["Income", 7000],
];
const options = {
  pieHole: 0.5,
  legend: {
    position: "none",
  },
  chartArea: { top: 30, width: 400, height: 300 },
};

const ExpenseStructureCard = () => {
  return (
    <div>
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
};

export default ExpenseStructureCard;

import React, { useState, useEffect } from 'react'
import { Chart } from "react-google-charts";

import { useCookies } from 'react-cookie';

//Column chart: Comparison between categories incomes/outcomes

function CategoryChart() {
    const [dataChart, setDataChart] = useState();
    const [cookies] = useCookies(['auth_token']);
    const [incomes, setIncomes] = useState([]);
    const [outcomes, setOutcomes] = useState([]);

    const getIncomes = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/income`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookies.auth_token}`,
          },
        }
      );
      const incomes = await response.json();
      return incomes;
    };

    const getOutcomes = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/outcome`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookies.auth_token}`,
          },
        }
      );
      const outcomes = await response.json();
      return outcomes;
    };

    useEffect(()=>{
      async function getUserTransactions(){
        const incomesData = await getIncomes();
        const outcomesData = await getOutcomes();

        setIncomes(incomesData.data);
        setOutcomes(outcomesData.data);
      }
      getUserTransactions()
      const sumData = (type, cat) => {
        var amountSum = 0;
        ([type][0]).map((t)=>{
          if(t.category == cat){
            amountSum += t.amount
          }
          return amountSum
        })
        return amountSum
      }

      const data = [
        ["Category", "Income", "Outcome"],
        ["Food", sumData(incomes, 'Food'), sumData(outcomes, 'Food')],
        ["Travel", sumData(incomes, 'Travel'), sumData(outcomes, 'Travel')],
        ["Work", sumData(incomes, 'Work'), sumData(outcomes, 'Work')],
        ["Gift", sumData(incomes, 'Gift'), sumData(outcomes, 'Gift')],
        ["Selling", sumData(incomes, 'Selling'), sumData(outcomes, 'Selling')],
        ["Other", sumData(incomes, 'Other'), sumData(outcomes, 'Other')]
      ];
      setDataChart(data)
    }, [incomes.length, outcomes.length])

    const options = {
        chartArea: { width: "75%" },
        hAxis: {
          minValue: 0,
        },
        backgroundColor: 'transparent',
        legend: 'bottom',
        width: 500,
        height: 400,
        colors: ['#0b65db', '#db0b43']
      };

  return (
    <div className='flex flex-col content-center w-full items-center'>
      <h1 className='text-center font-bold text-2xl -mb-8 -ml-11'>Categories: incomes vs outcomes</h1>
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="100%"
        data={dataChart}
        options={options}
      />
    </div>
  );
}

export default CategoryChart
import React, {useEffect, useState} from 'react'
import { Chart } from "react-google-charts";

function CategoryChart() {
    const [chartData, setChartData] = useState();
    useEffect(()=>{
        async function getBanks(){
        const banksData = await fetch('banks.json', {method: "GET"})
        const dataBanks = await banksData.json()

        const sumData = (type, cat) => {
          var amountSum = 0;
          type.map((t)=>{
            if(t.category === cat){
              amountSum += t.amount
            }
            return amountSum
          })
          return amountSum
        }
        const dataChart = [
          ["Category", "Income", "Outcome"],
          ["Food", sumData(dataBanks[0].incomes, 'Food'), sumData(dataBanks[0].outcomes, 'Food')],
          ["Travel", sumData(dataBanks[0].incomes, 'Travel'), sumData(dataBanks[0].outcomes, 'Travel')],
          ["Work", sumData(dataBanks[0].incomes, 'Work'), sumData(dataBanks[0].outcomes, 'Work')],
          ["Gift", sumData(dataBanks[0].incomes, 'Gift'), sumData(dataBanks[0].outcomes, 'Gift')],
          ["Selling", sumData(dataBanks[0].incomes, 'Selling'), sumData(dataBanks[0].outcomes, 'Selling')],
          ["Other", sumData(dataBanks[0].incomes, 'Other'), sumData(dataBanks[0].outcomes, 'Other')]
        ];
        setChartData(dataChart)
        }
        getBanks()
    }, [])

    const options = {
        title: "Incomes vs Outcomes",
        chartArea: { width: "50%" },
        hAxis: {
          title: "Total Population",
          minValue: 0,
        },
        vAxis: {
          title: "Category",
        },
      };

  return (
    <div className='flex flex-col content-center w-max items-center'>
    <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={chartData}
      options={options}
    />
    </div>
  );
}

export default CategoryChart
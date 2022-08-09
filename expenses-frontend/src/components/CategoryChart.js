import React, {useEffect, useState} from 'react'
import { Chart } from "react-google-charts";

function CategoryChart() {
    const [dataChart, setDataChart] = useState();
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
        const data = [
          ["Category", "Income", "Outcome"],
          ["Food", sumData(dataBanks[0].incomes, 'Food'), sumData(dataBanks[0].outcomes, 'Food')],
          ["Travel", sumData(dataBanks[0].incomes, 'Travel'), sumData(dataBanks[0].outcomes, 'Travel')],
          ["Work", sumData(dataBanks[0].incomes, 'Work'), sumData(dataBanks[0].outcomes, 'Work')],
          ["Gift", sumData(dataBanks[0].incomes, 'Gift'), sumData(dataBanks[0].outcomes, 'Gift')],
          ["Selling", sumData(dataBanks[0].incomes, 'Selling'), sumData(dataBanks[0].outcomes, 'Selling')],
          ["Other", sumData(dataBanks[0].incomes, 'Other'), sumData(dataBanks[0].outcomes, 'Other')]
        ];
        setDataChart(data)
        }
        getBanks()
    }, [])

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
      <h1 className='text-center font-bold text-2xl -mb-8'>Categories: incomes vs outcomes</h1>
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
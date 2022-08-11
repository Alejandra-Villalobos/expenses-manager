import React, {useEffect, useState} from 'react'
import { Chart } from "react-google-charts";

//Column chart: Comparison between categories incomes/outcomes

function CategoryChart() {
    const [dataChart, setDataChart] = useState();
    useEffect(()=>{
        async function getBanks(){
        const banksData = await fetch('banks.json', {method: "GET"})
        const dataBanks = await banksData.json()

        //Sums the amount of money of the incomes/outcomes depending on the category
        const sumData = (type, cat) => {
          var amountSum = 0;
          (dataBanks[0][type]).map((t)=>{
            if(t.category === cat){
              amountSum += t.amount
            }
            return amountSum
          })
          return amountSum
        }
        const data = [
          ["Category", "Income", "Outcome"],
          ["Food", sumData('incomes', 'Food'), sumData('outcomes', 'Food')],
          ["Travel", sumData('incomes', 'Travel'), sumData('outcomes', 'Travel')],
          ["Work", sumData('incomes', 'Work'), sumData('outcomes', 'Work')],
          ["Gift", sumData('incomes', 'Gift'), sumData('outcomes', 'Gift')],
          ["Selling", sumData('incomes', 'Selling'), sumData('outcomes', 'Selling')],
          ["Other", sumData('incomes', 'Other'), sumData('outcomes', 'Other')]
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
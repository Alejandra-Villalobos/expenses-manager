import React, { useEffect, useState } from 'react'
import { Chart } from "react-google-charts";


function BankChart() {
  const [chartData, setChartData] = useState ()
  useEffect(()=>{
    async function getBanks(){
      const banksData = await fetch('banks.json', {method: "GET"})
      const data = await banksData.json()
      const dataChart = [
        [["Bank", "Amount"]],
        data.map((bank)=> [bank.bankName, bank.amount])
      ].flat();
      setChartData(dataChart)
    }
    getBanks()
    
    
  }, [])

  const options = {
    chartArea: { width: "100%" },
    backgroundColor: 'transparent',
    legend: 'bottom',
    width: 500,
    height: 400,
    is3D: true,
  };
  
  return (
    <div className='flex flex-col content-center w-full items-center'>
      <h1 className='text-center font-bold text-2xl -mb-8'>Bank amount distribution</h1>
      <Chart
      chartType="PieChart"
      data={chartData}
      options={options}
      width={"100%"}
      height={"100%"}
      
    />
    </div>
  )
}

export default BankChart
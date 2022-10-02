import React, { useState, useEffect } from 'react'
import { Chart } from "react-google-charts";

import { useCookies } from 'react-cookie';

//Pie chart: amount of money in every bank account

function BankChart() {
  const [chartData, setChartData] = useState ();
  const [cookies] = useCookies(['auth_token']);
  const [banks, setBanks] = useState([]);

  const getBanks = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/bank`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookies.auth_token}`,
          },
        }
      );
      const banks = await response.json();
      return banks;
    };

    async function getUserBanks(){
      const banksData = await getBanks();
      setBanks(banksData.data)
      
    }

  useEffect(()=>{
    
    getUserBanks()
    const dataChart = [
      [["Bank", "Amount"]],
      banks.map((bank)=> [bank.name, bank.amount])
    ].flat();
    setChartData(dataChart)
    
  }, [banks.length])


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
      <h1 className='text-center font-bold text-2xl -mb-8 -ml-11'>Bank amount distribution</h1>
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
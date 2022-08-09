import React, { useEffect, useState } from 'react'
import { PieChart } from 'react-minimal-pie-chart';
import { GoPrimitiveDot } from 'react-icons/go'

function BankChart() {
  const [banks, setBanks] = useState([]);
  const colors = ['#eb3461', '#eb6e34', '#34eb92', '#3471eb', '#dbeb34', '#d234eb', '#3498eb', '#eb3d34']
  useEffect(()=>{
    async function getBanks(){
      const banksData = await fetch('banks.json', {method: "GET"})
      const data = await banksData.json()
      console.log(data)
      setBanks(data)
    }
    getBanks()
  }, [])
  return (
    <div className='flex flex-col content-center w-max items-center'>
      <h1 className='text-center font-bold text-2xl'>Bank amount distribution</h1>
    <PieChart className='w-72 h-72' label={(data) => `${Math.round(data.dataEntry.percentage)}%`} labelPosition={75}
      labelStyle={{
        fontSize: "6px",
        fontColor: "FFFFFA",
        fontWeight: "400",
      }}
      data={banks.map((bank, i) => {return {title: bank.bankName, value: bank.amount, color: colors[i]}})}
    />
    <div className='flex flex-row w-max gap-3'>
      {banks.map((bank, i)=> {return <div className='flex flex-row items-center'><GoPrimitiveDot color={colors[i]}/><p>{bank.bankName}</p></div>})}
    </div>
    </div>
  )
}

export default BankChart
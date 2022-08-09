import '../App.css'
import React, { useState, useEffect } from 'react'
import { BsCurrencyBitcoin, BsCurrencyDollar, BsCurrencyEuro } from 'react-icons/bs'

function ShowBanks() {
    const [banks, setBanks] = useState([]);
    const setCur = (curr) => {
      if(curr === 'dollar') return <BsCurrencyDollar/>
      else if (curr === 'euro') return <BsCurrencyEuro/>
      else if (curr === 'bitcoin') return <BsCurrencyBitcoin/>
    }

  useEffect(()=>{
    async function getBanks(){
      const banksData = await fetch('banks.json', {method: "GET"})
      const data = await banksData.json()
      setBanks(data)
    }
    getBanks()
  }, [])
  return (
    <div  className='flex flex-row gap-3 justify-center flex-wrap'>
          {banks.map((bank)=>
            <div key={bank.id} className='bank-divs mt-5 p-5 ml-2 rounded-md  border-2 shadow-md'>
              <p className='font-fira font-bold text-lg text-center'>{bank.bankName}</p>
              <hr className='bg-gray-500 rounded-lg'/>
              <p className='font-fira text-center'>{bank.user}</p>
              <p className='font-fira text-center flex items-center'>Amount: {setCur(bank.currency)} {bank.amount}</p>
            </div>
          )}
    </div>
  )
}

export default ShowBanks
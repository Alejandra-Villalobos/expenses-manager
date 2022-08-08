import '../App.css'
import React, { useState, useEffect } from 'react'


function ShowBanks() {
    const [banks, setBanks] = useState([]);

  useEffect(()=>{
    async function getBanks(){
      const banksData = await fetch('banks.json', {method: "GET"})
      const data = await banksData.json()
      console.log(data)
      setBanks(data)
    }
    getBanks()
  }, [banks])
  return (
    <div  className='flex flex-row gap-3'>
          {banks.map((bank)=>
            <div key={bank.id} className='bank-divs mt-5 p-5 ml-2 rounded-md  border-2 shadow-md'>
              <p className='font-fira font-bold text-lg text-center'>{bank.bankName}</p>
              <hr className='bg-gray-500 rounded-lg'/>
              <p className='font-fira text-center'>{bank.user}</p>
              <p className='font-fira text-center'>Amount: {bank.amount}</p>
            </div>
          )}
    </div>
  )
}

export default ShowBanks
import '../App.css'
import React, { useState, useEffect } from 'react'
import { BsCurrencyBitcoin, BsCurrencyDollar, BsCurrencyEuro } from 'react-icons/bs'
import { FcSimCardChip } from 'react-icons/fc'
import { useCookies } from 'react-cookie';

function ShowBanks() {
    const [cookies] = useCookies(['auth_token']);
    const [banks, setBanks] = useState([]);
    const setCur = (curr) => {
      if(curr === 'dollar') return <BsCurrencyDollar/>
      else if (curr === 'euro') return <BsCurrencyEuro/>
      else if (curr === 'bitcoin') return <BsCurrencyBitcoin/>
    }

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

  useEffect(()=>{
    async function getUserBanks(){
      const banksData = await getBanks();
      setBanks(banksData.data)
    }
    getUserBanks()
  }, [banks.length])
  return (
    <div  className='flex flex-row gap-3 justify-center flex-wrap'>
          {banks.map((bank)=>
            <div key={bank.id} className="bank-divs mt-5 p-5 ml-2 rounded-md shadow-lg w-60 hover:scale-110 hover:ml-5 hover:mr-5 transition-all">
              <p className='font-fira font-bold text-lg text-end -mt-3 -mb-2'>{bank.name}</p>
              <FcSimCardChip size={46}/>
              <div className='flex flex-row justify-between'>
                <p className='font-fira italic text-xl'>#{bank.account}</p>
                <p className='font-fira text-xl flex flex-row items-center'>{setCur(bank.currency)} {bank.amount}</p>
              </div>
              <p className='font-fira text-center text-xl mt-2 -mb-3'>{bank.user_name}</p>
            </div>
          )}
    </div>
  )
}

export default ShowBanks
import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';

function BankFilter(props) {
    var [banks, setBanks] = useState([]);
    const [cookies] = useCookies(['auth_token']);
    var [banksArr, setBanksArr] = useState([])

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
        const bankName = banksData.data.map((data) => data.name)
        setBanks([...new Set(bankName)])
      }
      getUserBanks()
    }, [banks.length])

    const handleChecked = (e) => {
        if(e.target.checked) setBanksArr(prev => [...prev, e.target.value])
        else setBanksArr(banksArr.filter((cat) => cat !== e.target.value))
    }
    return (props.trigger) ? (
        <div className='fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-40'>
            <div className='relative p-8 bg-white rounded-md w-64'>
                <div className='flex flex-row items-center justify-evenly flex-wrap mb-5 gap-5'>
                    {banks.map((bank, i)=><label key={i}>{bank}<input value={`${bank}`} type="checkbox" onChange={handleChecked}/></label>)}                    
                </div>
                <div className='flex flex-row justify-between'>
                    <button className='flex items-center shadow-md bg-orange-500 rounded-lg px-5 py-2' onClick={() => props.setTrigger(false)}>Cancel</button>
                    <button className='flex items-center shadow-md bg-sky-500 rounded-lg px-5 py-2' onClick={() => {props.setTrigger(false); props.setBanks(banksArr); setBanksArr([])}}>Filter</button>
                </div>   
            </div>
        </div>
    
      ) : "";
}

export default BankFilter
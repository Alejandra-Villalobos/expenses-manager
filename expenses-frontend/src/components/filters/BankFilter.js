import React, { useState, useEffect } from 'react'

function BankFilter(props) {
    const [banks, setBanks] = useState([]);

    useEffect(()=>{
        async function getBanks(){
          const banksData = await fetch('banks.json', {method: "GET"})
          const data = await banksData.json()
          setBanks(data)
        }
        getBanks()
      }, [])

    var banksArr = [];

    const handleChecked = (e) => {
        if(e.target.checked) banksArr.push(e.target.value)
        else banksArr.filter((cat) => cat !== e.target.value)

    }
    return (props.trigger) ? (
        <div className='fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-40'>
            <div className='relative p-8 bg-white rounded-md w-64'>
                <div className='flex flex-row items-center justify-evenly flex-wrap mb-5 gap-5'>
                    {banks.map((bank)=><><label>{bank.bankName}</label><input value={`${bank.bankName}`} type="checkbox" onChange={handleChecked}/></>)}                    
                </div>
                <div className='flex flex-row justify-between'>
                    <button className='flex items-center shadow-md bg-orange-500 rounded-lg px-5 py-2' onClick={() => props.setTrigger(false)}>Cancel</button>
                    <button className='flex items-center shadow-md bg-sky-500 rounded-lg px-5 py-2' onClick={() => {props.setTrigger(false); props.setBanks(banksArr)}}>Filter</button>
                </div>   
            </div>
        </div>
    
      ) : "";
}

export default BankFilter
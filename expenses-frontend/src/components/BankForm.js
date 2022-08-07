import React, { useState, useEffect } from 'react'

function Popup(props) {
  const [newBank, setNewBank] = useState([]);

  const handeFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewBank((values)=>{
        return{
            ...values,
            [name]: value
        };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Bank data: ${newBank.bankName} ${newBank.userName} ${newBank.amount}`)
    setNewBank([])
    props.setTrigger(false)
  };

  return (props.trigger) ? (
    <div className='fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-40'>
        <div className='relative p-8 bg-white rounded-md'>
            <form className='flex flex-col' onSubmit={handleSubmit}>
              <h1 className='text-center font-bold mb-6 text-xl'>Add Bank</h1>
              <label>Bank Name</label>
              <input className=' mb-6 shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                type="text"
                value={newBank.bankName || ""}
                onChange={handeFormChange} 
                name='bankName'
                placeholder="Banco Central" required/>
              <label>User Name</label>
              <input className=' mb-6 shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                type="text"
                value={newBank.userName || ""}
                onChange={handeFormChange}
                name='userName'
                placeholder="John Doe" required/>
              <label>Amount</label>
              <input className=' mb-6 shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                type="number"
                value={newBank.amount || ""}
                onChange={handeFormChange}
                name='amount'
                placeholder="3000.00" required/>
              <div className='flex flex-row justify-between'>
                <button className='flex items-center shadow-md bg-red-500 rounded-lg px-5 py-2' onClick={() => props.setTrigger(false)}>Cancel</button>
                <input className='flex items-center shadow-md bg-green-500 rounded-lg px-5 py-2' type='submit' value='Add'/>
              </div>
            </form>
        </div>
    </div>

  ) : "";
}

export default Popup
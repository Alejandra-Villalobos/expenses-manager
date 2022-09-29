import React, { useState } from 'react'
import { useCookies } from 'react-cookie';

function Popup(props) {
  const [cookies] = useCookies(['auth_token']);
  const [newBank, setNewBank] = useState([]);
  const [disableSubmit, setDisableSubmit] = useState(false);

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

  const createBank = async (body) => {
    const response = await fetch(
      `http://localhost:8500/bank`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.auth_token}`,
        },
        body: JSON.stringify(body),
      }
    );
    await response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const account = newBank.bankAccount;
    const name = newBank.bankName;
    const currency = newBank.currency;
    const amount = newBank.amount;
    const user_name = newBank.userName;
    try {
        await createBank({ account, name, currency, amount, user_name })
        setNewBank([])
        props.setTrigger(false)
    } catch (error) {
      console.log(error);
    }
    setDisableSubmit(false);
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
              <label>Bank Account</label>
              <input className=' mb-6 shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                type="text"
                value={newBank.bankAccount || ""}
                onChange={handeFormChange} 
                name='bankAccount'
                placeholder="ABC45678" required/>
              <label>User Name</label>
              <input className=' mb-6 shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                type="text"
                value={newBank.userName || ""}
                onChange={handeFormChange}
                name='userName'
                placeholder="John Doe" required/>
              <label>Currency and Amount</label>
              <div className='flex flex-row'>
              <select className='mr-3 mb-6 shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-max p-2.5'
                    value={newBank.currency || ""}
                    onChange={handeFormChange}
                    name='currency'
                    required>
                        <option value="" disabled selected>Currency</option>
                        <option value="dollar">$ (Dollar)</option>
                        <option value="euro">€ (Euro)</option>
                        <option value="bitcoin">₿ (Bitcoin)</option>
                  </select>
              <input className=' mb-6 shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-max p-2.5'
                type="number"
                value={newBank.amount || ""}
                onChange={handeFormChange}
                name='amount'
                placeholder="3000.00" required/>
              </div>
              <div className='flex flex-row justify-between'>
                <button className='flex items-center shadow-md bg-red-500 rounded-lg px-5 py-2' onClick={() => props.setTrigger(false)}>Cancel</button>
                <input disabled={disableSubmit} className='flex items-center shadow-md bg-green-500 rounded-lg px-5 py-2' type='submit' value='Add'/>
              </div>
            </form>
        </div>
    </div>

  ) : "";
}

export default Popup
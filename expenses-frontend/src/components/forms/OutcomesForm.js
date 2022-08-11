import React, { useState } from 'react'

function OutcomesForm(props) {
    const [newOutcome, setNewOutcome] = useState([]);

    //Toggle transfer to account option
    const [transactionTo, setTransactionTo] = useState(false);

    const handeFormChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setNewOutcome((values)=>{
            return{
                ...values,
                [name]: value
            };
        });
    };

    const handleChecked = (e) => {
        e.target.checked ? setTransactionTo(true) : setTransactionTo(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Outcome data: ${newOutcome.fromBankName} ${newOutcome.toAccount} ${newOutcome.toUserBank} ${newOutcome.amount} ${newOutcome.outcomeCategory} ${newOutcome.outcomeDescription}`)
        setNewOutcome([])
        setTransactionTo(false)
        props.setTrigger(false)
    };
    
    return (props.trigger) ? (
        <div className='z-50 fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-40'>
            <div className='relative p-8 bg-white rounded-md'>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                  <h1 className='text-center font-bold mb-6 text-xl'>Add Outcome</h1>
                  <label>Bank</label>
                  <select className=' mb-6 shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                    value={newOutcome.fromBankName || ""}
                    onChange={handeFormChange}
                    name='fromBankName'
                    required>
                        <option value="" disabled selected>Select a registered bank account</option>
                        <option value="Banco Central - John Doe">#GYHU7841 Banco Central - John Doe</option>
                        <option value="Davivienda - John A. Doe">#ERTG3256 Davivienda - John A. Doe</option>
                  </select>
                  <label className="inline-flex relative items-center cursor-pointer mb-6">
                   <input type="checkbox" onChange={handleChecked} className="sr-only peer"/>
                   <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                   <span className="ml-3 text-sm font-medium text-gray-900">This transaction is for another account</span>
                  </label>
                  {transactionTo &&
                  <div className='flex flex-row items-center mb-6 gap-3'>
                    <div>
                      <label>Account number</label>
                      <input className='shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-max p-2.5'
                        type="text"
                        value={newOutcome.toAccount || ""}
                        onChange={handeFormChange}
                        name='toAccount'
                        placeholder="8465AB23"
                        required/>
                    </div>
                    <div>
                      <label>Bank Account</label>
                      <input className='shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-max p-2.5'
                        type="text"
                        value={newOutcome.toUserBank || ""}
                        onChange={handeFormChange}
                        name='toUserBank'
                        placeholder="Banco Central"
                        required/>
                      </div>
                  </div>}
                  <label>Amount</label>
                  <input className=' mb-6 shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                    type="number"
                    value={newOutcome.amount || ""}
                    onChange={handeFormChange}
                    name='amount'
                    placeholder="3000.00" required/>
                  <label>Category</label>
                  <select className=' mb-6 shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                    value={newOutcome.outcomeCategory || ""}
                    onChange={handeFormChange}
                    name='outcomeCategory'
                    required>
                        <option value="" disabled selected>Select a category</option>
                        <option value="food">Food</option>
                        <option value="travel">Travel</option>
                        <option value="work">Work</option>
                        <option value="gift">Gift</option>
                        <option value="selling">Selling</option>
                        <option value="other">Other</option>
                  </select>
                  <label>Description (optional)</label>
                  <input className=' mb-6 shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                    type="text"
                    value={newOutcome.outcomeDescription || ""}
                    onChange={handeFormChange}
                    name='outcomeDescription'
                    placeholder="Dinner payment from Jane"/>
                  
                  <div className='flex flex-row justify-between'>
                    <button className='flex items-center shadow-md bg-red-500 rounded-lg px-5 py-2' onClick={() => {props.setTrigger(false); setTransactionTo(false)}}>Cancel</button>
                    <input className='flex items-center shadow-md bg-green-500 rounded-lg px-5 py-2' type='submit' value='Add'/>
                  </div>
                </form>
            </div>
        </div>
    
      ) : "";
    }

export default OutcomesForm
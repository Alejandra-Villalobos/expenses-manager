import React, { useState } from 'react'

function IncomesForm(props) {
    const [newIncome, setNewIncome] = useState([]);

    const handeFormChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setNewIncome((values)=>{
            return{
                ...values,
                [name]: value
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Income data: ${newIncome.bankName} ${newIncome.amount} ${newIncome.incomeCategory} ${newIncome.incomeDescription}`)
        setNewIncome([])
        props.setTrigger(false)
    };
    return (props.trigger) ? (
        <div className='fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-40'>
            <div className='relative p-8 bg-white rounded-md'>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                  <h1 className='text-center font-bold mb-6 text-xl'>Add Income</h1>
                  <label>Bank</label>
                  <select className=' mb-6 shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                    value={newIncome.bankName || ""}
                    onChange={handeFormChange}
                    name='bankName'
                    required>
                        <option value="" disabled selected>Select a registered bank account</option>
                        <option value="Banco Central - John Doe">Banco Central - John Doe</option>
                        <option value="Davivienda - John A. Doe">Davivienda - John A. Doe</option>
                  </select>
                  <label>Amount</label>
                  <input className=' mb-6 shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                    type="number"
                    value={newIncome.amount || ""}
                    onChange={handeFormChange}
                    name='amount'
                    placeholder="3000.00" required/>
                  <label>Category</label>
                  <select className=' mb-6 shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                    value={newIncome.incomeCategory || ""}
                    onChange={handeFormChange}
                    name='incomeCategory'
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
                    value={newIncome.incomeDescription || ""}
                    onChange={handeFormChange}
                    name='incomeDescription'
                    placeholder="Dinner payment from Jane"/>
                  
                  <div className='flex flex-row justify-between'>
                    <button className='flex items-center shadow-md bg-red-500 rounded-lg px-5 py-2' onClick={() => props.setTrigger(false)}>Cancel</button>
                    <input className='flex items-center shadow-md bg-green-500 rounded-lg px-5 py-2' type='submit' value='Add'/>
                  </div>
                </form>
            </div>
        </div>
    
      ) : "";
    }
    

export default IncomesForm
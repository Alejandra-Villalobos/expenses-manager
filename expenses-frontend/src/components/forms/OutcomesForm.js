import { useCookies } from 'react-cookie';
import React, { useState, useEffect } from 'react'

function OutcomesForm(props) {
    const [cookies] = useCookies(['auth_token']);
    const [newOutcome, setNewOutcome] = useState([]);
    const [banks, setBanks] = useState([]);
    const [disableSubmit, setDisableSubmit] = useState(false);
    
    //Toggle transfer to account option
    const [transactionTo, setTransactionTo] = useState(false);

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

    const createOutcome = async (body) => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/outcome`,
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

    const handleChecked = (e) => {
        e.target.checked ? setTransactionTo(true) : setTransactionTo(false)
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      const category = newOutcome.outcomeCategory;
      const description = newOutcome.outcomeDescription;
      const amount = newOutcome.amount;
      const bank = newOutcome.bankId;
      const to_account = newOutcome.toAccount;
      const to_bank = newOutcome.toUserBank;
        try {
          await createOutcome({ category, description, amount, bank, to_account, to_bank })
          setNewOutcome([])
          props.setTrigger(false)
      } catch (error) {
        console.log(error);
      }
      setDisableSubmit(false);
    };
    
    return (props.trigger) ? (
        <div className='z-50 fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-40'>
            <div className='relative p-8 bg-white rounded-md'>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                  <h1 className='text-center font-bold mb-6 text-xl'>Add Outcome</h1>
                  <label>Bank</label>
                  <select className=' mb-6 shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                    value={newOutcome.bankId || ""}
                    onChange={handeFormChange}
                    name='bankId'
                    required>
                        <option value="" disabled selected>Select a registered bank account</option>
                        {banks.map((bank) => 
                          <option value={bank.id}>#{bank.account} {bank.name}-{bank.user_name}</option>)
                        }   
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
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Work">Work</option>
                        <option value="Gift">Gift</option>
                        <option value="Selling">Selling</option>
                        <option value="Other">Other</option>
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
                    <input disabled={disableSubmit} className='flex items-center shadow-md bg-green-500 rounded-lg px-5 py-2' type='submit' value='Add'/>
                  </div>
                </form>
            </div>
        </div>
    
      ) : "";
    }

export default OutcomesForm
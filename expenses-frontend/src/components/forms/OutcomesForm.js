import { useCookies } from 'react-cookie';
import React, { useState, useEffect } from 'react'

function OutcomesForm(props) {
    const [cookies] = useCookies(['auth_token']);

    const [newOutcome, setNewOutcome] = useState([]);

    const [banks, setBanks] = useState([]);
    const [AllBanks, setAllBanks] = useState([]);

    const [disableSubmit, setDisableSubmit] = useState(false);

    const [error, setErrot] = useState('');
    
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

    const getAllBanks = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/bank_all`,
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
        const allBanksData = await getAllBanks();
        setBanks(banksData.data);
        setAllBanks(allBanksData.data);
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

    const createExternalIncome = async (body, bank) => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/income/${bank}`,
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

    const sumAmount = async (body, id) => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/bank/${id}`,
        {
          method: 'PUT',
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
      const category = newOutcome.outcomeCategory;
      const description = newOutcome.outcomeDescription;
      const amount = newOutcome.amount;
      const bank = newOutcome.bankId;
      const to_account = newOutcome.toAccount;
      const to_bank = newOutcome.toUserBank;

      const restAmount = `-${amount}`;
      const sendBank = AllBanks.filter((bank) => bank.name === to_bank && bank.account === to_account);
      const fromBank = banks.filter((b) => Number(b.id) === Number(newOutcome.bankId));

      if(fromBank[0].amount < amount){
        setErrot('Not enough money');
        return
      }
        try { 
          if(to_account && to_bank && sendBank){ 
              const sendId = sendBank[0].id;
              const sendPerson = sendBank[0].person;
              const inDescription = `Transfered from ${fromBank[0].name} - ${fromBank[0].user_name} - #${fromBank[0].account}`
              
              const sendCurr = sendBank[0].currency;
              const fromCurr = fromBank[0].currency;
              var amountConversion = amount;

              if(fromCurr === sendCurr) amountConversion=amountConversion;

              else if (fromCurr === 'bitcoin' && sendCurr === 'dollar') amountConversion*= 19265.2;
              else if (fromCurr === 'bitcoin' && sendCurr === 'euro') amountConversion *= 19581.4;

              else if (fromCurr === 'dollar' && sendCurr === 'bitcoin') amountConversion *= 0.000053;
              else if (fromCurr === 'dollar' && sendCurr === 'euro') amountConversion *= 1.02;

              else if (fromCurr === 'euro' && sendCurr === 'bitcoin') amountConversion *= 0.000052;
              else if (fromCurr === 'euro' && sendCurr === 'dollar') amountConversion *= 0.98;
              

              await createExternalIncome({ category, 'description': inDescription, 'amount': amountConversion, 'person': sendPerson }, sendId)
              await sumAmount({ 'amount': amountConversion }, sendId)
          }
            await createOutcome({ category, description, amount, bank, to_account, to_bank })
            await sumAmount({ 'amount': restAmount }, bank) 
            props.setTrigger(false)
            window.location.reload(false);
            setDisableSubmit(false);
            setNewOutcome([])
      } catch (error) {
        console.log(error);
        setErrot('Banco no encontrado');
        console.log(sendBank)
      }
      setDisableSubmit(false);
      setNewOutcome([])
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
                          <option key={bank.id} value={bank.id}>#{bank.account} {bank.name}-{bank.user_name}</option>)
                        }   
                  </select>
                  <label className="inline-flex relative items-center cursor-pointer mb-6">
                   <input type="checkbox" onChange={handleChecked} className="sr-only peer"/>
                   <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                   <span className="ml-3 text-sm font-medium text-gray-900">This transaction is for another account</span>
                  </label>
                  {error && <p className='text-red-700 bg-red-200 text-center mb-3 font-bold'>{error}</p>}
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
                    <button className='flex items-center shadow-md bg-red-500 rounded-lg px-5 py-2' onClick={() => {props.setTrigger(false); setTransactionTo(false); setErrot('')}}>Cancel</button>
                    <input disabled={disableSubmit} className='flex items-center shadow-md bg-green-500 rounded-lg px-5 py-2' type='submit' value='Add'/>
                  </div>
                </form>
            </div>
        </div>
    
      ) : "";
    }

export default OutcomesForm
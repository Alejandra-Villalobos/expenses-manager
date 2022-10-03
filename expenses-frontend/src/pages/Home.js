import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import SideMenu from '../components/SideMenu.js'
import NavBar from '../components/NavBar.js'
import IncomesForm from '../components/forms/IncomesForm'
import OutcomesForm from '../components/forms/OutcomesForm'
import ShowBanks from '../components/ShowBanks.js'
import ShowTransactions from '../components/ShowTransactions.js'
import BankChart from '../components/charts/BankChart.js'
import CategoryChart from '../components/charts/CategoryChart.js'

import AuthContext from '../context/auth-context';

const Home = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (Object.entries(authCtx.currentUser).length == 0) {
      navigate('/', { replace: true });
    }
  }, []);
  
  //Toggle side menu
  const [showMenu, setShowMenu] = useState(true);

  //Toggle incomes/outcomes forms
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showOutcomeForm, setShowOutcomeForm] = useState(false);

  //Page height to set the side menu height
  const viewHeight = window.outerHeight;

  return (
    <>
    <NavBar setState={setShowMenu} state={showMenu}/>
    <div className='flex flex-row bg-emerald-100 mt-14 h-full w-full overflow-x-hidden'>
    {showMenu && <SideMenu  style={{ height: viewHeight }}/>}
      <div className='w-full pl-16 pr-8 mt-8'>
      <h1 className='text-center font-bold text-2xl w-full'>Dashboard</h1>
        <section className='mt-8 flex flex-row justify-between'>
          <BankChart/>
          <CategoryChart/>
        </section>
        <section className='justify-center gap-3 flex mt-12'>
          <button onClick={() => setShowOutcomeForm(true)} className='bg-green-500 border-2 rounded-lg border-white p-4 shadow-md'>Add Expense</button>
          <OutcomesForm trigger={showOutcomeForm} setTrigger={setShowOutcomeForm}/>
          <button onClick={() => setShowIncomeForm(true)} className='bg-blue-500 border-2 rounded-lg border-white p-4 shadow-md'>Add Income</button>
          <IncomesForm trigger={showIncomeForm} setTrigger={setShowIncomeForm}/>
        </section>
        <section className='mt-12'>
          <h2 className='text-center font-bold text-2xl'>Bank Accounts</h2>
          <ShowBanks/>
        </section>
        <section className='mt-12 mb-8 flex flex-col justify-center'>
          <h2 className='text-center font-bold text-2xl'>Transactions</h2>
          <ShowTransactions categories={null} from={null} to={null} banks={null}/>
        </section>
      </div>
    </div>
    </>
  )
}

export default Home
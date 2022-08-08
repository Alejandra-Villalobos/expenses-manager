import React, { useState } from 'react'
import SideMenu from '../components/SideMenu.js'
import NavBar from '../components/NavBar.js'
import IncomesForm from '../components/IncomesForm.js'
import OutcomesForm from '../components/OutcomesForm.js'
import ShowBanks from '../components/ShowBanks.js'
import ShowTransactions from '../components/ShowTransactions.js'

const Home = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showOutcomeForm, setShowOutcomeForm] = useState(false);

  return (
    <>
    <NavBar setState={setShowMenu} state={showMenu}/>
    <div className='flex flex-row bg-emerald-100 mt-14'>
    {showMenu && <SideMenu/>}
      <div className='w-full'>
        <section className='mt-8'>
          <h1 className='text-center font-bold text-2xl'>Dashboard</h1>
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
        <section className='mt-12'>
          <h2 className='text-center font-bold text-2xl'>Transactions</h2>
          <ShowTransactions/>
        </section>
      </div>
    </div>
    </>
  )
}

export default Home
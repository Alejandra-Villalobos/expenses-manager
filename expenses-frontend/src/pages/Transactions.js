import React, { useState } from 'react'
import SideMenu from '../components/SideMenu.js'
import NavBar from '../components/NavBar.js'
import IncomesForm from '../components/forms/IncomesForm.js'
import OutcomesForm from '../components/forms/OutcomesForm.js'
import ShowTransactions from '../components/ShowTransactions.js'

function Transactions() {
  const [showMenu, setShowMenu] = useState(true)
  const [showIncomeForm, setShowIncomeForm] = useState(false)
  const [showOutcomeForm, setShowOutcomeForm] = useState(false)

  return (
    <>
    <NavBar setState={setShowMenu} state={showMenu}/>
    <div className='flex flex-row bg-emerald-100 mt-14 h-full w-screen'>
    {showMenu && <SideMenu/>}
    <div className='w-full bg-emerald-100 h-screen'>
      <h1 className='text-center mt-8 font-bold text-2xl'>Transactions</h1>
      <section className='flex flex-row justify-center items-center gap-x-5 mt-8'>
        <button onClick={() => setShowOutcomeForm(true)} className='bg-green-500 border-2 rounded-lg border-white p-4 shadow-md'>Add Expense</button>
        <OutcomesForm trigger={showOutcomeForm} setTrigger={setShowOutcomeForm}/>
        <button onClick={() => setShowIncomeForm(true)} className='bg-blue-500 border-2 rounded-lg border-white p-4 shadow-md'>Add Income</button>
        <IncomesForm trigger={showIncomeForm} setTrigger={setShowIncomeForm}/>
      </section>
        <section className='flex flex-row mt-8 gap-x-5 items-center'>
          <p className='ml-8 font-bold text-xl'>Sort by:</p>
          <button className='bg-red-500 border-2 rounded-lg border-white p-4 shadow-md'>Date</button>
          <button className='bg-orange-400 border-2 rounded-lg border-white p-4 shadow-md'>Category</button>
          <button className='bg-yellow-300 border-2 rounded-lg border-white p-4 shadow-md'>Bank</button>
        </section>
        <ShowTransactions/>
      </div>
    </div>
    </>
  )
}

export default Transactions
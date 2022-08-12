import React, { useState } from 'react'

import { VscDebugRestart } from 'react-icons/vsc'

import SideMenu from '../components/SideMenu.js'
import NavBar from '../components/NavBar.js'

import IncomesForm from '../components/forms/IncomesForm.js'
import OutcomesForm from '../components/forms/OutcomesForm.js'

import ShowTransactions from '../components/ShowTransactions.js'

import DateFilter from '../components/filters/DateFilter.js'
import CategoryFilter from '../components/filters/CategoryFilter.js'
import BankFilter from '../components/filters/BankFilter.js'

function Transactions() {
  //Toggle side menu
  const [showMenu, setShowMenu] = useState(true)

  //Toggle incomes/outcomes forms
  const [showIncomeForm, setShowIncomeForm] = useState(false)
  const [showOutcomeForm, setShowOutcomeForm] = useState(false)

  const [showDataFilter, setShowDataFilter] = useState(false)
  const [showCategoryFilter, setShowCategoryFilter] = useState(false)
  const [showBankFilter, setShowBankFilter] = useState(false)


  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [categories, setCategories] = useState(null);
  const [banks, setBanks] = useState(null);


  //Page height to set the side menu height
  const viewHeight = window.outerHeight;

  return (
    <>
    <NavBar setState={setShowMenu} state={showMenu}/>
    <div className='flex flex-row bg-emerald-100 mt-14 h-full w-screen'>
    {showMenu && <SideMenu style={{ height: viewHeight }}/>}
    <div className='w-full bg-emerald-100 h-full'>
      <h1 className='text-center mt-8 font-bold text-2xl'>Transactions</h1>
      <section className='flex flex-row justify-center items-center gap-x-5 mt-8'>
        <button onClick={() => setShowOutcomeForm(true)} className='bg-green-500 border-2 rounded-lg border-white p-4 shadow-md'>Add Expense</button>
        <OutcomesForm trigger={showOutcomeForm} setTrigger={setShowOutcomeForm}/>
        <button onClick={() => setShowIncomeForm(true)} className='bg-blue-500 border-2 rounded-lg border-white p-4 shadow-md'>Add Income</button>
        <IncomesForm trigger={showIncomeForm} setTrigger={setShowIncomeForm}/>
      </section>
        <section className='flex flex-row mt-8 gap-x-5 items-center w-full'>
          <p className='ml-8 font-bold text-xl'>Sort by:</p>
          <button onClick={() => setShowDataFilter(true)} className='bg-red-500 border-2 rounded-lg border-white p-4 shadow-md'>Date</button>
          <DateFilter trigger={showDataFilter} setTrigger={setShowDataFilter} setFrom={setFrom} setTo={setTo}/>
          <button onClick={() => setShowCategoryFilter(true)} className='bg-orange-400 border-2 rounded-lg border-white p-4 shadow-md'>Category</button>
          <CategoryFilter trigger={showCategoryFilter} setTrigger={setShowCategoryFilter} setCategories={setCategories}/>
          <button onClick={() => setShowBankFilter(true)} className='bg-yellow-300 border-2 rounded-lg border-white p-4 shadow-md'>Bank</button>
          <BankFilter  trigger={showBankFilter} setTrigger={setShowBankFilter} setBanks={setBanks}/>
          <button onClick={() => {setFrom(null); setTo(null); setCategories(null); setBanks(null)}}
            className='flex items-center gap-3 justify-end'>Restart filters <VscDebugRestart size={20} className='hover:-rotate-90 transition-all'/></button>
        </section>
        <ShowTransactions categories={categories} from={from} to={to} banks={banks}/>
      </div>
    </div>
    </>
  )
}

export default Transactions
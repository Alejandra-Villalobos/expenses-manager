import React, { useState } from 'react'
import SideMenu from '../components/SideMenu.js'
import NavBar from '../components/NavBar.js'
import BankForm from '../components/BankForm.js'
import { MdAddCircle } from 'react-icons/md'

const Banks = () => {
  const [showMenu, setShowMenu] = useState(true)
  const [showBankForm, setShowBankForm] = useState(false)
  return (
    <>
    <NavBar setState={setShowMenu} state={showMenu}/>
    <div className='flex flex-row'>
    {showMenu && <SideMenu/>}
      <div className='w-full'>
        <section className='flex flex-row justify-center items-center gap-x-5 mt-8'>
          <h1 className='font-bold text-2xl'>Bank Accounts</h1>
          <button onClick={()=>setShowBankForm(true)}><MdAddCircle size={25}/></button>
          <BankForm trigger={showBankForm} setTrigger={setShowBankForm}/>
        </section>
      </div>
    </div>
    </>
  )
}

export default Banks
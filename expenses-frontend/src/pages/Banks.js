import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { MdAddCircle } from 'react-icons/md'

import SideMenu from '../components/SideMenu.js'
import NavBar from '../components/NavBar.js'
import BankForm from '../components/forms/BankForm'
import ShowBanks from '../components/ShowBanks.js'

import AuthContext from '../context/auth-context';

const Banks = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (Object.entries(authCtx.currentUser).length == 0) {
      navigate('/', { replace: true });
    }
  }, []);
  //Toggle side menu
  const [showMenu, setShowMenu] = useState(true)

  //Toggle add banks form
  const [showBankForm, setShowBankForm] = useState(false)

  //Page height to set the side menu height
  const viewHeight = window.outerHeight;

  return (
    <>
    <NavBar setState={setShowMenu} state={showMenu}/>
    <div className='flex flex-row bg-emerald-100 mt-14 h-screen'>
    {showMenu && <SideMenu style={{ height: viewHeight }}/>}
      <div className='w-full'>
        <section className='flex flex-row justify-center items-center gap-x-5 mt-8'>
          <h1 className='font-bold text-2xl'>Bank Accounts</h1>
          <button onClick={()=>setShowBankForm(true)}><MdAddCircle size={25}/></button>
          <BankForm trigger={showBankForm} setTrigger={setShowBankForm}/>
        </section>
        <ShowBanks/>
      </div>
    </div>
    </>
  )
}

export default Banks
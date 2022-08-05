import React, { useState } from 'react'
import SideMenu from '../components/SideMenu.js'
import NavBar from '../components/NavBar.js'
import { MdAddCircle } from 'react-icons/md'

const Banks = () => {
  const [showMenu, setShowMenu] = useState(true)
  return (
    <>
    <NavBar setState={setShowMenu} state={showMenu}/>
    <div className='flex flex-row'>
    {showMenu && <SideMenu/>}
      <div className='w-full'>
        <section className='flex flex-row justify-center items-center gap-x-5 mt-8'>
          <h1>Bank Accounts</h1>
          <button><MdAddCircle size={25}/></button>
        </section>
        <section className='flex justify-center mt-8'>
          <h2>Banks</h2>
        </section>
      </div>
    </div>
    </>
  )
}

export default Banks
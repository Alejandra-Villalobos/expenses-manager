import React, { useState } from 'react'
import SideMenu from '../components/SideMenu.js'
import NavBar from '../components/NavBar.js'

const Banks = () => {
  const [showMenu, setShowMenu] = useState(true)
  return (
    <>
    <NavBar setState={setShowMenu} state={showMenu}/>
    <div className='flex flex-row'>
    {showMenu && <SideMenu/>}
      <h1>Bank Accounts</h1>
      <button>Add bank</button>
      <section>
        <h2>Banks</h2>
      </section>
    </div>
    </>
  )
}

export default Banks
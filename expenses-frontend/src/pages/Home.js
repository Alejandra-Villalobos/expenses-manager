import React, { useState } from 'react'
import SideMenu from '../components/SideMenu.js'
import NavBar from '../components/NavBar.js'

const Home = () => {
  const [showMenu, setShowMenu] = useState(true)
  return (
    <>
    <NavBar setState={setShowMenu} state={showMenu}/>
    <div className='flex flex-row'>
    {showMenu && <SideMenu/>}
      <h1>Dashboard</h1>
      <section>
        <button>Add Expense</button>
        <button>Add Income</button>
      </section>
      <section>
        <h2>Bank Accounts</h2>
      </section>
    </div>
    </>
  )
}

export default Home
import React from 'react'
import SideMenu from '../components/SideMenu.js'
import NavBar from '../components/NavBar.js'

const Banks = () => {
  return (
    <>
    <NavBar/>
    <SideMenu/>
    <div>
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
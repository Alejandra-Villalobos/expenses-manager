import React from 'react'
import SideMenu from './SideMenu.js'
import NavBar from './NavBar.js'

const Home = () => {
  return (
    <>
    <NavBar/>
    <SideMenu/>
    <div>
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
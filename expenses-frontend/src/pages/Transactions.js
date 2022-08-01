import React from 'react'
import SideMenu from '../components/SideMenu.js'
import NavBar from '../components/NavBar.js'


function Transactions() {
  return (
    <>
    <NavBar/>
    <SideMenu/>
    <div>
      <h1>Transactions</h1>
      <button>Add expense</button>
      <button>Add income</button>
      <section>
        <p>Sort by:</p>
        <button>Date</button>
        <button>Category</button>
        <button>Bank</button>
      </section>
    </div>
    </>
  )
}

export default Transactions
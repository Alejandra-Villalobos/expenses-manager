import React from 'react'
import { useState } from 'react'
import { Outlet, Link } from "react-router-dom"

const SideMenu = () => {
  return (
    <>
    <div>
      <button><Link to={'/home'}>Dashboard</Link></button>
      <button><Link to={'/banks'}>Bank Accounts</Link></button>
      <button><Link to={'/transactions'}>Transactions</Link></button>
    </div>
    <Outlet/>
    </>
  )
}

export default SideMenu
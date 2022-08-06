import React from 'react'
import { FiMenu } from 'react-icons/fi'

function NavBar({ setState, state }) {
  return (
    <nav className='flex flex-row justify-between bg-cyan-500 py-3'>
      <button className='ml-11' onClick={() => setState(!state)}><FiMenu/></button>
      <p>Expenses Manager</p>
      <div className='mr-11'>
        Profile
      </div>
    </nav>
  )
}

export default NavBar
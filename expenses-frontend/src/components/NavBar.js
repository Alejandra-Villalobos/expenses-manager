import React from 'react'
import { FiMenu } from 'react-icons/fi'
import { TbLogout } from 'react-icons/tb'

function NavBar({ setState, state }) {
  return (
    <nav className='flex flex-row justify-between shadow-md bg-cyan-500 py-2 border-b-2 border-cyan-600 items-center'>
      <button className='ml-11' onClick={() => setState(!state)}><FiMenu/></button>
      <p>Expenses Manager</p>
      <button className='flex items-center mr-11 gap-x-2 bg-red-500 rounded-lg p-2'>
        Cerrar Sesión
        <TbLogout/>
      </button>
    </nav>
  )
}

export default NavBar
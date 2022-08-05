import React from 'react'

function NavBar({ setState, state }) {
  return (
    <nav className='flex flex-row justify-between bg-green-600'>
      <button className='ml-11' onClick={() => setState(!state)}>=</button>
      <p>EM</p>
      <div className='mr-11'>
        Profile
      </div>
    </nav>
  )
}

export default NavBar
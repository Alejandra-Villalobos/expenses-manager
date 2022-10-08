import React from 'react'
import { useContext, useState } from 'react';
import AuthContext from '../context/auth-context';
import { FiMenu } from 'react-icons/fi'
import { TbLogout } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom';

function NavBar({ setState, state }) {
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const HandleLogout = async () => {
    setError('');
    try {
      await authCtx.logout();
      navigate('/', { replace: true });
    } catch {
      setError('Failed to log out');
    }
  };

  return (
    <nav className='z-40 flex flex-row justify-between shadow-md bg-cyan-500 py-2 border-b-2 border-cyan-600 items-center fixed top-0 left-0 w-screen'>
      <button className='ml-11' onClick={() => setState(!state)}><FiMenu/></button>
      <p className='font-bold text-2xl'>Expenses Manager</p>
      <button className='flex items-center mr-11 gap-x-2 bg-red-500 rounded-lg p-2' onClick={HandleLogout}>
        Cerrar Sesión
        {error}
        <TbLogout/>
      </button>
    </nav>
  )
}

export default NavBar
import { Outlet, Link } from "react-router-dom"
import { AiOutlineDashboard } from 'react-icons/ai'
import { BsBank } from 'react-icons/bs'
import { GrTransaction } from 'react-icons/gr'

const SideMenu = () => {
  const path = window.location.pathname
  return (
    <>
    <div className='flex flex-col w-24 h-screen bg-cyan-600'>
      <Link to={'/home'} className={`flex flex-col p-5 border-2 border-cyan-700 hover:bg-cyan-700 ${path === '/home' ? 'bg-cyan-700' : ''}`}>
        <button className='flex flex-col items-center '>
          <AiOutlineDashboard/>
          Dashboard
        </button>
      </Link>
      <Link to={'/banks'} className={`flex flex-col p-5 border-b-2 border-cyan-700 border-l-2 border-r-2 hover:bg-cyan-700 ${path === '/banks' ? 'bg-cyan-700' : ''}`}>
        <button className='flex flex-col items-center '>
          <BsBank/>
          Bank Accounts
        </button>
      </Link>
      <Link to={'/transactions'} className={`flex flex-col p-5 border-b-2 border-cyan-700 border-l-2 border-r-2 hover:bg-cyan-700 ${path === '/transactions' ? 'bg-cyan-700' : ''}`}>
        <button className='flex flex-col items-center '>
          <GrTransaction/>
          Transactions
        </button>
      </Link>
    </div>
    <Outlet/>
    </>
  )
}

export default SideMenu
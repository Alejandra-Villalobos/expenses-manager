import React from 'react'

function Popup(props) {
  return (props.trigger) ? (
    <div className='fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-40'>
        <div className='relative p-8 bg-teal-500 rounded-md'>
            <form className='flex flex-col'>
              <label>Bank Name</label>
              <input className='rounded mb-6' type="text"  name='bankName'/>
              <label>User Name</label>
              <input className='rounded mb-6' type="text"  name='userName'/>
              <label>Amount</label>
              <input className='rounded mb-6' type="number" name='amount'/>
              <div className='flex flex-row justify-between'>
                <button className='flex items-center shadow-md bg-red-500 rounded-lg px-5 py-2' onClick={() => props.setTrigger(false)}>Cancel</button>
                <input className='flex items-center shadow-md bg-green-500 rounded-lg px-5 py-2' type='submit' value='Add'/>
              </div>
            </form>
        </div>
    </div>

  ) : "";
}

export default Popup
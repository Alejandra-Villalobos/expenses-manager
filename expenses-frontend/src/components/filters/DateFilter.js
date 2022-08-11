import React, { useState } from 'react'
import DatePicker from 'react-date-picker';

const DateFilter = (props) => {
    
    const [from, setFrom] = useState(new Date());
    const [to, setTo] = useState(new Date());

    return (props.trigger) ? (
        <div className='fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-40'>
            <div className='relative p-8 bg-white rounded-md'>
                <div className='flex flex-row gap-5 mb-5'>
                    <div className='flex flex-col'>
                        <label className='text-center'>From:</label>
                        <DatePicker onChange={setFrom} value={from}/>
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-center'>To:</label>
                        <DatePicker onChange={setTo} value={to}/>
                    </div>
                </div>
                <div className='flex flex-row justify-between'>
                    <button className='flex items-center shadow-md bg-orange-500 rounded-lg px-5 py-2' onClick={() => props.setTrigger(false)}>Cancel</button>
                    <button className='flex items-center shadow-md bg-sky-500 rounded-lg px-5 py-2' onClick={() => {props.setTrigger(false); props.setFrom(from); props.setTo(to)}}>Filter</button>
                </div>
            </div>
        </div>
    
      ) : "";
}

export default DateFilter
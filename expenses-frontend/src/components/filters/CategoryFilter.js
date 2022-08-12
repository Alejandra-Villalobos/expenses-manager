import React from 'react'

const CategoryFilter = (props) => {

    var categories = [];

    const handleChecked = (e) => {
        if(e.target.checked) categories.push(e.target.value)
        else categories.filter((cat) => cat !== e.target.value)

    }

    return (props.trigger) ? (
        <div className='fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-40'>
            <div className='relative p-8 bg-white rounded-md w-64'>
                <div className='flex flex-row items-center justify-evenly flex-wrap mb-5 gap-5'>
                    <label>Food</label><input value='Food' type="checkbox" onChange={handleChecked}/>
                    <label>Travel</label><input value='Travel' type="checkbox" onChange={handleChecked}/>
                    <label>Work</label><input value='Work' type="checkbox" onChange={handleChecked}/>
                    <label>Gift</label><input value='Gift' type="checkbox" onChange={handleChecked}/>
                    <label>Selling</label><input value='Selling' type="checkbox" onChange={handleChecked}/>
                    <label>Other</label><input value='Other' type="checkbox" onChange={handleChecked}/>
                </div>
                <div className='flex flex-row justify-between'>
                    <button className='flex items-center shadow-md bg-orange-500 rounded-lg px-5 py-2' onClick={() => props.setTrigger(false)}>Cancel</button>
                    <button className='flex items-center shadow-md bg-sky-500 rounded-lg px-5 py-2' onClick={() => {props.setTrigger(false); props.setCategories(categories); console.log(categories)}}>Filter</button>
                </div>   
            </div>
        </div>
    
      ) : "";
}

export default CategoryFilter
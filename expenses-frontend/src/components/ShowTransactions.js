import React, { useState, useEffect } from 'react'
import { ImMinus } from 'react-icons/im'
import { BiPlusMedical } from 'react-icons/bi'
import { BsCurrencyBitcoin, BsCurrencyDollar, BsCurrencyEuro } from 'react-icons/bs'


function ShowTransactions() {
    var [transactions, setTransactions] = useState([])
    const setCur = (curr) => {
      if(curr === 'dollar') return <BsCurrencyDollar/>
      else if (curr === 'euro') return <BsCurrencyEuro/>
      else if (curr === 'bitcoin') return <BsCurrencyBitcoin/>
    }
    const prop = {
      out: {
        "bg-border": 'border-red-600 bg-red-300',
        "type": "Outcome", 
        "p-bg": 'bg-red-600',
        "symbol": <ImMinus color='red'/>
      },
      in: {
        "bg-border": 'border-green-600 bg-green-300',
        "type": "Income", 
        "p-bg": 'bg-green-600',
        "symbol": <BiPlusMedical color='green'/>
      }
    }

    useEffect(()=>{
      async function getTransactions(){
        const transactionsData = await fetch('banks.json', {method: "GET"})
        const data = await transactionsData.json()
        setTransactions(data[0].outcomes.concat(data[0].incomes))
      }
      getTransactions()
      
    }, [])
    transactions = transactions.sort((a,b)=> a.date < b.date ? 1 : -1)
    return (
      <>
      <div className='flex flex-row justify-between flex-wrap mr-3 ml-3'>
            {transactions.map((transaction, i)=>
              <div key={i} className={`mt-5 ml-2 rounded-md border-2 shadow-md ${transaction.hasOwnProperty('toAccount') ? prop.out['bg-border'] : prop.in['bg-border'] }`}>
                <p className={`text-white font-bold font-fira text-cente px-12 ${transaction.hasOwnProperty('toAccount') ? prop.out['p-bg'] : prop.in['p-bg'] }`}>{transaction.hasOwnProperty('toAccount') ? prop.out.type : prop.in.type }</p>
                <p className='font-fira font-bold text-lg text-center flex items-center justify-center gap-1'>
                {transaction.hasOwnProperty('toAccount') ? prop.out.symbol : prop.in.symbol} {setCur(transaction.currency)} {transaction.amount}</p>
                <p className='font-fira text-center'>{transaction.category}</p>
                <p className='font-fira text-center'>{transaction.date}</p>
              </div>
            )}
      </div>
      </>
    )
}

export default ShowTransactions
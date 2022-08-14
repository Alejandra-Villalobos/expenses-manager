import React, { useState, useEffect } from 'react'
import { ImMinus } from 'react-icons/im'
import { BiPlusMedical } from 'react-icons/bi'
import { BsCurrencyBitcoin, BsCurrencyDollar, BsCurrencyEuro } from 'react-icons/bs'


function ShowTransactions(props) {
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
        "p-bg": 'bg-red-600 text-center',
        "symbol": <ImMinus color='red'/>
      },
      in: {
        "bg-border": 'border-green-600 bg-green-300',
        "type": "Income", 
        "p-bg": 'bg-green-600 text-center',
        "symbol": <BiPlusMedical color='green'/>
      }
    }

    useEffect(()=>{
      async function getTransactions(){
        const transactionsData = await fetch('banks.json', {method: "GET"})
        const data = await transactionsData.json()
        /*
          Maps the incomes/outcomes in every data and also adds the 'bankName' field, which is included
          only in data, outside incomes/outcomes
        */
        const incomes = data.map((d)=>{
          d.incomes.map((income)=>{
            return income['bankName'] = d.bankName
          }); return d.incomes
        })
        const outcomes = data.map((d)=>{
          d.outcomes.map((outcome)=>{
            return outcome['bankName'] = d.bankName
          }); return d.outcomes
        })
        setTransactions((incomes.concat(outcomes)).flat())
      }
      getTransactions()
    }, [])

    const filterDate = () => {
      return transactions.filter((t)=>(new Date(t.date) <= props.to && new Date(t.date) >= props.from))
    }

    const filterCategory = () => {
      return transactions.filter((t)=>props.categories.includes(t.category))
    }

    const filterBanks = () => {
      return transactions.filter((t)=>props.banks.includes(t.bankName))
    }

    transactions = (props.from === null) || (props.to === null) ? transactions : filterDate()

    transactions = (props.categories === null) || (!props.categories.length) ? transactions : filterCategory()

    transactions = (props.banks === null) || (!props.banks.length) ? transactions : filterBanks()

    transactions = transactions.sort((a,b)=> a.date < b.date ? 1 : -1)
    return (
      <>
      <div className='flex flex-row justify-start flex-wrap mb-8 ml-6 gap-3'>
            {transactions.map((transaction, i)=>
              <div key={i} className={`w-44 mt-5 rounded-md border-2 shadow-md hover:scale-105 hover:ml-4 hover:mr-4 transition-all ${transaction.hasOwnProperty('toAccount') ? prop.out['bg-border'] : prop.in['bg-border'] }`}>
                <p className={`text-white font-bold font-fira text-cente px-12 ${transaction.hasOwnProperty('toAccount') ? prop.out['p-bg'] : prop.in['p-bg'] }`}>{transaction.hasOwnProperty('toAccount') ? prop.out.type : prop.in.type }</p>
                <p>{transaction.bankName}</p>
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
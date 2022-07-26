import React, { useState, useEffect } from 'react'
import { ImMinus } from 'react-icons/im'
import { BiPlusMedical } from 'react-icons/bi'
import { BsCurrencyBitcoin, BsCurrencyDollar, BsCurrencyEuro } from 'react-icons/bs'
import { useCookies } from 'react-cookie';


function ShowTransactions(props) {
    const [cookies] = useCookies(['auth_token']);
    var [transactions, setTransactions] = useState([])
    const [banks, setBanks] = useState([]);

    const setCur = (curr) => {
      if(curr === 'dollar') return <BsCurrencyDollar/>
      else if (curr === 'euro') return <BsCurrencyEuro/>
      else if (curr === 'bitcoin') return <BsCurrencyBitcoin/>
    }

    const getBanks = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/bank`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookies.auth_token}`,
          },
        }
      );
      const banks = await response.json();
      return banks;
    };

    useEffect(()=>{
      async function getUserBanks(){
        const banksData = await getBanks();
        setBanks(banksData.data)
      }
      getUserBanks()
    }, [banks.length])
    
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

    const getIncomes = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/income`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookies.auth_token}`,
          },
        }
      );
      const incomes = await response.json();
      return incomes;
    };

    const getOutcomes = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/outcome`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookies.auth_token}`,
          },
        }
      );
      const outcomes = await response.json();
      return outcomes;
    };

    useEffect(()=>{
      async function getUserTransactions(){
        const incomesData = await getIncomes();
        const outcomesData = await getOutcomes();

        var incomes = incomesData.data;
        
        var outcomes = outcomesData.data;
        
        var added =(incomes.concat(outcomes)).flat()
        added.map((t) => {
          var b = banks.filter((b)=> b.id == t.bank)[0]?.name;
          t.bankName = b})
          setTransactions(added)
      }
      getUserTransactions()
    }, [transactions.length])

    const curSymbol = (transaction) => {
      const transactionBank = banks.filter((b) => Number(b.id) === Number(transaction.bank))
      if (transactionBank[0]?.currency === 'dollar') return '$'
      else if (transactionBank[0]?.currency === 'euro') return '€'
      else return '₿'
    }
    
    const filterDate = () => {
      return transactions.filter((t)=>(new Date(t.add_date) <= props.to && new Date(t.add_date) >= props.from))
    }

    const filterCategory = () => {
      return transactions.filter((t)=>props.categories.includes(t.category))
    }

    const filterBanks = () => {
      
      return transactions.filter((t)=>props.banks.includes(t.bankName))
    }

    const formatDate = (tDate) => {
      tDate = new Date();
      return `${tDate.getMonth()+1}/${tDate.getDate()}/${tDate.getFullYear()}`
    }

    transactions = (props.from === null) || (props.to === null) ? transactions : filterDate()

    transactions = (props.categories === null) || (!props.categories.length) ? transactions : filterCategory()

    transactions = (props.banks === null) || (!props.banks.length) ? transactions : filterBanks()

    transactions = transactions.sort((a,b)=> a.add_date < b.add_date ? 1 : -1)
    
    return (
      <>
      <div className='flex flex-row justify-start flex-wrap mb-8 ml-6 gap-3'>
            {transactions.map((transaction, i)=>
              <div key={i} className={`w-56 mt-5 rounded-md border-2 shadow-md hover:scale-105 hover:ml-4 hover:mr-4 transition-all ${transaction.hasOwnProperty('to_account') ? prop.out['bg-border'] : prop.in['bg-border'] }`}>
                <p className={`text-white font-bold font-fira text-cente px-12 ${transaction.hasOwnProperty('to_account') ? prop.out['p-bg'] : prop.in['p-bg'] }`}>{transaction.hasOwnProperty('to_account') ? prop.out.type : prop.in.type }</p>
                <p className='font-fira font-bold text-md text-center'>{transaction.bankName}</p>
                <p className='font-fira font-bold text-lg text-center flex items-center justify-center gap-1'>
                {transaction.hasOwnProperty('to_account') ? prop.out.symbol : prop.in.symbol} {setCur(transaction.currency)} {curSymbol(transaction)}{transaction.amount.toFixed(2)}</p>
                <p className='font-fira text-center'>{transaction.category}</p>
                <p className='font-fira text-center'>Description: {transaction.description}</p>
                <p className='font-fira text-center'>{formatDate(transaction.add_date)}</p>
                {transaction.to_account != null && <p className='font-fira text-center'>Sent to: #{transaction.to_account} - {transaction.to_bank}</p>}
              </div>
            )}
      </div>
      </>
    )
}

export default ShowTransactions
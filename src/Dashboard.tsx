import React, { useState, useEffect } from 'react';
// import { transactions } from './mockData';
import fetchTransactions from './services';

export interface Transaction {
    id: number;
    date: string;
    description: string;
    amount: number;
}

const Dashboard = () => {
    const [data, setData] = useState<Transaction[]>([]);
    const [filteredData, setFilteredData] = useState<Transaction[]>([]);
    const [error, setError] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const getTransactions = async () => {
        const transactions = await fetchTransactions();
        setData(transactions)
        setFilteredData(transactions)
    }

    useEffect(() => {
        try {
            getTransactions()
        } catch (error) {
            setError('Failed to fetch transactions')
        }
    }, [])

    const handleFilter = () => {
        if (startDate && endDate) {
            const filtered = data.filter(transaction => {
                const transactionDate = new Date(transaction.date).getTime();
                return transactionDate >= new Date(startDate).getTime() && transactionDate <= new Date(endDate).getTime()
            })
            setFilteredData(filtered)
        }
    }

    return (
        <div className='dashboard'>
            <h1>Payment Transactions</h1>
            <div className='filter-section'>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                <button onClick={handleFilter}>Filter</button>
            </div>

            {error ? <p className='error'>{error}</p> : (
              <table className='transaction-table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredData.map(transaction => (
                            <tr key={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.date}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.amount}</td>
                            </tr>
                        ))
                    }
                </tbody>
              </table>  
            )} 
        </div>
    );
}

export default Dashboard;
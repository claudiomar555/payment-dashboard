import { Transaction } from "./Dashboard"
import { transactions } from './mockData';

const fetchTransactions = (): Promise<Transaction[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(transactions)
        }, 1000)
    })
}

export default fetchTransactions;
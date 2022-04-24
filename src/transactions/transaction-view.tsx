import React from 'react'
import { useTransactions } from './transaction-hooks';
import { Transactions } from '../types';

export const findByCategory = (category: string): string => {
  return `category = "${category}"`
}

export const TransactionView: React.FC = () => {
    try {
        useTransactions(
          20,
          undefined,
          findByCategory('Shopping')
        ).then((data: Transactions) => console.log('result: ', data));
      } catch (error) {}

    return (
        <div>test</div>
    )
}
import { useState } from 'react';
import { useActions } from '../hooks';
import { useAppSelector } from '../state';

export const TransactionView: React.FC = () => {
  const [term, setTerm] = useState<string>('');
  const { getTransactions } = useActions();

  const { data, loading, error } = useAppSelector(
    (state) => state.transactions,
  );

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setTerm('');
    getTransactions(term ? { filterByCategory: term } : {});
  };

  return (
    <div>
      <h3>Transactions</h3>
      <input
        type='text'
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button onClick={onClick}>Get Transactions</button>
      {error && <h3>{error}</h3>}
      {loading && <h3>Loading...</h3>}
      <ul>
        {!error &&
          !loading &&
          data.map((data, index) => (
            <li key={index}>{data.fields.transactionDescription}</li>
          ))}
      </ul>
    </div>
  );
};

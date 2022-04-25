import { useActions } from '../hooks';
import { useAppSelector } from '../state';

export const TransactionView: React.FC = () => {
  const { getTransactions } = useActions();

  const { data, loading, error } = useAppSelector(
    (state) => state.transactions,
  );

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    getTransactions();
  };

  return (
    <div>
      <h3>Transactions</h3>
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

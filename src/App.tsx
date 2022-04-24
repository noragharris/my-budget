import { Provider } from 'react-redux';
import { store } from './state';
import { TransactionView } from './components';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>My Budget</h1>
        <TransactionView />
      </div>
    </Provider>
  );
};

export default App;

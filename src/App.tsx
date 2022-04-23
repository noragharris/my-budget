import React from 'react';
import logo from './logo.svg';
import { useAirtable } from './hooks';
import { Transactions } from './types';
import './App.css';

function App() {
  try {
    useAirtable(
      process.env.REACT_APP_AIRTABLE_API_KEY,
      process.env.REACT_APP_AIRTABLE_DATABASE,
      'Transactions',
      'Grid view',
      10
    ).then((data: Transactions) => console.log('result: ', data));
  } catch (error) {}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
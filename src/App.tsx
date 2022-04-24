import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TransactionView } from './transactions/transaction-view';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home</div>}/>
        <Route path="/transactions" element={<TransactionView />} />
      </Routes>
    </Router>
    
  );
}

export default App;
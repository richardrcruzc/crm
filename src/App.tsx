import React from 'react';
import './App.css';
import { Header } from './Pages/header';
import { HomePage } from './Pages/HomePage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <HomePage />
      </header>
    </div>
  );
}

export default App;

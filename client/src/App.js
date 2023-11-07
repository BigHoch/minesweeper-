import React from 'react';
import GameBoard from './Components/GameBoard'; 
import './App.css';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Minesweeper</h1>

        <GameBoard />
      </header>
    </div>
  );
}

export default App;
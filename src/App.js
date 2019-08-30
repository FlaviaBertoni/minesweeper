import React from 'react';
import './App.css';
import MinesweeperContainer from './container/MinesweeperContainer';

function App() {
  return (
    <div className="App">
        <div className="App-header">
            <header>
                <p>
                    Start Minesweeper!
                </p>
            </header>
            <div>
                <MinesweeperContainer numberOfCols={40} numberOfRows={40} numberOfBombs={50}/>
            </div>
        </div>
    </div>
  );
}

export default App;

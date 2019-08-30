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
                <MinesweeperContainer numberOfCols={15} numberOfRows={15} numberOfBombs={40}/>
            </div>
        </div>
    </div>
  );
}

export default App;

import React, { Component } from 'react';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: this.initializeCells(),
      gameStarted: false,
    };
  }

  initializeCells() {
    const rows = 10;
    const cols = 10;
    const cells = [];

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push({
          isBomb: false,
          wasClicked: false,
          adjacentBombCount: 0,
        });
      }
      cells.push(row);
    }

    return cells;
  }

  addBombs(cells, rowClicked, colClicked) {
    const bombsToPlace = 10; 
    const rows = cells.length;
    const cols = cells[0].length;

    for (let i = 0; i < bombsToPlace; i++) {
      let row, col;
      do {
        row = Math.floor(Math.random() * rows);
        col = Math.floor(Math.random() * cols);
      } while (cells[row][col].isBomb || (row === rowClicked && col === colClicked));

      cells[row][col].isBomb = true;
    }
  }


  calculateAdjacentBombCounts(cells) {
    const numRows = cells.length;
    const numCols = cells[0].length;

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        if (!cells[row][col].isBomb) {
          let count = 0;

          for (let r = -1; r <= 1; r++) {
            for (let c = -1; c <= 1; c++) {
              const newRow = row + r;
              const newCol = col + c;

              if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
                if (cells[newRow][newCol].isBomb) {
                  count++;
                }
              }
            }
          }

          cells[row][col].adjacentBombCount = count;
        }
      }
    }
  }

  render() {
    return (
      <div className="game-board">
        {this.state.cells.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className="cell"
                onClick={() => this.handleCellClick(rowIndex, colIndex)}
              >
                {cell.wasClicked ? (
                  cell.isBomb ? (
                    <span role="img" aria-label="bomb">
                      💣
                    </span>
                  ) : (
                    cell.adjacentBombCount > 0 && cell.adjacentBombCount
                  )
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  handleCellClick(rowIndex, colIndex) {
    if (!this.state.gameStarted) {
      this.initializeGame(rowIndex, colIndex);
    }


  }

  initializeGame(rowClicked, colClicked) {
    const cells = this.state.cells.slice();
    const numRows = cells.length;
    const numCols = cells[0].length;

    this.addBombs(cells, rowClicked, colClicked);
    this.calculateAdjacentBombCounts(cells);

    this.setState({
      cells,
      gameStarted: true,
    });
  }
}

export default GameBoard;
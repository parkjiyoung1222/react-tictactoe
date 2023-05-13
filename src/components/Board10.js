import { useState } from 'react';

function TicTacToe() {
  const [board, setBoard] = useState(Array(10).fill(Array(10).fill(null)));
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  function handleClick(row, col) {
    if (winner || board[row][col]) {
      return;
    }
    const newBoard = board.map((rowArray, i) => {
      if (i !== row) {
        return rowArray;
      }
      return rowArray.map((cell, j) => {
        if (j !== col) {
          return cell;
        }
        return player;
      });
    });
    setBoard(newBoard);
    setPlayer(player === 'X' ? 'O' : 'X');
    checkWinner(newBoard, row, col);
  }

  function checkWinner(board, row, col) {
    const symbol = board[row][col];
    // Check rows
    for (let i = 0; i < 10; i++) {
      let count = 0;
      for (let j = 0; j < 10; j++) {
        if (board[i][j] === symbol) {
          count++;
          if (count === 5) {
            setWinner(symbol);
            return;
          }
        } else {
          count = 0;
        }
      }
    }
    // Check columns
    for (let j = 0; j < 10; j++) {
      let count = 0;
      for (let i = 0; i < 10; i++) {
        if (board[i][j] === symbol) {
          count++;
          if (count === 5) {
            setWinner(symbol);
            return;
          }
        } else {
          count = 0;
        }
      }
    }
    // Check diagonal from top left to bottom right
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        let count = 0;
        for (let k = 0; k < 5; k++) {
          if (board[i + k][j + k] === symbol) {
            count++;
            if (count === 5) {
              setWinner(symbol);
              return;
            }
          } else {
            count = 0;
          }
        }
      }
    }
    // Check diagonal from top right to bottom left
    for (let i = 0; i < 6; i++) {
      for (let j = 9; j > 3; j--) {
        let count = 0;
        for (let k = 0; k < 5; k++) {
          if (board[i + k][j - k] === symbol) {
            count++;
            if (count === 5) {
              setWinner(symbol);
              return;
            }
          } else {
            count = 0;
          }
        }
      }
    }
  }

  function renderCell(row, col) {
    return (
      <div
        className="cell"
        onClick={() => handleClick(row, col)}
      >
        {board[row][col]}
      </div>
    );
  }

  function renderRow(row) {
    return (
      <div className="row">
        {Array(10).fill(null).map((_, col) => renderCell(row, col))}
      </div>
    );
  }
}
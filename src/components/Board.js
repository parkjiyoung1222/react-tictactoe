import React, { useState } from "react";
import "./Board.css";

function Board() {
  
  const [rows, setRows] = useState(10); // 보드판 행 수
  const [cols, setCols] = useState(10); // 보드판 열 수
  const [winningSize, setWinningSize] = useState(5); // 승리 연결수
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([{ squares: Array(rows*cols).fill(null)}]);
  const [stepNumber,setStepNumber] =useState(0);
  
  // 선택한 보드판 크기에 맞게 option 값을 변경
  const changeBoard = (event) => {
    const value = parseInt(event.target.value);
    setRows(value);
    setCols(value);
    setHistory([{ squares: Array(value*value).fill(null)}]);
    
    if(value===5 || value===3){ 
      setWinningSize(3);      
    }else{
      setWinningSize(5); 
    }
  }

  const current = history[stepNumber];
  
 
  const handleClick = (i) => {
    //const newsquares = squares.slice();
    const newHistory = history.slice(0,stepNumber +1);
    const newCurrent = newHistory[newHistory.length-1];
    const squaresCopy = newCurrent.squares.slice();
    const win=calculateWinner(squaresCopy);
      if ( win[0] || squaresCopy[i]) {
             
      return;
      
    }
    squaresCopy[i] = xIsNext ? "X" : "O";
    
    setXIsNext(!xIsNext);
    setHistory([...newHistory,{squares: squaresCopy}]); 
    setStepNumber(newHistory.length);
  }
  
  const jumpTo =(step) =>{
    setStepNumber(step);
    setXIsNext((step % 2)===0);
    
  }

  const moves = history.map((step,move) => {
    
     const desc= move? `Go to move # ${move}` : `Go to game start`;
       
      return (
        <div className="move" key={move}>
          <button className="historybtn" onClick={()=>jumpTo(move)}>{desc}</button>
        </div>
      )
    
  });
  
 
  const calculateWinner = (squares) => {
    let winLine = null;
  
    // Check rows
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j <= cols - winningSize; j++) {
        const startIndex = i * cols + j;
        const slice = squares.slice(startIndex, startIndex + winningSize);
        if (isWinning(slice)) {
          winLine = [];
          for (let k = 0; k < winningSize; k++) {
            winLine.push(startIndex + k);
          }
          return [slice[0], winLine];
        }
      }
    }
  
    // Check columns
    for (let i = 0; i <= rows - winningSize; i++) {
      for (let j = 0; j < cols; j++) {
        const startIndex = i * cols + j;
        const slice = [];
        for (let k = 0; k < winningSize; k++) {
          slice.push(squares[startIndex + k * cols]);
        }
        if (isWinning(slice)) {
          winLine = [];
          for (let k = 0; k < winningSize; k++) {
            winLine.push(startIndex + k * cols);
          }
          return [slice[0], winLine];
        }
      }
    }
  
    // Check diagonals from left to right
    for (let i = 0; i <= rows - winningSize; i++) {
      for (let j = 0; j <= cols - winningSize; j++) {
        const startIndex = i * cols + j;
        const slice = [];
        for (let k = 0; k < winningSize; k++) {
          slice.push(squares[startIndex + k * (cols + 1)]);
        }
        if (isWinning(slice)) {
          winLine = [];
          for (let k = 0; k < winningSize; k++) {
            winLine.push(startIndex + k * (cols + 1));
          }
          return [slice[0], winLine];
        }
      }
    }
  
    // Check diagonals from right to left
    for (let i = 0; i <= rows - winningSize; i++) {
      for (let j = winningSize - 1; j < cols; j++) {
        const startIndex = i * cols + j;
        const slice = [];
        for (let k = 0; k < winningSize; k++) {
          slice.push(squares[startIndex + k * (cols - 1)]);
        }
        if (isWinning(slice)) {
          winLine = [];
          for (let k = 0; k < winningSize; k++) {
            winLine.push(startIndex + k * (cols - 1));
          }
          return [slice[0], winLine];
        }
      }
    }
  
    return [null, null];
  };

  const isWinning = (slice) => {
    
    if (slice.some((square) => !square)) {
      return false;
    }
    for (let i = 0; i < slice.length - 1; i++) {
      if (slice[i] !== slice[i + 1]) {
        return false;
      }
    }
     return true;
   
  };

  const renderSquare = (i) => {
   
    const style = {
      color: current.squares[i] === "X" ? "#FF69B4" : "blue",
      backgroundColor: winner && winner[1] && winner[1].includes(i) ? "yellow" : "white"
    };
    
    return (
      <button key={i} className="square" onClick={() => handleClick(i)} style={style}>
        {current.squares[i]}
      </button>
    );
  };

  const renderRow = (row) => {
    const cells = [];
    for (let col = 0; col < cols; col++) {
      cells.push(renderSquare(row * cols + col));
    }
      return <div className="board-row" key={row}>{cells}</div>;
  }

const renderBoard = () => {
  const board = [];
    for (let row = 0; row < rows; row++) {
      board.push(renderRow(row));
    }
    return board;
};

const winner = calculateWinner(current.squares);

const status = winner[0] ? `Winner: ${winner[0]}` : `Next: ${xIsNext ? "X" : "O"}`;


  return (
    <div>
      <div className="header">
      <div className="status">{status}</div>
        <div className="size">
        <select id="boardSize" className='boardsizeSel' value={rows} onChange={changeBoard}>
          <option value="3">3*3</option>
          <option value="5">5*5</option>
          <option value="10">10*10</option>
          <option value="15">15*15</option>
          <option value="20">20*20</option>
        </select>
      
        </div>
      </div>
      <div className="board-wrapper">
        {renderBoard()}
      </div>
      {<div className="history">
         {moves} 
      </div>}
    </div>
  );
  
}

export default Board;


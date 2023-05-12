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
      if (calculateWinner(squaresCopy) || squaresCopy[i]) {
      return;
    }
    squaresCopy[i] = xIsNext ? "X" : "O";
    
    setXIsNext(!xIsNext);
    setHistory([...newHistory,{squares: squaresCopy}]); 
    setStepNumber(newHistory.length);
  }
   /*
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
  */
 
  const calculateWinner = (squares) => {
    
    // Check rows
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x <= rows - winningSize; x++) {
        const line = [];
        for (let i = 0; i < winningSize; i++) {
          line.push(y * rows + x + i);
        }
        if (line.every((i) => squares[i] === "X")) {
          return { winner: "X", line };
        } else if (line.every((i) => squares[i] === "O")) {
          return { winner: "O", line };
        }
      }
    }

    // Check columns
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y <= cols - winningSize; y++) {
        const line = [];
        for (let i = 0; i < winningSize; i++) {
          line.push((y + i) * cols + x);
        }
        if (line.every((i) => squares[i] === "X")) {
          return { winner: "X", line };
        } else if (line.every((i) => squares[i] === "O")) {
          return { winner: "O", line };
        }
      }
    }

    // Check diagonals from left to right
    for (let x = 0; x <= rows - winningSize; x++) {
      for (let y = 0; y <= cols - winningSize; y++) {
        const line = [];
        for (let i = 0; i < winningSize; i++) {
          line.push((y + i) * cols + x + i);
        }
        if (line.every((i) => squares[i] === "X")) {
          return { winner: "X", line };
        } else if (line.every((i) => squares[i] === "O")) {
          return { winner: "O", line };
        }
      }
    }

    // Check diagonals from right to left
    for (let x = winningSize - 1; x < rows; x++) {
      for (let y = 0; y <= cols - winningSize; y++) {
        const line = [];
        for (let i = 0; i < winningSize; i++) {
          line.push((y + i) * cols + x - i);
        }
        if (line.every((i) => squares[i] === "X")) {
          return { winner: "X", line };
        } else if (line.every((i) => squares[i] === "O")) {
          return { winner: "O", line };
        }
      }
    }
    return null;
  };

  const renderSquare = (i) => {
   
    const winLine = calculateWinner(current.squares);
    
    const style = {
      color: current.squares[i] === "X" ? "#FF69B4" : "blue",
      backgroundColor: winLine && winLine.line.includes(i)?  "yellow"  : ""
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
const status = winner ? `Winner: ${winner.winner}` : `Next: ${xIsNext ? "X" : "O"}`;


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
      {/*<div className="history">
         {moves} 
      </div>*/}
    </div>
  );
  
}

export default Board;


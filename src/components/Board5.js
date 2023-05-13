import React, {useState } from 'react'
import Square from './Square'
import './Board.css'

const Board= ()=> {
  
   const [squares,setsquares ]= useState(Array(25).fill(null));
   const [Isnext, setIsnext] = useState(true);
   const calculaterWinner= (squares) => {
    const lines =[
      [0,1,2,3,4],
      [5,6,7,8,9],
      [10,11,12,13,14],
      [15,16,17,18,19],
      [20,21,22,23,24],
      [0,5,10,15,20],
      [1,6,11,16,21],
      [2,7,12,17,22],
      [3,8,13,18,23],
      [4,9,14,19,24],
      [0,6,12,18,24],
      [4,8,12,16,20]
    ]
    for(let i=0; i<lines.length; i++){
      const [a,b,c,d,e]=lines[i];
           
      if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c] && squares[a]===squares[d] && squares[a]===squares[e]){
        return squares[a];
      }     
    }
    return null;
 }
 const winner = calculaterWinner(squares);
 let status;
 if(winner){
    status = `Winner : ${winner}`;
 }else{
    status = `Next Player ${ Isnext ? 'X' : 'O' }`;
 }
   
const handleClick=(i)=>{
    const newsquares = squares.slice();
    if(calculaterWinner(newsquares) || newsquares[i]){
      return;
    }
    newsquares[i]= Isnext ? 'X' : 'O';
    setsquares(newsquares);
    setIsnext(prev=>!prev);

}
  
const renderSquare=(i)=>{
    return <Square value={squares[i]} onClick={()=>handleClick(i)} />
 }

 
    return (
      <div>
        <div className='status'>{status}
        </div>
        <div className='board-row'>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
          {renderSquare(3)}
          {renderSquare(4)}
        </div>
        <div className='board-row'>
          {renderSquare(5)}
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
          {renderSquare(9)}
        </div>
        <div className='board-row'>
          {renderSquare(10)}
          {renderSquare(11)}
          {renderSquare(12)}
          {renderSquare(13)}
          {renderSquare(14)}
        </div>
        <div className='board-row'>
          {renderSquare(15)}
          {renderSquare(16)}
          {renderSquare(17)}
          {renderSquare(18)}
          {renderSquare(19)}
        </div>
        <div className='board-row'>
          {renderSquare(20)}
          {renderSquare(21)}
          {renderSquare(22)}
          {renderSquare(23)}
          {renderSquare(24)}
        </div>
        
      </div>
    )

}
export default Board

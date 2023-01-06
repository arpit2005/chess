import React, { useEffect } from 'react';
import './App.scss';
import ChessBoard from './components/ChessBoard';

function App() {

  useEffect(() => {
    const rotateCWBtn = document.querySelector('.chess-screen .chess-controls .rotate-cw-btn')
    const rotateCCWBtn = document.querySelector('.chess-screen .chess-controls .rotate-ccw-btn')
    const chessBoard = document.querySelector('.chess-screen .chess-board')

    rotateCWBtn.addEventListener('click', () => {
      const chessPieces = document.querySelectorAll('.chess-board .box .piece')

      chessBoard.style.transform = `rotate(${180}deg)`
      for (let i = 0; i < chessPieces.length; i++)
        chessPieces[i].style.transform = `rotateX(180deg)`
    })

    rotateCCWBtn.addEventListener('click', () => {
      const chessPieces = document.querySelectorAll('.chess-board .box .piece')

      chessBoard.style.transform = `rotate(${0}deg)`
      for (let i = 0; i < chessPieces.length; i++)
        chessPieces[i].style.transform = `rotateX(0deg)`
    })

  }, [])

  return (
    <div className='chess-screen'>
      <div className='chess-controls'>
        <div className='rotate-cw-btn'>
          Rotate CW
        </div>
        <div className='rotate-ccw-btn'>
          Rotate CCW
        </div>
      </div>
      <ChessBoard />
    </div>
  );
}

export default App;

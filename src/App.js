import React, { useEffect, useState } from 'react';
import './App.scss';
import ChessBoard from './components/ChessBoard';

function App() {
  const [isRotated, setIsRotated] = useState(false)

  useEffect(() => {
    const chessPieces = document.querySelectorAll('.chess-board .box .piece')

    for (let i = 0; i < chessPieces.length; i++)
      chessPieces[i].style.transform = `rotateX(${isRotated ? '180' : '0'}deg)`

  }, [isRotated])

  return (
    <div className='chess-screen'>
      <div className='chess-controls'>
        <div className='rotate-ccw-btn' onClick={() => setIsRotated(!isRotated)}>
          {isRotated ? 'Rotate CCW' : 'Rotate CW'}
        </div>
      </div>
      <ChessBoard style={{ transform: isRotated ? 'rotate(180deg)' : 'rotate(0deg)' }} />
    </div>
  );
}

export default App;

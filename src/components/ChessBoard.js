import React, { useEffect, useState, useRef } from 'react'
import './ChessBoard.scss'
import blackPawn from '../assets/black-pawn.svg'
import whitePawn from '../assets/white-pawn.svg'

function ChessBoard() {
    const [boardArray, setBoardArray] = useState([])
    let boardArrayLocal = []
    const [selectedBox, setSelectedBox] = useState('')

    useEffect(() => {
        boardArrayLocal = []
        for (let i = 0; i < 8; i++) {
            boardArrayLocal.push(i)
        }
        setBoardArray(boardArrayLocal)
    }, [])

    useEffect(() => {
        if (boardArray.length > 0) {
            const chessPieces = document.querySelectorAll('.chess-board .box .piece')
            // console.log(chessPieces)

            for (let i = 0; i < chessPieces.length; i++) {
                chessPieces[i].addEventListener('click', (e) => {
                    console.log(e.target)
                    setSelectedBox(e.target.parentNode.id)
                })
            }

            for (let i = 0; i < chessPieces.length; i++) {
                // console.log(chessPieces[i].id)
                // console.log(chessPieces[i].classList[2])
            }
        }
    }, [boardArray])


    return (
        <div className='chess-board'>
            {boardArray.map((i, rowIndex) => {
                return (
                    <div className={`row row-${rowIndex}`}>
                        {
                            boardArray.map((item, colIndex) => {
                                return (
                                    <span id={`${rowIndex.toString() + colIndex.toString()}`} className={`box box-${colIndex} ${selectedBox == rowIndex.toString() + colIndex.toString() ? 'selected' : ''}`}>
                                        {rowIndex == 1 ? <img src={blackPawn} id={`${rowIndex.toString() + colIndex.toString()}`} className={`piece black pawn row-${rowIndex} col-${colIndex}`} /> : ''}
                                        {rowIndex == 6 ? <img src={whitePawn} id={`${rowIndex.toString() + colIndex.toString()}`} className={`piece white pawn row-${rowIndex} col-${colIndex}`} /> : ''}

                                    </span>
                                )
                            })
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default ChessBoard
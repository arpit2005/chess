import React, { useEffect, useState, useRef } from 'react'
import './ChessBoard.scss'
import blackPawn from '../assets/black-pawn.svg'
import whitePawn from '../assets/white-pawn.svg'

function ChessBoard() {
    const [boardArray, setBoardArray] = useState([])
    let boardArrayLocal = []
    const [selectedBox, setSelectedBox] = useState('')
    const [selectedPiece, setSelectedPiece] = useState('')
    const [nextMovesArray, setNextMovesArray] = useState()


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

            for (let i = 0; i < chessPieces.length; i++) {
                chessPieces[i].addEventListener('click', (e) => {
                    setSelectedBox(e.target.parentNode.id)
                    setSelectedPiece(e.target)

                    if (e.target.classList[1] == 'black' && e.target.classList[2] == 'pawn') {
                        let newMoveRow = null

                        newMoveRow = Number(e.target.id[0]) + 1
                        setNextMovesArray(newMoveRow.toString() + e.target.id[1].toString())
                    }

                    if (e.target.classList[1] == 'white' && e.target.classList[2] == 'pawn') {
                        let newMoveRow = null

                        newMoveRow = Number(e.target.id[0]) - 1
                        setNextMovesArray(newMoveRow.toString() + e.target.id[1].toString())
                    }
                })
            }

        }
    }, [boardArray])

    function setNextMove() {
        let nextBoxArray = document.querySelectorAll(`.chess-board .row span`)
        let nextBox = null

        nextBoxArray.forEach(box => {
            if (box.id == nextMovesArray) {
                nextBox = box
            }
        })

        let newSelectedPiece = selectedPiece
        console.log(selectedPiece)

        selectedPiece.remove()
        nextBox.appendChild(newSelectedPiece)



        console.log(nextBox)

    }

    return (
        <div className='chess-board'>
            {boardArray.map((i, rowIndex) => {
                return (
                    <div className={`row row-${rowIndex}`}>
                        {
                            boardArray.map((item, colIndex) => {
                                return (
                                    <span id={`${rowIndex.toString() + colIndex.toString()}`} className={`box box-${colIndex} ${selectedBox == rowIndex.toString() + colIndex.toString() ? 'selected' : ''} ${nextMovesArray == rowIndex.toString() + colIndex.toString() ? 'next-move' : ''}`}
                                        onClick={() => {
                                            if (nextMovesArray == rowIndex.toString() + colIndex.toString())
                                                setNextMove()
                                        }}
                                    >
                                        {rowIndex == 1 ? <img src={blackPawn} id={`${rowIndex.toString() + colIndex.toString()}`} className={`piece black pawn`} /> : ''}
                                        {rowIndex == 6 ? <img src={whitePawn} id={`${rowIndex.toString() + colIndex.toString()}`} className={`piece white pawn`} /> : ''}

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
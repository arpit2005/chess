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
                    const boxArray = document.querySelectorAll('.chess-board .row .box')

                    boxArray.forEach(box => {
                        box.classList.remove('next-move')
                    })

                    if (e.target.classList[1] == 'black' && e.target.classList[2] == 'pawn') {
                        let newMoveRow = null
                        let newMoveCol = null
                        let nextMovesArrayLocal = []
                        const whitePiecesArray = document.querySelectorAll('.chess-board .piece.white')


                        newMoveRow = Number(e.target.id[0]) + 1
                        nextMovesArrayLocal.push(newMoveRow.toString() + e.target.id[1].toString())

                        whitePiecesArray.forEach(piece => {
                            if (piece.id == Number(nextMovesArrayLocal[0]) + 1 || piece.id == Number(nextMovesArrayLocal[0]) - 1) {
                                nextMovesArrayLocal.push(piece.id)
                            }
                        })

                        setNextMovesArray(nextMovesArrayLocal)

                        boxArray.forEach(box => {
                            nextMovesArrayLocal.forEach(move => {
                                if (move == box.id) {
                                    box.classList.add('next-move')
                                }
                            })
                        })
                    }

                    if (e.target.classList[1] == 'white' && e.target.classList[2] == 'pawn') {
                        let newMoveRow = null
                        let newMoveCol = null
                        let nextMovesArrayLocal = []
                        const blackPiecesArray = document.querySelectorAll('.chess-board .piece.black')

                        newMoveRow = Number(e.target.id[0]) - 1

                        nextMovesArrayLocal.push(newMoveRow.toString() + e.target.id[1].toString())

                        blackPiecesArray.forEach(piece => {
                            if (piece.id == Number(nextMovesArrayLocal[0]) + 1 || piece.id == Number(nextMovesArrayLocal[0]) - 1) {
                                nextMovesArrayLocal.push(piece.id)
                            }
                        })

                        console.log(nextMovesArrayLocal)
                        setNextMovesArray(nextMovesArrayLocal)

                        boxArray.forEach(box => {
                            nextMovesArrayLocal.forEach(move => {
                                if (move == box.id) {
                                    box.classList.add('next-move')
                                }
                            })
                        })
                    }
                })
            }

        }
    }, [boardArray])

    function setNextMove() {
        let nextBoxArray = document.querySelectorAll(`.chess-board .row span`)
        let nextBox = null
        const boxArray = document.querySelectorAll('.chess-board .row .box')

        boxArray.forEach(box => {
            box.classList.remove('next-move')
        })

        nextBoxArray.forEach(box => {
            if (box.id == nextMovesArray) {
                nextBox = box
            }
        })

        let newSelectedPiece = selectedPiece
        selectedPiece.remove()

        newSelectedPiece.id = `${nextMovesArray}`

        nextBox.appendChild(newSelectedPiece)
        setSelectedBox('')
        setNextMovesArray('')

    }

    return (
        <div className='chess-board'>
            {boardArray.map((i, rowIndex) => {
                return (
                    <div className={`row row-${rowIndex}`}>
                        {
                            boardArray.map((item, colIndex) => {
                                return (
                                    <span id={`${rowIndex.toString() + colIndex.toString()}`} className={`box box-${colIndex} ${selectedBox == rowIndex.toString() + colIndex.toString() ? 'selected' : ''}`}
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
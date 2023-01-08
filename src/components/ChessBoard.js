import React, { useEffect, useState, useRef } from 'react'
import './ChessBoard.scss'
import blackPawn from '../assets/black-pawn.svg'
import blackRook from '../assets/black-rook.svg'
import blackKnight from '../assets/black-knight.svg'
import blackBishop from '../assets/black-bishop.svg'
import blackKing from '../assets/black-king.svg'
import blackQueen from '../assets/black-queen.svg'

import whitePawn from '../assets/white-pawn.svg'
import whiteRook from '../assets/white-rook.svg'
import whiteKnight from '../assets/white-knight.svg'
import whiteBishop from '../assets/white-bishop.svg'
import whiteKing from '../assets/white-king.svg'
import whiteQueen from '../assets/white-queen.svg'

function ChessBoard({ className, style }) {
    const [boardArray, setBoardArray] = useState([])
    const [selectedBox, setSelectedBox] = useState('')
    const [selectedPiece, setSelectedPiece] = useState('')
    const [nextMovesArray, setNextMovesArray] = useState([])
    const [blackOutPiecesArray, setBlackOutPiecesArray] = useState([])
    const [whiteOutPiecesArray, setWhiteOutPiecesArray] = useState([])

    let boardArrayLocal = []
    let currentSelected = useRef(false)
    let selectedPieceRef = useRef(false)
    let currentPieceColor = useRef(null)
    let selectedBoxRef = useRef(null)
    let nextMovesArrayRef = useRef([])

    let allBlackPiecesArray = [
        {
            type: 'rook',
            src: blackRook
        },
        {
            type: 'knight',
            src: blackKnight
        },
        {
            type: 'bishop',
            src: blackBishop
        },
        {
            type: 'queen',
            src: blackQueen
        },
        {
            type: 'king',
            src: blackKing
        },
        {
            type: 'bishop',
            src: blackBishop
        },
        {
            type: 'knight',
            src: blackKnight
        },
        {
            type: 'rook',
            src: blackRook
        }
    ]

    let allWhitePiecesArray = [
        {
            type: 'rook',
            src: whiteRook
        },
        {
            type: 'knight',
            src: whiteKnight
        },
        {
            type: 'bishop',
            src: whiteBishop
        },
        {
            type: 'king',
            src: whiteKing
        },
        {
            type: 'queen',
            src: whiteQueen
        },
        {
            type: 'bishop',
            src: whiteBishop
        },
        {
            type: 'knight',
            src: whiteKnight
        },
        {
            type: 'rook',
            src: whiteRook
        }
    ]


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
            let blackOutPiecesArrayLocal = []
            let whiteOutPiecesArrayLocal = []

            for (let i = 0; i < chessPieces.length; i++) {
                chessPieces[i].addEventListener('click', (e) => {
                    if (currentSelected.current) {
                        if (e.target) {
                            nextMovesArrayRef.current?.length > 0 && nextMovesArrayRef.current.forEach(move => {
                                if (move == e.target.id) {
                                    if (e.target.classList[1] == "black" && currentPieceColor.current == "white") {
                                        blackOutPiecesArrayLocal.push({ pieceId: e.target.id, pieceColor: 'black', pieceType: e.target.classList[2] })
                                    }
                                    if (e.target.classList[1] == "white" && currentPieceColor.current == "black") {
                                        whiteOutPiecesArrayLocal.push({ pieceId: e.target.id, pieceColor: 'white', pieceType: e.target.classList[2] })
                                    }
                                    setBlackOutPiecesArray(blackOutPiecesArrayLocal)
                                    setWhiteOutPiecesArray(whiteOutPiecesArrayLocal)
                                    e.target.remove()

                                    knockPiece(e)
                                }
                            })
                        }
                        return
                    }

                    setSelectedBox(e.target.parentNode.id)
                    selectedBoxRef.current = e.target.parentNode.id

                    setSelectedPiece(e.target)
                    selectedPieceRef.current = e.target
                    currentSelected.current = true

                    const boxArray = document.querySelectorAll('.chess-board .row .box')

                    boxArray.forEach(box => {
                        box.classList.remove('next-move')
                    })

                    if (e.target.classList[1] == 'black' && e.target.classList[2] == 'pawn') {
                        currentPieceColor.current = 'black'
                        let newMoveRow = null
                        let nextMovesArrayLocal = []
                        const whitePiecesArray = document.querySelectorAll('.chess-board .piece.white')
                        const blackPiecesArray = document.querySelectorAll('.chess-board .piece.black')

                        newMoveRow = Number(e.target.id[0]) + 1

                        let forwardPiece = false

                        blackPiecesArray.forEach(piece => {
                            if (piece.id == Number(newMoveRow.toString() + e.target.id[1].toString())) {
                                forwardPiece = true
                            }
                        })

                        whitePiecesArray.forEach(piece => {
                            if (piece.id == Number(newMoveRow.toString() + e.target.id[1].toString())) {
                                forwardPiece = true
                            }
                        })

                        if (!forwardPiece)
                            nextMovesArrayLocal.push(newMoveRow.toString() + e.target.id[1].toString())

                        whitePiecesArray.forEach(piece => {
                            if (piece.id == Number(newMoveRow.toString() + e.target.id[1].toString()) + 1 || piece.id == Number(newMoveRow.toString() + e.target.id[1].toString()) - 1) {
                                nextMovesArrayLocal.push(piece.id)
                            }
                        })

                        setNextMovesArray(nextMovesArrayLocal)
                        nextMovesArrayRef.current = nextMovesArrayLocal

                        boxArray.forEach(box => {
                            nextMovesArrayLocal.forEach(move => {
                                if (move == box.id) {
                                    box.classList.add('next-move')
                                }
                            })
                        })
                    }

                    if (e.target.classList[1] == 'white' && e.target.classList[2] == 'pawn') {
                        currentPieceColor.current = 'white'
                        let newMoveRow = null
                        let nextMovesArrayLocal = []
                        const blackPiecesArray = document.querySelectorAll('.chess-board .piece.black')
                        const whitePiecesArray = document.querySelectorAll('.chess-board .piece.white')

                        newMoveRow = Number(e.target.id[0]) - 1

                        let forwardPiece = false

                        blackPiecesArray.forEach(piece => {
                            if (piece.id == Number(newMoveRow.toString() + e.target.id[1].toString())) {
                                forwardPiece = true
                            }
                        })

                        whitePiecesArray.forEach(piece => {
                            if (piece.id == Number(newMoveRow.toString() + e.target.id[1].toString())) {
                                forwardPiece = true
                            }
                        })

                        if (!forwardPiece)
                            nextMovesArrayLocal.push(newMoveRow.toString() + e.target.id[1].toString())

                        blackPiecesArray.forEach(piece => {
                            if (piece.id == Number(newMoveRow.toString() + e.target.id[1].toString()) + 1 || piece.id == Number(newMoveRow.toString() + e.target.id[1].toString()) - 1) {
                                nextMovesArrayLocal.push(piece.id)
                            }
                        })

                        setNextMovesArray(nextMovesArrayLocal)
                        nextMovesArrayRef.current = nextMovesArrayLocal

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

    function reset() {
        clearNextMove()
        setSelectedBox('')
        selectedBoxRef.current = null
        selectedPieceRef.current = null
        setSelectedPiece('')
        setNextMovesArray([])
        currentSelected.current = false
    }

    function clearNextMove() {
        const boxArray = document.querySelectorAll('.chess-board .row .box')

        boxArray.forEach(box => {
            box.classList.remove('next-move')
        })
    }

    function knockPiece(e) {
        let nextBoxArray = document.querySelectorAll(`.chess-board .row span`)
        let nextBox = null

        clearNextMove()

        nextBoxArray.forEach(box => {
            if (box.id == e.target.id) {
                nextBox = box
            }
        })

        let newSelectedPiece = selectedPieceRef.current
        selectedPieceRef.current.remove()
        newSelectedPiece.id = `${e.target.id}`
        nextBox.appendChild(newSelectedPiece)

        reset()
    }

    function setNextMove(move) {
        let nextBoxArray = document.querySelectorAll(`.chess-board .row span`)
        let nextBox = null

        clearNextMove()

        nextBoxArray.forEach(box => {
            if (box.id == move) {
                nextBox = box
            }
        })

        let newSelectedPiece = selectedPiece
        selectedPiece.remove()
        newSelectedPiece.id = `${move}`
        nextBox.appendChild(newSelectedPiece)

        reset()

    }

    return (
        <>
            <div className='clr-btn' onClick={reset}>Clear</div>
            <div className={`chess-board ${className ? className : ''}`} style={{ ...style }}>
                {boardArray.map((i, rowIndex) => {
                    return (
                        <div className={`row row-${rowIndex}`}>
                            {
                                boardArray.map((item, colIndex) => {
                                    return (
                                        <span id={`${rowIndex.toString() + colIndex.toString()}`} className={`box box-${colIndex} ${selectedBox == rowIndex.toString() + colIndex.toString() ? 'selected' : ''}`}
                                            onClick={() => {
                                                nextMovesArray.forEach(move => {
                                                    if (move == rowIndex.toString() + colIndex.toString()) {
                                                        setNextMove(move)
                                                    }
                                                })
                                            }}
                                        >
                                            {
                                                rowIndex == 0 && allBlackPiecesArray.map((piece, index) => {
                                                    return (
                                                        colIndex == index &&
                                                        <img src={piece.src} id={`${rowIndex.toString() + colIndex.toString()}`} className={`piece black ${piece.type}`} />
                                                    )
                                                })
                                            }
                                            {rowIndex == 1 ? <img src={blackPawn} id={`${rowIndex.toString() + colIndex.toString()}`} className={`piece black pawn`} /> : ''}
                                            {rowIndex == 6 ? <img src={whitePawn} id={`${rowIndex.toString() + colIndex.toString()}`} className={`piece white pawn`} /> : ''}
                                            {
                                                rowIndex == 7 && allWhitePiecesArray.map((piece, index) => {
                                                    return (
                                                        colIndex == index &&
                                                        <img src={piece.src} id={`${rowIndex.toString() + colIndex.toString()}`} className={`piece black ${piece.type}`} />
                                                    )
                                                })
                                            }
                                        </span>
                                    )
                                })
                            }
                        </div>
                    )
                })}
            </div>
            <div className='white-out-pieces'>
                {whiteOutPiecesArray.map(piece => {
                    return (
                        <span className='piece-box'>
                            <img src={whitePawn} id={`${piece.pieceId}`} className={`piece ${piece.pieceColor} ${piece.pieceType}`} />
                        </span>
                    )
                })}
            </div>
            <div className='black-out-pieces'>
                {blackOutPiecesArray.map(piece => {
                    return (
                        <span className='piece-box'>
                            <img src={blackPawn} id={`${piece.pieceId}`} className={`piece ${piece.pieceColor} ${piece.pieceType}`} />
                        </span>
                    )
                })}
            </div>
        </>
    )
}

export default ChessBoard
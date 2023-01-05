import React, { useEffect, useState, useRef } from 'react'
import './ChessBoard.scss'

function ChessBoard() {
    const [boardArray, setBoardArray] = useState([])
    let boardArrayLocal = []

    useEffect(() => {
        boardArrayLocal = []
        for (let i = 0; i < 8; i++) {
            boardArrayLocal.push(i)
        }
        setBoardArray(boardArrayLocal)
    }, [])


    return (
        <div className='chess-board'>
            {boardArray.map((i, index) => {
                return (
                    <div className={`row row-${index}`}>
                        {
                            boardArray.map((item, index) => {
                                return (
                                    <span className={`box box-${index}`}></span>
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